import Head from "next/head";
import GameCard from "../../components/GameCard";
import { getGames } from "../../lib/api";

export default function GamePage({ game, relatedGames }) {
  if (!game) return <div>Game not found</div>;

  return (
    <>
      <Head>
        <title>Play {game.title} Online Free | Casual Browser Games</title>

        <meta
          name="description"
          content={
            game.description ||
            `Play ${game.title} online for free. No download required. Enjoy instantly in your browser.`
          }
        />
      </Head>

      <div className="page">
        {/* 🎮 Title */}
        <h1>{game.title}</h1>

        {/* 🎮 Game Player */}
        <div className="game-container">
          <iframe
            src={game.iframe}
            title={game.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* 📝 Description */}
        <div className="content-box">
          <p>
            {game.description ||
              `${game.title} is a fun and engaging browser game you can play instantly without downloads.`}
          </p>

          <p>
            Perfect for quick entertainment, this game offers smooth gameplay and exciting challenges.
          </p>

          <p>
            Explore more games on our platform and discover your next favorite!
          </p>
        </div>

        {/* 🔥 Related Games */}
        {relatedGames.length > 0 && (
          <>
            <h2>Related Games</h2>

            <div className="grid">
              {relatedGames.map((g) => (
                <GameCard key={g.slug} game={g} />
              ))}
            </div>
          </>
        )}

        <style jsx>{`
          .page {
            max-width: 1000px;
            margin: 0 auto;
          }

          h1 {
            font-size: 32px;
            margin-bottom: 20px;
            color: #fff;
          }

          .game-container {
            width: 100%;
            height: 500px;
            background: #000;
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 25px;
            border: 1px solid #1e293b;
          }

          iframe {
            width: 100%;
            height: 100%;
          }

          .content-box {
            background: #0f172a;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            color: #cbd5f5;
            line-height: 1.7;
            border: 1px solid #1e293b;
          }

          h2 {
            margin-bottom: 15px;
            color: #fff;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 15px;
          }
        `}</style>
      </div>
    </>
  );
}

// ✅ FIXED SSR (MULTI-PAGE FETCH)
export async function getServerSideProps(context) {
  let allGames = [];

  // 🔥 Fetch multiple pages to avoid 404
  for (let i = 1; i <= 5; i++) {
    const games = await getGames(i);
    allGames = [...allGames, ...games];
  }

  const game = allGames.find(
    (g) => g.slug === context.params.slug
  );

  if (!game) {
    return { notFound: true };
  }

  // 🔥 Related games
  const relatedGames = allGames
    .filter(
      (g) =>
        g.category === game.category &&
        g.slug !== game.slug
    )
    .slice(0, 6);

  return {
    props: {
      game,
      relatedGames,
    },
  };
}
