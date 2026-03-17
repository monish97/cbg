import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Casual Browser Games</title>
        <meta
          name="description"
          content="Learn about Casual Browser Games, your destination for free online games with no downloads."
        />
      </Head>

      <div className="page">
        <h1>About Us</h1>

        <div className="content-box">
          <p>
            Casual Browser Games is a simple and enjoyable platform designed for
            anyone who loves quick, accessible entertainment. Our goal is to
            provide a collection of free online games that can be played
            instantly without downloads, installations, or complicated setups.
          </p>

          <p>
            Whether you enjoy puzzle games that challenge your thinking, racing
            games that bring excitement, or arcade-style games that are easy to
            jump into, our platform offers a wide variety of experiences. We aim
            to make gaming easy, fast, and enjoyable for everyone, regardless of
            device or skill level.
          </p>

          <p>
            One of the core ideas behind Casual Browser Games is convenience.
            Modern users don’t always want long downloads or high system
            requirements. That’s why every game on this platform runs directly in
            your browser, allowing you to start playing within seconds.
          </p>

          <p>
            We are continuously improving the platform by adding new games,
            refining the browsing experience, and making it easier to discover
            content based on your interests. Categories help users quickly find
            games they enjoy, while search functionality makes navigation even
            smoother.
          </p>

          <p>
            Our mission is simple — to create a space where anyone can relax,
            unwind, and enjoy casual games anytime, anywhere.
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
