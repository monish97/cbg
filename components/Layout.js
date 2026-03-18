import { useRouter } from "next/router";
import Footer from "./Footer";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }) {
  const router = useRouter();
  const currentCategory = router.query.category || "All";

  const categories = [
    "All",
    "IO",
    "2 Player",
    "3D",
    "Action",
    "Adventure",
    "Arcade",
    "Baby",
    "Bejeweled",
    "Boys",
    "Clicker",
    "Cooking",
    "Girls",
    "Hypercasual",
    "Multiplayer",
    "Puzzle",
    "Racing",
    "Shooting",
    "Soccer",
    "Sports",
    "Stickman",
  ];

  const categoryIcons = {
    All: "🎮",
    "IO": "🌐",
    "2 Player": "👥",
    "3D": "🧊",
    Action: "⚔️",
    Adventure: "🗺️",
    Arcade: "🕹️",
    Baby: "🍼",
    Bejeweled: "💎",
    Boys: "👦",
    Clicker: "🖱️",
    Cooking: "🍳",
    Girls: "👧",
    Hypercasual: "🎯",
    Multiplayer: "👥",
    Puzzle: "🧩",
    Racing: "🏎️",
    Shooting: "🔫",
    Soccer: "⚽",
    Sports: "🏅",
    Stickman: "🕴️",
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
        </Link>
      </header>

      <div className="container">
        <aside className="sidebar">
          <h2>Categories</h2>

          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                currentCategory === cat ? "active" : ""
              }`}
              onClick={() =>
                router.push(`/?page=1&category=${encodeURIComponent(cat)}`)
              }
            >
              <span className="category-content">
                <span className="icon">{categoryIcons[cat] || "🎲"}</span>
                <span className="label">{cat}</span>
              </span>
            </button>
          ))}
        </aside>

        <main className="main">{children}</main>
      </div>

      <Footer />

      <style jsx>{`
        .header {
          background: #020617;
          border-bottom: 1px solid #1e293b;
          padding: 12px 20px;
        }

        .container {
          display: flex;
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

        .category-btn {
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
          background: transparent;
          border: none;
          color: #cbd5f5;
          cursor: pointer;
          text-align: left;
          border-radius: 8px;
        }

        .category-btn.active {
          background: #1e293b;
          color: #fff;
        }

        .category-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}
