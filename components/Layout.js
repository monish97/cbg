import Link from "next/link";

const categories = [
  "Action",
  "Adventure",
  "Puzzle",
  "Racing",
  "Sports",
  "2048",
  "Arcade",
  "Clicker",
];

export default function Layout({ children }) {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CBG</h2>

        <nav>
          {categories.map((cat) => (
            <Link key={cat} href={`/?category=${cat.toLowerCase()}`}>
              <div className="category-item">{cat}</div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">{children}</main>

      <style jsx>{`
        .app {
          display: flex;
          min-height: 100vh;
          background: #0f172a;
          color: #fff;
        }

        .sidebar {
          width: 220px;
          background: #020617;
          padding: 20px;
          border-right: 1px solid #1e293b;
        }

        .logo {
          margin-bottom: 20px;
          font-size: 20px;
        }

        .category-item {
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 5px;
          transition: all 0.2s;
        }

        .category-item:hover {
          background: #1e293b;
        }

        .content {
          flex: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
