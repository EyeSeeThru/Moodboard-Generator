import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { useDrag, useDrop } from "react-dnd";

interface MoodboardGridProps {
  images: Array<{ id: string; url: string; alt: string }>;
  layout: string;
  spacing: number;
  filter: string;
}

export function MoodboardGrid({ images, layout, spacing, filter }: MoodboardGridProps) {
  const gridStyle = useMemo(() => ({
    display: "grid",
    gap: `${spacing * 0.25}rem`,
    gridTemplateColumns: layout === "grid" 
      ? "repeat(auto-fill, minmax(200px, 1fr))" 
      : "1fr",
  }), [layout, spacing]);

  const filterStyle = useMemo(() => {
    switch (filter) {
      case "grayscale":
        return "grayscale(100%)";
      case "sepia":
        return "sepia(100%)";
      case "blur":
        return "blur(2px)";
      default:
        return "none";
    }
  }, [filter]);

  return (
    <Card className="p-4">
      <div style={gridStyle}>
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-md transition-all hover:scale-[1.02]"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="h-full w-full object-cover"
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
