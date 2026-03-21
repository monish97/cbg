export default function GamePage({ params }: { params: { slug: string } }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>{params.slug}</h1>

      <iframe
        src="https://html5.gamemonetize.com/example"
        style={{ width: "100%", height: "80vh", border: "none" }}
      />
    </div>
  );
}
