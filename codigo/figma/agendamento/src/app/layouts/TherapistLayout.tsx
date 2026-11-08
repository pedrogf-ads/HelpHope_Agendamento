import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Users, FileText, Building2 } from "lucide-react";

export default function TherapistLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/therapist", icon: Home, label: "Início" },
    { path: "/therapist/patients", icon: Users, label: "Pacientes" },
    { path: "/therapist/reports", icon: FileText, label: "Relatórios" },
    { path: "/therapist/institutional", icon: Building2, label: "Institucional" },
  ];

  const isActive = (path: string) => {
    if (path === "/therapist") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      <Outlet />
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                    active
                      ? "text-[#4CAF50] bg-[#E8F5E9]"
                      : "text-gray-500"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
