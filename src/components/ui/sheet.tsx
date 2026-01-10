"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// Constants for resizable sheet
const CLOSE_THRESHOLD_PX = 200; // If dragged below this, close the sheet

// Snap points for sheet width (in percent)
const SNAP_POINTS = [40, 50, 70] as const;
const DEFAULT_WIDTH_PERCENT = SNAP_POINTS[1]; // Default: 50% (half screen)

// Find the nearest snap point to a given width
function findNearestSnapPoint(width: number): number {
  let nearest: number = SNAP_POINTS[0];
  let minDistance = Math.abs(width - SNAP_POINTS[0]);

  for (const point of SNAP_POINTS) {
    const distance = Math.abs(width - point);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = point;
    }
  }

  return nearest;
}

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:duration-300 data-[state=open]:duration-500",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l rounded-l-2xl sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r rounded-r-2xl sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 px-4 pt-6 pb-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 px-4 py-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

// Resizable Sheet Content - opens from right with drag-to-resize
function ResizableSheetContent({
  className,
  children,
  onClose,
  ...props
}: Omit<React.ComponentProps<typeof SheetPrimitive.Content>, "onClose"> & {
  onClose?: () => void;
}) {
  const [width, setWidth] = React.useState<number>(DEFAULT_WIDTH_PERCENT);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartX = React.useRef(0);
  const dragStartWidth = React.useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartWidth.current = width;
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const screenWidth = window.innerWidth;
      const deltaX = dragStartX.current - e.clientX;
      const deltaPercent = (deltaX / screenWidth) * 100;
      const newWidth = dragStartWidth.current + deltaPercent;

      // Calculate actual pixel width for threshold check
      const newWidthPx = (newWidth / 100) * screenWidth;

      if (newWidthPx < CLOSE_THRESHOLD_PX) {
        // Close the sheet if dragged too narrow
        setIsDragging(false);
        onClose?.();
        return;
      }

      // Clamp between min and max snap points
      const minSnap = Math.min(...SNAP_POINTS);
      const maxSnap = Math.max(...SNAP_POINTS);
      const clampedWidth = Math.min(maxSnap, Math.max(minSnap, newWidth));
      setWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      // Snap to nearest snap point on release
      setWidth((prev) => findNearestSnapPoint(prev));
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onClose]);

  // Reset width when sheet opens
  React.useEffect(() => {
    setWidth(DEFAULT_WIDTH_PERCENT);
  }, []);

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background fixed z-50 flex flex-col gap-4 shadow-lg overflow-hidden",
          "inset-y-0 right-0 h-full border-l rounded-l-2xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          "data-[state=closed]:duration-300 data-[state=open]:duration-500",
          "data-[state=open]:ease-out data-[state=closed]:ease-in",
          isDragging
            ? "!transition-none"
            : "transition-[width] duration-300 ease-out",
          className,
        )}
        style={{
          width: `${width}%`,
          // Custom cubic-bezier for smoother animation
          transitionTimingFunction: isDragging
            ? "none"
            : "cubic-bezier(0.32, 0.72, 0, 1)",
        }}
        {...props}
      >
        {/* Resize Handle */}
        <div
          onMouseDown={handleMouseDown}
          className={cn(
            "absolute left-0 top-0 h-full w-3 cursor-ew-resize flex items-center justify-center",
            "hover:bg-primary/10 transition-colors group",
            isDragging && "bg-primary/10",
          )}
        >
          <div className="h-12 w-1 rounded-full bg-muted-foreground/30 group-hover:bg-primary/50 transition-colors" />
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pl-4">
          {children}
        </div>

        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  ResizableSheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
