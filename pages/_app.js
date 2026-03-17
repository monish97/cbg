import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="header">
        <h1>🎮 Casual Browser Games</h1>
      </header>
      <Component {...pageProps} />
    </>
  );
}
