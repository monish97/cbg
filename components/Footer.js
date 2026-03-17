import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#020617",
        padding: "20px",
        textAlign: "center",
        color: "#94a3b8",
      }}
    >
      <Link href="pages/privacy" style={{ margin: "0 10px" }}>Privacy Policy</Link>
      <Link href="pages/terms" style={{ margin: "0 10px" }}>Terms</Link>      
      <Link href="pages/about" style={{ margin: "0 10px" }}>About Us</Link>
      <Link href="pages/faq" style={{ margin: "0 10px" }}>FAQ</Link>
      <p style={{ marginTop: "10px", fontSize: "12px" }}>
        &copy; {new Date().getFullYear()} Casual Browser Games
      </p>
    </footer>
  );
}
