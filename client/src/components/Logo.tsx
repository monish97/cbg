import { Gamepad2 } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Gamepad2 className="w-8 h-8 text-primary" />
      <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">CrazyPlay</span>
    </div>
  );
}
