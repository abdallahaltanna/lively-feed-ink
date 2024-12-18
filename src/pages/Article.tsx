import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getArticle } from "@/api/articles";
import { Skeleton } from "@/components/ui/skeleton";
import { Article as IArticle } from "@/types";

export const Article = () => {
  const { id } = useParams<{ id: string }>();
  const navigate: NavigateFunction = useNavigate();
  const {
    error,
    isLoading,
    isFetching,
    data: article,
  } = useQuery<IArticle, Error>({
    queryKey: ["article", id],
    queryFn: async (): Promise<IArticle> => {
      try {
        const response = await getArticle(parseInt(id));
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch article");
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Stories
      </Button>

      {isLoading || isFetching ? (
        <Skeleton className="h-48" />
      ) : error ? (
        <h1>{error?.message}</h1>
      ) : (
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{article?.title}</h1>
          <p className="text-gray-700">
            <strong>Auhtor: </strong>
            {article?.by}
          </p>
          <p className="text-gray-700">
            <strong>Score: </strong>
            {article?.score}
          </p>
        </div>
      )}
    </div>
  );
};
