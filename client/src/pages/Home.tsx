import React, { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { searchImages } from "../lib/api";
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
  
  const handleImageReorder = useCallback((dragIndex: number, hoverIndex: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      [newImages[dragIndex], newImages[hoverIndex]] = [
        newImages[hoverIndex],
        newImages[dragIndex],
      ];
      return newImages;
    });
  }, []);
  const [layout, setLayout] = useState("grid");
  const [spacing, setSpacing] = useState(2);
  const [filter, setFilter] = useState("none");
  const { toast } = useToast();

  const handleImageUpload = (newImage: { id: string; url: string; alt: string }) => {
    setImages([...images, newImage]);
  };

  const handleKeywordSearch = async (keyword: string) => {
    try {
      const searchResults = await searchImages(keyword);
      setImages((prevImages) => [...prevImages, ...searchResults]);
      toast({
        title: "Images found",
        description: `Added ${searchResults.length} images to your moodboard`,
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Failed to fetch images. Please try again.",
        variant: "destructive",
      });
    }
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
              onImageReorder={handleImageReorder}
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
