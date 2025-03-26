import { Link } from "wouter";
import Logo from "./Logo";
import Search from "./ui/search";
import ThemeToggle from "./ui/theme-toggle";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ searchQuery, onSearchChange, theme, toggleTheme }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-secondary shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center">
            <Logo />
          </a>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:block w-1/3">
          <Search value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>

      {/* Search Bar - Mobile */}
      <div className="md:hidden px-4 py-2">
        <Search value={searchQuery} onChange={onSearchChange} />
      </div>
    </header>
  );
}
