import { Outlet, useLocation, useNavigate } from "react-router";
import {
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  Home,
  LogOut,
  Menu,
  Settings,
  Stethoscope,
  Users,
  Wifi,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ReceptionHelpDialog } from "../components/common/ReceptionHelpDialog";
import helpHopeLogo from "../../imports/helphope.png";
import asipecaLogo from "../../imports/Asipeca_logo-4.jpg";
import { ReceptionDataProvider } from "../screens/reception/ReceptionDataContext";
import { getSession, signOut } from "../services/prototypeAuth";

type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
};

const primaryItems: NavItem[] = [
  { label: "Início", path: "/reception", icon: Home },
  { label: "Agenda", path: "/reception/agenda", icon: CalendarDays },
  { label: "Pacientes", path: "/reception/pacientes", icon: Users },
  { label: "Notificações", path: "/reception/notificacoes", icon: Bell, badge: "3" },
];

const managementItems: NavItem[] = [
  { label: "Profissionais", path: "/reception/profissionais", icon: Stethoscope },
  { label: "Unidades e Recursos", path: "/reception/recursos", icon: Building2 },
  { label: "Configurações", path: "/reception/configuracoes", icon: Settings },
];

export default function ReceptionLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unitOpen, setUnitOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [unit, setUnit] = useState("Unidade Centro");
  const session = getSession();
  const role = "Recepção";
  const userName = session?.name || "Recepção ASIPECA";
  const initials = userName.split(" ").slice(0, 2).map((item) => item[0]).join("").toUpperCase();

  const go = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const active =
      item.path === "/reception"
        ? location.pathname === item.path
        : location.pathname.startsWith(item.path);
    return (
      <button
        key={item.path}
        onClick={() => go(item.path)}
        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
          active
            ? "bg-white text-[#287a3d] shadow-[0_6px_18px_rgba(18,84,40,0.18)]"
            : "text-white/85 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
        <span className="flex-1 font-semibold">{item.label}</span>
        {item.badge && (
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
              active ? "bg-[#e8f5e9] text-[#287a3d]" : "bg-white/20 text-white"
            }`}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  const sidebar = (
    <aside className="flex h-full w-[252px] flex-col bg-gradient-to-b from-[#3fa64b] via-[#329544] to-[#24783a] text-white">
      <div className="border-b border-white/15 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-sm">
            <ImageWithFallback src={helpHopeLogo} alt="Logo HelpHope" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-lg font-bold leading-tight">HelpHope</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
              Gestão ASIPECA
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
          Menu principal
        </p>
        <div className="space-y-1">{primaryItems.map(renderItem)}</div>
        <p className="mb-2 mt-7 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
          Gerenciamento
        </p>
        <div className="space-y-1">{managementItems.map(renderItem)}</div>
      </nav>

      <div className="border-t border-white/15 p-3">
        <div className="mb-2 rounded-xl bg-black/10 p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{userName}</p>
              <p className="truncate text-[11px] text-white/65">{role} · {unit}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            signOut();
            localStorage.removeItem("helphope-session-role");
            navigate("/login");
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Sair
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">{sidebar}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-slate-950/45" onClick={() => setMobileOpen(false)} aria-label="Fechar menu" />
          <div className="relative h-full w-[252px]">
            {sidebar}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 rounded-lg bg-white/15 p-1.5"
              aria-label="Fechar menu lateral"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen lg:pl-[252px]">
        <header className="sticky top-0 z-20 flex h-[66px] items-center justify-between border-b border-border bg-white/95 px-4 backdrop-blur md:px-7">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg border border-border p-2 text-slate-600 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setUnitOpen(!unitOpen)}
                className="flex items-center gap-2 rounded-xl border border-border bg-[#f8fbf8] px-3 py-2 text-left transition hover:border-[#a5d6a7]"
              >
                <Building2 className="h-4 w-4 text-[#3f9f4b]" />
                <div className="hidden sm:block">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Unidade atual</p>
                  <p className="text-xs font-semibold text-slate-700">{unit}</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
              {unitOpen && (
                <div className="absolute left-0 top-12 w-56 rounded-xl border border-border bg-white p-1.5 shadow-xl">
                  {["Unidade Centro", "Unidade Jardim Esperança"].map((name) => (
                    <button
                      key={name}
                      onClick={() => {
                        setUnit(name);
                        setUnitOpen(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium ${
                        unit === name ? "bg-[#e8f5e9] text-[#287a3d]" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-[#edf8ef] px-2.5 py-1 text-[11px] font-semibold text-[#287a3d] sm:flex">
              <Wifi className="h-3 w-3" />
              Sincronizado agora
            </span>
            <button onClick={() => navigate("/reception/notificacoes")} className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100" aria-label="Abrir notificações">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-amber-500" />
            </button>
            <button onClick={() => setHelpOpen(true)} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100" aria-label="Abrir ajuda">
              <CircleHelp className="h-5 w-5" />
            </button>
            <div className="ml-1 hidden h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1 md:flex">
              <ImageWithFallback src={asipecaLogo} alt="Logo ASIPECA" className="h-full w-full object-contain" />
            </div>
          </div>
        </header>
        <main>
          <ReceptionDataProvider>
            <Outlet />
          </ReceptionDataProvider>
        </main>
      </div>
      <ReceptionHelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </div>
  );
}
