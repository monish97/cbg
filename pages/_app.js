import "../styles/globals.css";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="header">
        <h1>🎮 Casual Browser Games</h1>
      </header>
      <Component {...pageProps} />
      //<Footer />
    </>
  );
}
