import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../../lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-6 text-center",
      className
    )}>
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

      {description && (
        <p className="text-gray-600 max-w-md mb-6">{description}</p>
      )}

      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-[#4CAF50] hover:bg-[#45a049]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
