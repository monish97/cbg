import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="header">
        <h1>🎮 Game Hub</h1>
      </header>
      <Component {...pageProps} />
    </>
  );
}
