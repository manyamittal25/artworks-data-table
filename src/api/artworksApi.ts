import type { ArtworksApiResponse } from '../types/artwork';

export async function fetchArtworksPage(pageNumber: number): Promise<ArtworksApiResponse> {
  const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch artworks: ${response.statusText}`);
  }
  
  return response.json();
}
