import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

type Variant = "icon" | "lg";

interface ViewActionButtonProps<T> {
  item: T;
  onView: (item: T) => void;
  className?: string;
  variant?: Variant;
  label?: string;
}

export function ViewActionButton<T>({
  item,
  onView,
  className = "",
  variant = "icon",
  label = "View",
}: Readonly<ViewActionButtonProps<T>>) {
  const handleView = () => {
    onView(item);
  };

  return (
    <>
      {variant === "icon" ? (
        <Button
          onClick={handleView}
          className={`h-8 w-8 p-0 text-w300 hover:text-n0 ${className}`}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ) : (
        <Button onClick={handleView} className={className}>
          <Eye className="h-4 w-4 mr-2" />
          {label}
        </Button>
      )}
    </>
  );
}
