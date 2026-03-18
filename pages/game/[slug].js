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
            `Play ${game.title} online for free. No download required. Enjoy this game instantly in your browser.`
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
              `${game.title} is a fun and engaging game that you can play directly in your browser without any downloads.`}
          </p>

          <p>
            This game is designed for quick and enjoyable gameplay, making it
            perfect for short breaks or casual entertainment sessions.
          </p>

          <p>
            Try more games like this and explore different categories to find
            your next favorite game.
          </p>
        </div>

        {/* 🔥 Related Games */}
        {relatedGames.length > 0 && (
          <>
            <h2>Related Games</h2>

            <div className="grid">
              {relatedGames.map((g) => (
                <GameCard key={g.id} game={g} />
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

export async function getServerSideProps(context) {
  const games = await getGames();

  const game = games.find((g) => g.slug === context.params.slug);

  if (!game) {
    return { notFound: true };
  }

  // 🔥 Related games (same category if available)
  const relatedGames = games
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
