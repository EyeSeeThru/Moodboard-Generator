import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodboardGrid } from "../components/MoodboardGrid";
import { CustomizationPanel } from "../components/CustomizationPanel";
import { ImageUploader } from "../components/ImageUploader";
import { KeywordSearch } from "../components/KeywordSearch";
import { useToast } from "@/hooks/use-toast";

const EXAMPLE_IMAGES = [
  {
    id: "inspiration-1",
    url: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
    alt: "Inspiration wall by Austin Chan",
  },
  {
    id: "inspiration-2",
    url: "https://images.unsplash.com/photo-1497005367839-6e852de72767",
    alt: "Inspiration wall by Nik",
  },
  {
    id: "creative-1",
    url: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
    alt: "Creative collage by Austin Chan",
  },
  {
    id: "creative-2",
    url: "https://images.unsplash.com/photo-1504805572947-34fad45aed93",
    alt: "Creative collage by Clark Tibbs",
  },
];

export function Home() {
  const [images, setImages] = useState(EXAMPLE_IMAGES);
  const [layout, setLayout] = useState("grid");
  const [spacing, setSpacing] = useState(2);
  const [filter, setFilter] = useState("none");
  const { toast } = useToast();

  const handleImageUpload = (newImage: { id: string; url: string; alt: string }) => {
    setImages([...images, newImage]);
  };

  const handleKeywordSearch = (keyword: string) => {
    // In a real app, this would search an image API
    toast({
      title: "Search performed",
      description: `Searched for: ${keyword}`,
    });
  };

  const handleExport = () => {
    // In a real app, this would generate and download the moodboard
    toast({
      title: "Export successful",
      description: "Your moodboard has been exported",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Moodboard Generator</h1>
          <p className="text-muted-foreground">
            Create beautiful moodboards with ease
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <Card className="p-4">
              <div className="flex gap-4 flex-wrap">
                <ImageUploader onUpload={handleImageUpload} />
                <KeywordSearch onSearch={handleKeywordSearch} />
                <Button onClick={handleExport}>Export Moodboard</Button>
              </div>
            </Card>

            <MoodboardGrid
              images={images}
              layout={layout}
              spacing={spacing}
              filter={filter}
            />
          </div>

          <CustomizationPanel
            layout={layout}
            spacing={spacing}
            filter={filter}
            onLayoutChange={setLayout}
            onSpacingChange={setSpacing}
            onFilterChange={setFilter}
          />
        </div>
      </div>
    </div>
  );
}
