import { useRouter } from "next/router";

export default function Play() {
  const router = useRouter();
  const { url, title } = router.query;

  if (!url) return <div>Game not found</div>;

  return (
    <div className="page">
      <h1 className="game-title">{title}</h1>
      <div className="iframe-wrapper">
        <iframe src={url} title={title} frameBorder="0" allowFullScreen />
      </div>
    </div>
  );
}
