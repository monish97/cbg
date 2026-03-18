import Head from "next/head";
import GameCard from "../../components/GameCard";
import { getAllCachedGames, getGames } from "../../lib/api";

export default function GamePage({ game, relatedGames }) {
  if (!game) return <div>Game not found</div>;

  return (
    <>
      <Head>
        <title>Play {game.title} Online Free | Casual Browser Games</title>
        <meta
          name="description"
          content={game.description || `Play ${game.title} online for free!`}
        />
      </Head>

      <div className="page">
        <h1>{game.title}</h1>
        <div className="game-container">
          <iframe
            src={game.iframe}
            title={game.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="content-box">
          <p>{game.description}</p>
        </div>

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
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // Try all cached pages first
  let allGames = getAllCachedGames();

  // If cache empty, fetch first 5 pages to populate cache
  if (allGames.length === 0) {
    const promises = [1, 2, 3, 4, 5].map((p) => getGames(p));
    await Promise.all(promises);
    allGames = getAllCachedGames();
  }

  const game = allGames.find((g) => g.slug === context.params.slug);

  if (!game) return { notFound: true };

  const relatedGames = allGames
    .filter((g) => g.category === game.category && g.slug !== game.slug)
    .slice(0, 6);

  return { props: { game, relatedGames } };
}
