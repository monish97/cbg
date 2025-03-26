import { Category } from "@/types";
import { categoryOptions, getPopularCategories } from "@/lib/categories";

interface SidebarProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
}

// Use the full set of categories in desktop sidebar
const categories = categoryOptions;

export default function Sidebar({ category, onCategoryChange }: SidebarProps) {
  return (
    <aside className="hidden md:block w-64 fixed left-0 top-24 bottom-16 overflow-y-auto bg-white dark:bg-secondary shadow-lg rounded-r-lg z-30 transition-all">
      <div className="px-4 py-5">
        <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-white">Game Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => onCategoryChange(cat.value as Category)}
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
    </aside>
  );
}
