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

.header {
  background: #020617;
  padding: 15px 20px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #1e293b;
}
