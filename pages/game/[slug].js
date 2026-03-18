import Head from "next/head";
import GameCard from "../../components/GameCard";
import { getMultiplePages } from "../../lib/api";

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
        <h1>{game.title}</h1>

        <div className="game-container">
          <iframe
            src={game.iframe}
            title={game.title}
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <div className="content-box">
          <p>{game.description}</p>
          <p>Enjoy fun, free gameplay directly in your browser!</p>
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
  const slug = context.params.slug;

  // Fetch first 3 pages for reliable lookup
  const allGames = await getMultiplePages(3);

  const game = allGames.find((g) => g.slug === slug);

  if (!game) return { notFound: true };

  const relatedGames = allGames
    .filter((g) => g.category === game.category && g.slug !== game.slug)
    .slice(0, 6);

  return {
    props: { game, relatedGames },
  };
}
