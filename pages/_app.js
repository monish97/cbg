import "../styles/globals.css";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="header">
        <h1>🎮 Casual Browser Games</h1>
      </header>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
