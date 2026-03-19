import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function PlayGame() {
  const router = useRouter();
  const { slug } = router.query;
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchGame() {
      try {
        const res = await fetch(`https://api.gamemonetize.com/api/game/${slug}`);
        const g = await res.json();
        setGame({
          title: g.title,
          url: g.url,
          description: g.description,
        });
      } catch (err) {
        console.error("Failed to fetch game:", err);
      }
    }

    fetchGame();
  }, [slug]);

  if (!game) return <div>Loading game...</div>;

  return (
    <>
      <Head>
        <title>Play {game.title} Online Free | Casual Browser Games</title>
        <meta name="description" content={game.description || `Play ${game.title} online for free.`} />
      </Head>

      <div className="page">
        <h1 className="game-title">{game.title}</h1>
        <div className="iframe-wrapper">
          <iframe
            src={game.url}
            title={game.title}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
