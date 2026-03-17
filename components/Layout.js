import { useRouter } from "next/router";
import Footer from "./Footer";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }) {
  const router = useRouter();
  const currentCategory = router.query.category || "All";

  const categories = [
    "All",
    "action",
    "arcade",
    "puzzle",
    "racing",
    "sports",
    "shooter",
    "multiplayer",
    "adventure",
    "strategy",
    "simulation",
    "idle",
    "hyper casual",
    "match 3",
    "platformer"
  ];

  const categoryIcons = {
    All: "🎮",
    action: "⚔️",
    adventure: "🗺️",
    arcade: "🕹️",
    puzzle: "🧩",
    sports: "🏅",
    racing: "🏎️",
    strategy: "♟️",
    shooter: "🔫",
    multiplayer: "👥",
    idle: "⏳",
    "hyper casual": "🎯",
    "match 3": "💎",
    platformer: "🧱"
  };

  return (
    <div className="page">

      <header className="header">
        <Link href="/?page=1&category=All" className="logo-wrapper">
          <Image
            src="/logo.png"
            alt="Casual Browser Games"
            width={300}
            height={60}
          />
          <span className="logo-text">Casual Browser Games</span>
        </Link>
      </header>
              
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Categories</h2>

          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                currentCategory === cat ? "active" : ""
              }`}
              onClick={() => {
                router.push(`/?page=1&category=${cat}`);
              }}
            >
              <span className="category-content">
                <span className="icon">
                  {categoryIcons[cat] || "🎲"}
                </span>
                <span className="label">
                  {cat === "All"
                    ? "All"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
              </span>
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="main">{children}</main>
      </div>

      <Footer />

      <style jsx>{`

        .header {
          background: #020617;
          border-bottom: 1px solid #1e293b;
          padding: 12px 20px;
          display: flex;
          align-items: center;
        }
        
        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        
        .logo-text {
          font-size: 20px;
          font-weight: bold;
          color: #38bdf8;
        }
        
        .logo-wrapper:hover .logo-text {
          color: #0ea5e9;
        }
        
        .page {
          display: flex;
          flex-direction: column;
          min-height: 100vh; /* ✅ KEY FIX */
        }

        .container {
          display: flex;
          flex: 1;
          flex-direction: row;
        }

        .sidebar {
          width: 220px;
          background: #020617;
          padding: 20px;
          border-right: 1px solid #1e293b;
        }

        .main {
          flex: 1;
          padding: 20px;
        }

        h2 {
          margin-bottom: 15px;
          color: #e2e8f0;
        }

        .category-btn {
          display: block;
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
          background: transparent;
          border: none;
          color: #cbd5f5;
          cursor: pointer;
          text-align: left;
          border-radius: 8px;
          transition: all 0.2s;
          position: relative;
        }

        .category-btn:hover {
          background: #1e293b;
        }

        .category-btn.active {
          background: #1e293b;
          color: #fff;
        }

        .category-btn.active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: #38bdf8;
          border-radius: 4px;
        }

        .category-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
