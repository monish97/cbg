import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Casual Browser Games</p>

      <div className="links">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/contact">Contact Us</Link>
      </div>

      <style jsx>{`
        .footer {
          background: #020617;
          color: #94a3b8;
          text-align: center;
          padding: 20px;
          border-top: 1px solid #1e293b;
          margin-top: auto; /* ✅ KEY FIX */
        }

        .links {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        a {
          color: #cbd5f5;
          text-decoration: none;
        }

        a:hover {
          color: #38bdf8;
        }
      `}</style>
    </footer>
  );
}
