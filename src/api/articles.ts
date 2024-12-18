import { Article } from "@/types";
import axios from "./axios";

export const getStoryIds = () => axios.get("/topstories.json");

export const getArticle = (id: number) => axios.get(`/item/${id}.json`);

export const getArticles = async () => {
  const { data: storyIds } = await getStoryIds();
  const articlePromises = storyIds.map((id: number) => getArticle(id));
  const articles = await Promise.all(articlePromises);
  return articles.map((response) => response.data);
};
