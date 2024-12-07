import { toast } from "@/hooks/use-toast";

const API_BASE = "/api";

export async function fetchMoodboards() {
  const response = await fetch(`${API_BASE}/moodboards`);
  if (!response.ok) throw new Error("Failed to fetch moodboards");
  return response.json();
}

export async function fetchMoodboard(id: number) {
  const response = await fetch(`${API_BASE}/moodboards/${id}`);
  if (!response.ok) throw new Error("Failed to fetch moodboard");
  return response.json();
}

export async function createMoodboard(data: any) {
  const response = await fetch(`${API_BASE}/moodboards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) throw new Error("Failed to create moodboard");
  return response.json();
}

export async function updateMoodboard(id: number, data: any) {
  const response = await fetch(`${API_BASE}/moodboards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) throw new Error("Failed to update moodboard");
  return response.json();
}

export async function searchImages(query: string) {
  const response = await fetch(`${API_BASE}/search-images?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Failed to search images");
  return response.json();
}
