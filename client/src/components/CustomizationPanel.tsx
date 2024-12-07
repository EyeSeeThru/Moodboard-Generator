import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomizationPanelProps {
  layout: string;
  spacing: number;
  filter: string;
  onLayoutChange: (value: string) => void;
  onSpacingChange: (value: number) => void;
  onFilterChange: (value: string) => void;
}

export function CustomizationPanel({
  layout,
  spacing,
  filter,
  onLayoutChange,
  onSpacingChange,
  onFilterChange,
}: CustomizationPanelProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Customization</h3>
        <p className="text-sm text-muted-foreground">
          Adjust your moodboard's appearance
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Layout</Label>
          <RadioGroup
            value={layout}
            onValueChange={onLayoutChange}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="grid" id="grid" />
              <Label htmlFor="grid">Grid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="masonry" id="masonry" />
              <Label htmlFor="masonry">Masonry</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Spacing</Label>
          <Slider
            value={[spacing]}
            onValueChange={(value) => onSpacingChange(value[0])}
            min={0}
            max={8}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Label>Filter</Label>
          <Select value={filter} onValueChange={onFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="grayscale">Grayscale</SelectItem>
              <SelectItem value="sepia">Sepia</SelectItem>
              <SelectItem value="blur">Blur</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
