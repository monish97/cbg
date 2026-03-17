import Head from "next/head";
import { getGames } from "../../lib/api";

export default function GamePage({ game }) {
  if (!game) return <div>Game not found</div>;

  return (
    <>
      <Head>
        <title>Play {game.title} Online Free</title>
        <meta name="description" content={game.description} />
      </Head>

      <div>
        <h1>{game.title}</h1>

        <iframe
          src={game.iframe}
          width="100%"
          height="600px"
          allowFullScreen
          style={{ border: "none" }}
        ></iframe>

        <p style={{ marginTop: "20px" }}>{game.description}</p>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const games = await getGames();

  const game = games.find((g) => g.slug === context.params.slug);

  return {
    props: { game: game || null },
  };
}
