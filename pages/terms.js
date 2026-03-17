import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Casual Browser Games</title>
        <meta
          name="description"
          content="Read the Terms of Service for Casual Browser Games (CBG), covering user access, gaming content, privacy, and more."
        />
      </Head>

      <div className="terms-container">
        <h1>Casual Browser Games – Terms of Service</h1>
        <p><strong>Last updated:</strong> [Insert Date]</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>Casual Browser Games (CBG)</strong> (“CBG”, “we”, “us”, or “our”). 
            These Terms of Service (“Terms”) govern your use of our website and platform (“Platform”). 
            By accessing or using our Platform, you agree to be bound by these Terms and our 
            <Link href="/privacy"> Privacy Policy</Link>. If you do not agree, please do not use the Platform.
          </p>
          <p>
            CBG provides a web-based gaming platform for playing free casual browser games. Our Platform 
            is intended for users aged <strong>13 years or older</strong> (or the minimum age in your country). 
            If you are under 13, you may not use the Platform without parental consent.
          </p>
        </section>

        <section>
          <h2>2. User License and Gaming Content</h2>
          <p>
            CBG grants you a <strong>limited, non-exclusive, non-transferable license</strong> to access 
            and play games on our Platform for personal, non-commercial use. All games, images, and other 
            content remain the property of their respective owners.
          </p>
          <p>
            You may share gameplay videos on platforms like YouTube or Twitch <strong>if</strong>:
          </p>
          <ul>
            <li>CBG’s Platform or logo is visible and not obscured.</li>
            <li>Monetization complies with the rules of the platform.</li>
            <li>You do not imply official sponsorship or endorsement by CBG.</li>
          </ul>
        </section>

        <section>
          <h2>3. Access and Use</h2>
          <p>
            You may access CBG <strong>with or without an account</strong>. You are responsible for all 
            activities under your account. You must provide accurate information if registering an account 
            and protect your login credentials.
          </p>
          <p>You may <strong>not</strong>:</p>
          <ul>
            <li>Copy, sell, or distribute the Platform or its content.</li>
            <li>Reverse engineer or decompile our Platform.</li>
            <li>Generate spam or unsolicited advertisements.</li>
            <li>Circumvent technical protections.</li>
            <li>Use automated scraping tools without permission.</li>
          </ul>
        </section>

        <section>
          <h2>4. Privacy</h2>
          <p>
            Our handling of personal data is explained in our <Link href="/privacy">Privacy Policy</Link>. 
            We do not knowingly collect personal data from children under 13.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Content & Promotions</h2>
          <p>
            CBG may link to third-party websites or services. We are <strong>not responsible</strong> for 
            their content, transactions, or privacy practices. Participation in promotions or contests 
            from third parties is at your own risk.
          </p>
        </section>

        <section>
          <h2>6. In-Game Purchases</h2>
          <p>
            CBG may facilitate access to third-party in-game purchases. We are <strong>not responsible</strong> 
            for the quality, availability, or refund policies of these third-party services.
          </p>
        </section>

        <section>
          <h2>7. Trademarks</h2>
          <p>
            All logos, marks, and content on the Platform are protected by copyright or trademark laws. 
            You may not misuse or misrepresent these assets.
          </p>
        </section>

        <section>
          <h2>8. Embedding Games</h2>
          <p>
            Third-party websites may embed games only if CBG provides an “embed” feature. Misuse of embedded 
            content (e.g., removing ads, altering code) is prohibited.
          </p>
        </section>

        <section>
          <h2>9. Disclaimers & Limitation of Liability</h2>
          <p>
            The Platform and all materials are provided <strong>“as-is”</strong> without warranties. 
            To the maximum extent permitted by law, CBG is not liable for any damages resulting from your use.
          </p>
        </section>

        <section>
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless CBG and its affiliates from any claims, damages, or costs 
            arising from your use of the Platform or violation of these Terms.
          </p>
        </section>

        <section>
          <h2>11. Termination</h2>
          <p>
            CBG may suspend or terminate your access at our discretion if you violate these Terms. You may also 
            request deletion of your account at any time.
          </p>
        </section>

        <section>
          <h2>12. Feedback</h2>
          <p>
            If you provide suggestions or feedback, you grant CBG a non-exclusive, royalty-free license to use 
            it in any manner.
          </p>
        </section>

        <section>
          <h2>13. Copyright Claims</h2>
          <p>
            If you believe your copyrighted content is infringed, please contact us at 
            <a href="mailto:legal@casualbrowsergames.com">legal@casualbrowsergames.com</a>. US residents may 
            file notices under the DMCA.
          </p>
        </section>

        <section>
          <h2>14. Dispute Resolution</h2>
          <p>
            We encourage resolving disputes in good faith. Any unresolved disputes are governed by the laws of 
            your country of residence, where applicable.
          </p>
        </section>

        <section>
          <h2>15. Miscellaneous</h2>
          <p>
            These Terms and our Privacy Policy constitute the <strong>entire agreement</strong> between you and CBG. 
            If any provision is invalid, the rest remain enforceable. Use of the Platform does not create an 
            employment or partnership relationship.
          </p>
        </section>

        <footer className="terms-footer">
          <p>&copy; {new Date().getFullYear()} Casual Browser Games. All rights reserved.</p>
        </footer>
      </div>

      <style jsx>{`
        .terms-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
          line-height: 1.6;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
        }
        h2 {
          margin-top: 30px;
          margin-bottom: 10px;
          color: #222;
        }
        ul {
          margin-left: 20px;
        }
        a {
          color: #0070f3;
          text-decoration: underline;
        }
        .terms-footer {
          text-align: center;
          margin-top: 50px;
          font-size: 0.9rem;
          color: #555;
        }
      `}</style>
    </>
  );
}
