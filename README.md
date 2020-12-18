# ServiceStack .NET 5.0 Next JS Template

.NET 5.0 Next.js App Template

![](https://og-image.vercel.app/.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&images=https%3A%2F%2Fdocs.servicestack.net%2Fimages%2Fsvg%2Fservicestack.svg)

> Browse [source code](https://github.com/geooot/ss-next) and install with [dotnet-new](https://docs.servicestack.net/dotnet-new):

    $ dotnet tool install -g x

    $ APP_SOURCE_TEMPLATES=geooot x new ss-next <your app name>

## Description

[Next.js](https://nextjs.org) is an opinionated structured React framework for rapidly developing Web Applications.

Next also enables the development of high-performance responsive Web Apps by employing advanced packaging techniques like automatic code spliting, link prefetching, SPA navigation of statically-generated cacheable assets and integrated support for ES6/7 transpilation and js/css bundling and minification.

This was created based of the [vue-next service stack template](https://github.com/NetCoreTemplates/vue-nuxt/) and the [next typescript template](https://github.com/vercel/next.js/tree/canary/examples/with-typescript).

## Install Dependencies

After creating your project go to your `MyApp` folder and install your client App dependencies with:

    $ npm install

If your IDE doesn't automatically install your .NET NuGet Dependencies, you can manually install them with:

    $ dotnet restore


## Important Considerations
- Next JS API handlers **will not work** out of the box
- Dynamic Routes generate the corresponding ServiceStack routes on `npm run build` (or really `npm run generate`) using the template in `MyApp.ServiceInterface/MyAppRouteServices.cs.template` and the generate script in `MyApp/next.config.js`
- The priority in which routes are handled is up to [ServiceStack's routing rules](https://docs.servicestack.net/routing#route-weighting-example) but they mostly match [Next.js's routing rules](https://nextjs.org/docs/routing/dynamic-routes#caveats)
- Optional catch all routes are supported in terms of syntax but don't really work as documented in next js.
- Catch all routes are supported with the addition of the fact that they act like optional catch all routes if no index page is there
  - For example: `/pathto/[[..slug]].tsx` will accept requests from `/pathto` and `/pathto/wherever/you/want` unless there exists a `/pathto/index.tsx` in which `/pathto` goes to `/pathto/index.tsx`

## Dev Workflow

Start a [watched .NET Core build](https://docs.servicestack.net/templates-websites#watched-net-core-builds) in the background from the command-line with:

    $ npm run dotnet-watch

In a new terminal window start a watched next dev server build with:

    $ npm run dev

Then open [http://localhost:3000](http://localhost:3000) in your browser to view your App served directly from Nuxt.js dev server and will proxy all Server requests to ServiceStack Server running on [https://localhost:5001](https://localhost:5001). The url dotnet binds to is configurable in `.env`.

## Update DTOs

Whilst Next.js is a JavaScript (ES 6/7) App it still benefits from [ServiceStack's TypeScript Add Reference](https://docs.servicestack.net/typescript-add-servicestack-reference) where you can generate typed DTOs with the `dtos` npm script:

    $ npm run dtos

This will update the Servers `interfaces/dtos.ts`

## Generate Static Production Build

Most of the time during development you'll be viewing your App through Next.js dev server to take advantage of it's Hot Module Replacement for instant UI updates. At any time you can also view a production build of your App with:

    $ npm run build

Which will generate an encapsulated production build of your App in `/wwwroot` which you can view running from your ServiceStack Server App directly (`npm run dotnet`):

 - https://localhost:5001

## Publishing App for Deployment

To create a release client and server build of your App run:

    $ npm run publish

Which will publish your App to `bin/Release/net5/publish` which you can deploy as a standard .NET Core App.