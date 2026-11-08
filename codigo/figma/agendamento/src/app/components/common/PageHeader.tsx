import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Menu, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cn } from "../../../lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgColor?: string;
  bgGradient?: string;
  showBackButton?: boolean;
  backPath?: string;
  onBackClick?: () => void;
  showUserMenu?: boolean;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onLogoutClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  bgColor = "bg-[#4CAF50]",
  bgGradient,
  showBackButton = false,
  backPath,
  onBackClick,
  showUserMenu = true,
  onProfileClick,
  onSettingsClick,
  onHelpClick,
  onLogoutClick,
  children,
  className
}: PageHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={cn(
      "text-white p-6 rounded-b-3xl shadow-lg",
      bgGradient || bgColor,
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-white/20 rounded-xl transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}

            <div className="flex-1">
              <h1 className="text-white text-2xl">{title}</h1>
              {subtitle && (
                <p className="text-white/90 text-sm mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {showUserMenu && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm">
                  <Menu className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {onProfileClick && (
                  <DropdownMenuItem className="cursor-pointer" onClick={onProfileClick}>
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                )}
                {onSettingsClick && (
                  <DropdownMenuItem className="cursor-pointer" onClick={onSettingsClick}>
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </DropdownMenuItem>
                )}
                {onHelpClick && (
                  <DropdownMenuItem className="cursor-pointer" onClick={onHelpClick}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Ajuda
                  </DropdownMenuItem>
                )}
                {(onProfileClick || onSettingsClick || onHelpClick) && onLogoutClick && (
                  <DropdownMenuSeparator />
                )}
                {onLogoutClick && (
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={onLogoutClick}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair / Desconectar
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
