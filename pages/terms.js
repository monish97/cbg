import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Casual Browser Games</title>
        <meta
          name="description"
          content="Read the terms and conditions for using Casual Browser Games."
        />
      </Head>

      <div className="page">
        <h1>Terms and Conditions</h1>

        <div className="content-box">
          <p>
            By accessing and using Casual Browser Games, you agree to comply
            with these terms and conditions. If you do not agreed with any part of
            these terms, please discontinue use of the website.
          </p>

          <p>
            All games provided on this platform are for entertainment purposes
            only. We do not guarantee uninterrupted availability or error-free
            performance of the website or the games.
          </p>

          <p>
            Users agree not to misuse the platform, attempt unauthorized access,
            or engage in any activity that could harm the website or other users.
          </p>

          <p>
            The content available on this website, including games, graphics, and
            layout, may be sourced from third-party providers. Ownership and
            rights to such content remain with their respective owners.
          </p>

          <p>
            We reserve the right to modify or discontinue any part of the
            platform at any time without prior notice.
          </p>

          <p>
            These terms may be updated periodically. Continued use of the website
            after changes are made indicates acceptance of the revised terms.
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
