import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "../types";
import { Heart, MessageSquare, Share2 } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div
      className={`article-card ${
        isExpanded ? "article-card-expanded" : "article-card-collapsed"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={handleClick}
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              <strong>Author: </strong>
              {article.by}
            </span>
          </div>
        </div>
        <p>
          <strong>Score: </strong>
          {article.score}
        </p>
      </div>
    </div>
  );
};
