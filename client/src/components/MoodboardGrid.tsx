import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { useDrag, useDrop } from "react-dnd";

interface DraggableImageProps {
  image: { id: string; url: string; alt: string };
  index: number;
  filterStyle: string;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
}

interface MoodboardGridProps {
  images: Array<{ id: string; url: string; alt: string }>;
  layout: string;
  spacing: number;
  filter: string;
  onImageReorder: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableImage({ image, index, filterStyle, moveImage }: DraggableImageProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: { type: 'IMAGE', id: image.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover(item: { type: string; id: string; index: number }) {
      if (item.index === index) {
        return;
      }
      moveImage(item.index, index);
      item.index = index;
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative aspect-square overflow-hidden rounded-md transition-all hover:scale-[1.02] ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="h-full w-full object-cover"
        style={{ filter: filterStyle }}
      />
    </div>
  );
}

export function MoodboardGrid({ images, layout, spacing, filter, onImageReorder }: MoodboardGridProps) {
  const gridStyle = useMemo(() => ({
    display: "grid",
    gap: `${spacing * 0.25}rem`,
    gridTemplateColumns: layout === "grid"
      ? `repeat(auto-fill, minmax(200px, 1fr))`
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
        {images.map((image, index) => (
          <DraggableImage
            key={image.id}
            index={index}
            image={image}
            filterStyle={filterStyle}
            moveImage={onImageReorder}
          />
        ))}
      </div>
    </Card>
  );
}
