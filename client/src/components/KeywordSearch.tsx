import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface KeywordSearchProps {
  onSearch: (keyword: string) => void;
}

export function KeywordSearch({ onSearch }: KeywordSearchProps) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter keywords..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="min-w-[200px]"
      />
      <Button type="submit" className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        Search
      </Button>
    </form>
  );
}
