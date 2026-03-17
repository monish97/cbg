export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          padding: "15px",
          background: "#111",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>🎮 Casual Browser Games</h2>
      </header>

      <main style={{ padding: "20px" }}>{children}</main>

      <footer
        style={{
          padding: "15px",
          background: "#111",
          color: "#fff",
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        <p>© {new Date().getFullYear()} CasualBrowserGames.com</p>
      </footer>
    </div>
  );
}
