import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">About CrazyPlay</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Welcome to CrazyPlay, your premier destination for free online browser games. We've created a platform where gamers of all ages can discover and enjoy a wide variety of high-quality games without downloads or installations.
          </p>
          <p className="mb-4">
            Our mission is to provide a seamless gaming experience directly in your browser. We've partnered with GamePix to bring you the best selection of games across multiple categories - from action-packed adventures to brain-teasing puzzles and everything in between.
          </p>
          <p>
            Whether you're looking to fill a few minutes during a break or dive into hours of entertainment, CrazyPlay has something for everyone. Our responsive design ensures you can enjoy our games on any device, from desktop computers to mobile phones.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Our Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            We believe that great games should be accessible to everyone. That's why CrazyPlay is completely free to use, with no hidden fees or subscriptions required.
          </p>
          <p className="mb-4">
            We're constantly updating our library with new and exciting games to ensure there's always something fresh to discover. Our team carefully selects each title to maintain a high standard of quality and variety.
          </p>
          <p>
            Thank you for choosing CrazyPlay as your gaming destination. We hope you enjoy your time here and find games that bring you joy and entertainment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
