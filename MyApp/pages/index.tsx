import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Hello } from '../interfaces/dtos';
import { client } from "../services/client";

const IndexPage = () => {
  const [hello, setHello] = useState<string>("Hello, Next.js");
  const [name, setName] = useState<string>("Next.js");

  useEffect(() => {
    (async () => {
      const res = await client.post(new Hello({ name }))
      setHello(res.result || "");
    })();
  }, [name, setHello]);

  const onInputChange = useCallback((e) => {
    setName(e.target.value);
  }, [setName])

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>{hello} 👋</h1>
      <input type="text" onChange={onInputChange} value={name} />
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
