import { useState } from "react";
import { Category } from "@/types";
import { Menu, X } from "lucide-react";
import { Button } from "./button";
import { getPopularCategories } from "@/lib/categories";

interface MobileSidebarProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
}

// For mobile, we use a smaller subset of popular categories to avoid overwhelming the UI
const categories = getPopularCategories(12);

export default function MobileSidebar({ category, onCategoryChange }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (newCategory: Category) => {
    onCategoryChange(newCategory);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <Button 
          onClick={() => setIsOpen(true)} 
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-secondary transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-700 dark:text-white">Categories</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.value}>
                    <button
                      onClick={() => handleCategoryChange(cat.value as Category)}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center font-medium transition-colors
                        ${
                          category === cat.value
                            ? "bg-primary text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                    >
                      {cat.icon}
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
