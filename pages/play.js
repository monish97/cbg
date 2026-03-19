import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Play() {
  const router = useRouter();
  const { url, title } = router.query;
  const [gameUrl, setGameUrl] = useState("");

  useEffect(() => {
    if (url) setGameUrl(url);
  }, [url]);

  if (!gameUrl) return <div>Loading game...</div>;

  return (
    <>
      <Head>
        <title>Play {title || "Game"} Online Free | Casual Browser Games</title>
        <meta
          name="description"
          content={`Play ${title || "this game"} online for free in your browser.`}
        />
      </Head>

      <div className="page">
        <h1 className="game-title">{title || "Game"}</h1>

        <section className="game-section">
          <div className="iframe-wrapper">
            <iframe
              src={gameUrl}
              title={title || "Game"}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </section>
      </div>
    </>
  );
}
