import "../styles/globals.css";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <>     
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
