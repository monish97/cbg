import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Casual Browser Games</title>
        <meta
          name="description"
          content="Read the privacy policy of Casual Browser Games and learn how we handle user data."
        />
      </Head>

      <div className="page">
        <h1>Privacy Policy</h1>

        <div className="content-box">
          <p>
            At Casual Browser Games, we value your privacy and are committed to
            protecting your personal information. This policy outlines how we
            collect, use, and safeguard any data when you visit our website.
          </p>

          <p>
            We do not require users to create accounts or provide personal
            information to access games. However, like most websites, we may
            collect basic non-personal data such as browser type, device
            information, and pages visited. This information helps us understand
            how users interact with the platform and improve overall experience.
          </p>

          <p>
            Cookies may be used to enhance user experience. These cookies help
            remember preferences and analyze traffic patterns. You can choose to
            disable cookies through your browser settings if you prefer.
          </p>

          <p>
            Third-party services, such as embedded games or analytics tools, may
            also collect data in accordance with their own privacy policies. We
            recommend reviewing those policies for more detailed information.
          </p>

          <p>
            We do not sell, trade, or share personal data with third parties. Any
            data collected is used solely to improve the functionality and
            usability of the platform.
          </p>

          <p>
            By using this website, you agree to this privacy policy. We may
            update this policy from time to time, and any changes will be posted
            on this page.
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
