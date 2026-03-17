import Head from "next/head";

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ - Casual Browser Games</title>
        <meta
          name="description"
          content="Frequently asked questions about playing free browser games online."
        />
      </Head>

      <div className="page">
        <h1>Frequently Asked Questions</h1>

        <div className="content-box">
          <p><strong>Are all games free to play?</strong><br />
          Yes, all games available on this platform are completely free to play directly in your browser.</p>

          <p><strong>Do I need to download anything?</strong><br />
          No downloads or installations are required. All games run instantly in your browser.</p>

          <p><strong>Can I play on mobile devices?</strong><br />
          Yes, the platform is designed to work on both desktop and mobile devices for a smooth experience.</p>

          <p><strong>What types of games are available?</strong><br />
          We offer a variety of categories including puzzle, racing, arcade, strategy, and more.</p>

          <p><strong>Why are browser games useful?</strong><br />
          Browser games are perfect for quick breaks and casual entertainment. They are easy to access and do not require powerful hardware.</p>

          <p>
            If you have additional questions, feel free to explore the platform
            and discover games that suit your preferences. We are always working
            to improve the experience and expand the game library.
          </p>
        </div>

        <style jsx>{`
          .page {
            max-width: 900px;
            margin: 0 auto;
          }

          h1 {
            font-size: 36px;
            margin-bottom: 20px;
            color: #fff;
          }

          .content-box {
            background: #0f172a;
            padding: 25px;
            border-radius: 12px;
            line-height: 1.7;
            color: #cbd5f5;
            border: 1px solid #1e293b;
          }

          p {
            margin-bottom: 16px;
          }
        `}</style>
      </div>
    </>
  );
}
