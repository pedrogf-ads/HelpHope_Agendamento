import { LucideIcon } from "lucide-react";
import { cn } from "../../../lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "#4CAF50",
  iconBgColor,
  trend,
  trendValue,
  className
}: StatsCardProps) {
  const defaultIconBgColor = iconBgColor || `${iconColor}20`;

  return (
    <div className={cn(
      "bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: defaultIconBgColor }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
        {trend && trendValue && (
          <span className={cn(
            "text-xs font-semibold px-2 py-1 rounded-full",
            trend === "up" && "bg-green-100 text-green-700",
            trend === "down" && "bg-red-100 text-red-700",
            trend === "neutral" && "bg-gray-100 text-gray-700"
          )}>
            {trend === "up" && "↑"} {trend === "down" && "↓"} {trendValue}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-600">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
