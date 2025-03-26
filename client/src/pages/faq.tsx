import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FAQ() {
  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Are all games on CrazyPlay free?</AccordionTrigger>
              <AccordionContent>
                Yes! All games on CrazyPlay are completely free to play. We don't require any subscriptions or payments to access our full library of games.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Do I need to install anything to play games?</AccordionTrigger>
              <AccordionContent>
                No, you don't need to install anything. All games on CrazyPlay are browser-based and run directly in your web browser. This makes them instantly accessible on any device with a modern web browser.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I play games on mobile devices?</AccordionTrigger>
              <AccordionContent>
                Absolutely! CrazyPlay is fully responsive and designed to work on all devices including smartphones and tablets. The experience is optimized for touch interfaces on mobile devices.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How often are new games added?</AccordionTrigger>
              <AccordionContent>
                We regularly update our game library with new titles. We typically add new games weekly to ensure there's always something fresh and exciting to play.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Why do some games take longer to load?</AccordionTrigger>
              <AccordionContent>
                Load times can vary based on several factors including your internet connection speed, the complexity of the game, and your device's performance. Most games should load within a few seconds, but larger games might take slightly longer.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>Can I suggest a game to be added to the platform?</AccordionTrigger>
              <AccordionContent>
                Yes! We love hearing suggestions from our community. If there's a particular game you'd like to see on CrazyPlay, please use our Contact form to let us know.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger>How do I report a bug or issue with a game?</AccordionTrigger>
              <AccordionContent>
                If you encounter any bugs or issues while playing, please let us know through our Contact page. Please include as much detail as possible, including the name of the game, the device you're using, and a description of the issue.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger>Are the games suitable for children?</AccordionTrigger>
              <AccordionContent>
                CrazyPlay offers a wide variety of games suitable for different age groups. While many games are family-friendly, we recommend parents review games before allowing younger children to play them, as some may contain content more appropriate for older players.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
