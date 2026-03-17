import "../styles/globals.css";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* ✅ Step 4: Title + Description */}
        <title>Casual Browser Games - Play Free Online Games</title>
        <meta
          name="description"
          content="Play free casual browser games online. No download required. Enjoy action, puzzle, racing and more!"
        />

        {/* ✅ Step 5: Keywords */}
        <meta
          name="keywords"
          content="casual games, browser games, free online games, play games online"
        />
      </Head>
    <>     
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
