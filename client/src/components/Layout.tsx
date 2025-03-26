import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import MobileSidebar from "./ui/mobile-sidebar";
import { useTheme } from "@/hooks/use-theme";
import { Category } from "@/types";

interface LayoutProps {
  children: ReactNode;
  category: Category;
  setCategory: (category: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Layout({ 
  children, 
  category, 
  setCategory, 
  searchQuery, 
  setSearchQuery 
}: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      <div className="flex flex-col md:flex-row pt-24 pb-16">
        <Sidebar category={category} onCategoryChange={setCategory} />
        <MobileSidebar category={category} onCategoryChange={setCategory} />
        <main className="flex-1 md:ml-64 px-4 py-6">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
