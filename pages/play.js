import { useRouter } from "next/router";
import gamesData from "../data/games.json";
import GameCard from "../components/GameCard";
import Head from "next/head";

export default function PlayPage() {
  const router = useRouter();
  const { id } = router.query;

  // Wait for router.query to be ready
  if (!id) return <div>Loading...</div>;

  const gameId = Number(id);
  const game = gamesData.find((g) => g.id === gameId);

  if (!game) return <div>Game not found + game</div>;

  const relatedGames = gamesData
    .filter((g) => g.category === game.category && g.id !== game.id)
    .slice(0, 6);

  return (
    <>
      <Head>
        <title>Play {game.title} Online Free | Casual Browser Games</title>
        <meta
          name="description"
          content={game.description || `Play ${game.title} online for free in your browser.`}
        />
      </Head>

      <div className="page">
        <h1 className="game-title">{game.title}</h1>

        <section className="game-section">
          <div
            className="iframe-wrapper"
            style={{ paddingTop: `${(game.height / game.width) * 100}%` }}
          >
            <iframe
              src={game.url}
              title={game.title}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </section>

        <section className="description-section">
          <h2>About this game</h2>
          <p>{game.description}</p>
          {game.instruction && (
            <>
              <h3>How to Play</h3>
              <p>{game.instruction}</p>
            </>
          )}
        </section>

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
    </>
  );
}
