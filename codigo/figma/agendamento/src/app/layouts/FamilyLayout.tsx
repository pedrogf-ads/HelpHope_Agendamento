import { Outlet } from "react-router";
import { Home } from "lucide-react";
import { Logo } from "../components/Logo";

export default function FamilyLayout() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      <Outlet />
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center px-2 py-3">
            <div className="flex flex-col items-center gap-1 text-[#4CAF50]">
              <Home className="w-6 h-6" />
              <span className="text-xs">Início</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}