declare module AppTypes {
  type VideoCard = {
    id: string;
    name: string;
    url: string;
    duration: string;
    author: string;
    preview?: string;
    views?: string;
    createdAt: number;
    description: string;
  }
}