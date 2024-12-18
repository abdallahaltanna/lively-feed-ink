import { ArticleCard } from "../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../api/articles";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Article } from "@/types";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;

  const {
    error,
    isLoading,
    isFetching,
    data: articles,
  } = useQuery<Article[], Error>({
    queryKey: ["articles"],
    queryFn: async () => await getArticles(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentArticles: Article[] = articles?.slice(startIndex, endIndex);
  const numberOfPages: number = Math.ceil(articles?.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage === numberOfPages) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderPaginationItems = () => {
    const items: React.ReactNode[] = [];
    const maxVisiblePages: number = 6;

    if (numberOfPages <= maxVisiblePages) {
      for (let page = 1; page <= numberOfPages; page++) {
        items.push(
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      if (currentPage > 3) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
          </PaginationItem>
        );
        items.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      const startPage: number = Math.max(2, currentPage - 1);
      const endPage: number = Math.min(numberOfPages - 1, currentPage + 1);

      for (let page = startPage; page <= endPage; page++) {
        items.push(
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < numberOfPages - 2) {
        items.push(<PaginationEllipsis key="end-ellipsis" />);
        items.push(
          <PaginationItem key={numberOfPages}>
            <PaginationLink onClick={() => setCurrentPage(numberOfPages)}>
              {numberOfPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Top Stories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading || isFetching ? (
            [...Array(10)].map((_, i) => <Skeleton key={i} className="h-48" />)
          ) : error ? (
            <h1>Something went wrong</h1>
          ) : (
            <>
              {currentArticles?.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
              <div className="col-span-full flex justify-center">
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationPrevious
                      onClick={handlePreviousPage}
                      className={currentPage === 1 ? "disabled-class" : ""}
                    />
                    {renderPaginationItems()}
                    <PaginationNext
                      onClick={handleNextPage}
                      className={
                        currentPage === numberOfPages ? "disabled-class" : ""
                      }
                    />
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
