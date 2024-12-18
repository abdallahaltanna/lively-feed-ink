export interface Article {
  id: number;
  by: string;
  descendants: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  likedArticles: Article[];
}
