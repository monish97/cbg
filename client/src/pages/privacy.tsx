import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h3>1. Introduction</h3>
          <p>
            Welcome to CrazyPlay's Privacy Policy. This Policy describes how we collect, use, and handle your information when you use our services.
          </p>
          
          <h3>2. Information We Collect</h3>
          <p>
            We collect information to provide better services to our users. The types of information we collect include:
          </p>
          <ul>
            <li>Usage information: how you use our service</li>
            <li>Log information: including browser type, pages visited, time spent</li>
            <li>Device information: hardware model, operating system, unique device identifiers</li>
            <li>Cookie data: information stored in cookies</li>
          </ul>
          
          <h3>3. How We Use Information</h3>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Develop new services</li>
            <li>Protect our users and the public</li>
            <li>Measure performance and analytics</li>
          </ul>
          
          <h3>4. Information Sharing</h3>
          <p>
            We do not share personal information with companies, organizations, or individuals outside of CrazyPlay except in the following cases:
          </p>
          <ul>
            <li>With your consent</li>
            <li>For legal reasons</li>
            <li>With our service providers</li>
          </ul>
          
          <h3>5. Information Security</h3>
          <p>
            We work hard to protect our users from unauthorized access, alteration, disclosure, or destruction of information we hold.
          </p>
          
          <h3>6. Children's Privacy</h3>
          <p>
            Our services are designed for general audiences. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>
          
          <h3>7. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          
          <h3>8. Contact Us</h3>
          <p>
            If you have questions about this Privacy Policy, please contact us at privacy@crazyplay.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
