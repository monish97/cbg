import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - Casual Browser Games</title>
        <meta
          name="description"
          content="Get in touch with Casual Browser Games for feedback or inquiries."
        />
      </Head>

      <div className="page">
        <h1>Contact Us</h1>

        <div className="content-box">
          <p>
            We value your feedback and are always looking for ways to improve the
            platform. If you have suggestions, questions, or encounter any
            issues while using the website, feel free to reach out.
          </p>

          <p>
            Casual Browser Games is built with the goal of providing a smooth and
            enjoyable gaming experience. Your input helps us understand what
            works well and what can be improved.
          </p>

          <p>
            Whether it’s reporting a bug, suggesting a feature, or sharing your
            thoughts about the games, we welcome all types of feedback.
          </p>

          <p>
            You can contact us via email at:
            <br />
            <strong>casualbrowsergames@gmail.com</strong>
          </p>

          <p>
            We aim to respond as quickly as possible and appreciate your patience.
            Thank you for being a part of our growing platform.
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
