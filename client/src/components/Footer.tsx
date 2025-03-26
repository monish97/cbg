import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-secondary shadow-md z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} CrazyPlay. All rights reserved.
          </div>
          <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/about">
              <a className="hover:text-primary hover:underline">About Us</a>
            </Link>
            <Link href="/contact">
              <a className="hover:text-primary hover:underline">Contact Us</a>
            </Link>
            <Link href="/privacy">
              <a className="hover:text-primary hover:underline">Privacy Policy</a>
            </Link>
            <Link href="/faq">
              <a className="hover:text-primary hover:underline">FAQs</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
