import { cn } from "../../../lib/utils";

type StatusType = "success" | "warning" | "error" | "info" | "neutral";
type SizeType = "sm" | "md" | "lg";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  size?: SizeType;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  success: "bg-green-100 text-green-700 border-green-200",
  warning: "bg-orange-100 text-orange-700 border-orange-200",
  error: "bg-red-100 text-red-700 border-red-200",
  info: "bg-blue-100 text-blue-700 border-blue-200",
  neutral: "bg-gray-100 text-gray-700 border-gray-200"
};

const sizeStyles: Record<SizeType, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base"
};

export function StatusBadge({
  status,
  label,
  size = "md",
  className
}: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center font-semibold rounded-full border",
      statusStyles[status],
      sizeStyles[size],
      className
    )}>
      {label}
    </span>
  );
}
