const fs = require("fs");
const ejs = require("ejs");

module.exports = {
    async rewrites() {
        return [
            // proxy unmatched requests to dotnet server
            {
                source: '/:path*',
                destination: '/:path*',
            },
            {
                source: '/:path*',
                destination: `${process.env.DOTNET_URLS || "http://localhost:5003"}/:path*`,
            },
        ]
    },
    /**
     * Function to convert dynamic page routes into routes that .NET 5.0 can understand
     * using CSharp code generation
     */
    async exportPathMap(defaultPathMap, { dev }) {
        // don't run on dev mode
        if (dev) return;

        let dotnetRoutes = [];

        // remove non pages from map
        for (let key of Object.keys(defaultPathMap)) {
            if (key.startsWith("/__document") || key.startsWith("/_app")) {
                delete defaultPathMap[key];
            }
        }

        // get dynamic routes from next and create route strings that ServiceStack can work with
        for (let key of Object.keys(defaultPathMap)) {
            let route = `${key}`;
            const params =
                (Array.isArray(key.match(/\[\[(.*?)\]\]|\[(.*?)\]/g)) &&
                    key.match(/\[\[(.*?)\]\]|\[(.*?)\]/g).map((p) => {
                        let optional = false;
                        let original = `${p}`;

                        if (p.startsWith("[[")) {
                            // for optional params. Ex: "[[...slug]]"
                            optional = true;
                            p = p.substring(2, p.length - 2);
                        } else {
                            // for not optional params. Ex "[...slug]" or "[slug]"
                            p = p.substring(1, p.length - 1);
                        }

                        if (p.length > 3 && p.substring(0, 3) === "...") {
                            // for catch all params. Ex "...slug"
                            route = route.replace(
                                original,
                                `{${p.substring(3)}*}`
                            );
                            return {
                                param: p.substring(3),
                                catchAll: true,
                                optional,
                            };
                        } else {
                            // for normal params. Ex "slug"
                            route = route.replace(original, `{${p}}`);
                            return {
                                param: p,
                                catchAll: false,
                                optional,
                            };
                        }
                    })) ||
                [];

            // if catch-all optional route, add another route without catch-all
            if (
                params.length > 0 &&
                params[params.length - 1].catchAll &&
                params[params.length - 1].optional
            ) {
                let splitRoute = route.split("/");
                let splitKey = key.split("/");
                dotnetRoutes.push({
                    route: splitRoute.slice(0, splitRoute.length - 1).join("/"),
                    originalRoute: splitKey
                        .slice(0, splitKey.length - 1)
                        .join("/"),
                    params: params.slice(0, params.length - 1),
                    page: defaultPathMap[key].page,
                });
            }

            if (route !== "/")
                dotnetRoutes.push({
                    route,
                    originalRoute: key,
                    params,
                    page: defaultPathMap[key].page,
                });
        }

        console.log(JSON.stringify(defaultPathMap, null, 4));
        console.log(JSON.stringify(dotnetRoutes, null, 4));

        // read in template file
        const data = await fs.promises.readFile(
            "../MyApp.ServiceInterface/MyAppRouteServices.cs.template"
        );
        const templateString = data.toString();

        // render template and save it as the '.cs' file
        const resultServiceFile = await ejs.render(
            templateString,
            { dotnetRoutes },
            { async: true }
        );
        await fs.promises.writeFile(
            "../MyApp.ServiceInterface/MyAppRouteServices.cs",
            resultServiceFile
        );

        return defaultPathMap;
    },
};
