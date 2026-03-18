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

        {/* 🎮 Game Title */}
        <h1 className="game-title">{game.title}</h1>

        {/* 🎮 Game Player */}
        <section className="game-section">
          <div
            className="iframe-wrapper"
            style={{
              paddingTop: `${(game.height / game.width) * 100}%`,
            }}
          >
            <iframe
              src={game.iframe}
              title={game.title}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </section>

        {/* 📝 Description */}
        <section className="description-section">
          <h2>About this game</h2>
          <p>
            {game.description ||
              `${game.title} is a fun and engaging game that you can play directly in your browser without any downloads.`}
          </p>
          <p>
            Enjoy quick and addictive gameplay. Perfect for short breaks or casual fun.
          </p>
          <p>
            Explore more games in the same category and find your next favorite game.
          </p>
        </section>

        {/* 🔥 Related Games */}
        {relatedGames.length > 0 && (
          <section className="related-section">
            <h2>Related Games</h2>
            <div className="grid">
              {relatedGames.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </section>
        )}

      </div>

      <style jsx>{`
        .page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        h1.game-title {
          text-align: center;
          font-size: 36px;
          color: #fff;
          margin-bottom: 25px;
        }

        .game-section {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        .iframe-wrapper {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #1e293b;
          background: #000;
        }

        .iframe-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .description-section {
          background: #0f172a;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 40px;
          color: #cbd5f5;
          line-height: 1.7;
          border: 1px solid #1e293b;
        }

        .description-section h2 {
          margin-bottom: 15px;
          font-size: 24px;
          color: #fff;
        }

        .related-section {
          margin-bottom: 50px;
        }

        .related-section h2 {
          margin-bottom: 20px;
          font-size: 28px;
          color: #fff;
          text-align: center;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 15px;
        }
      `}</style>
    </>
  );
}

// SSR
export async function getServerSideProps(context) {
  const games = await getGames();

  const game = games.find((g) => g.slug === context.params.slug);

  if (!game) {
    return { notFound: true };
  }

  // Related games: same category
  const relatedGames = games
    .filter(
      (g) => g.category === game.category && g.slug !== game.slug
    )
    .slice(0, 6);

  return {
    props: {
      game,
      relatedGames,
    },
  };
}
