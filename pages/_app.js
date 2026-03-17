import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Casual Browser Games - Play Free Online Games</title>

        <meta
          name="description"
          content="Play free casual browser games online. No download required. Enjoy action, puzzle, racing and more!"
        />

        <meta
          name="keywords"
          content="casual games, browser games, free online games, play games online"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
