import { useRouter } from "next/router";
import Footer from "./Footer";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }) {
  const router = useRouter();
  const currentCategory = router.query.category || "All";

  const categories = [
    "All", "IO", "2 Player", "3D", "Action", "Adventure", "Arcade",
    "Baby", "Bejeweled", "Boys", "Clicker", "Cooking", "Girls", "Hypercasual",
    "Multiplayer", "Puzzle", "Racing", "Shooting", "Soccer", "Sports", "Stickman"
  ];

  const categoryIcons = {
    All: "🎮", IO: "🖱️", "2 Player": "👥", "3D": "🧊", Action: "⚔️",
    Adventure: "🗺️", Arcade: "🕹️", Baby: "🍼", Bejeweled: "💎", Boys: "👦",
    Clicker: "🖱️", Cooking: "🍳", Girls: "👧", Hypercasual: "🎯",
    Multiplayer: "👥", Puzzle: "🧩", Racing: "🏎️", Shooting: "🔫",
    Soccer: "⚽", Sports: "🏅", Stickman: "🕴️",
  };

  const handleCategoryClick = (cat) => {
    router.push(`/?page=1&category=${encodeURIComponent(cat)}`, undefined, { shallow: true });
  };

  return (
    <div className="page">
      <header className="header">
        <Link href="/?page=1&category=All" className="logo-wrapper">
          <Image src="/logo.png" alt="Casual Browser Games" width={300} height={60} />
        </Link>
      </header>

      <div className="container">
        <aside className="sidebar">
          <h2>Categories</h2>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${currentCategory === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
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
    </div>
  );
}
