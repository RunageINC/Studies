import { useState } from "react";
import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./index.module.css";

import { formatDateTime, formatRelativeDateTime } from "../../formatters";

import { Avatar } from "../Avatar";
import { Comment as CommentInterface } from "../../types";

interface CommentProps {
  commentData: CommentInterface;
  deleteComment: (id: number) => void;
}

export function Comment({ commentData, deleteComment }: CommentProps) {
  const { comment, commentBox, commentContent, authorAndTime } = styles;
  const { author, content, commentedAt, likes } = commentData;
  const [likeCount, setLikeCount] = useState(likes);

  const handleDeleteComment = () => {
    deleteComment(commentData.id);
  };

  const handleLikeComment = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <div className={comment}>
      <Avatar hasBorder={false} src={author.avatarUrl} />
      <div className={commentBox}>
        <div className={commentContent}>
          <header>
            <div className={authorAndTime}>
              <strong>{author.name}</strong>
              <time
                title={formatDateTime(commentedAt)}
                dateTime={commentedAt.toISOString()}
              >
                {formatRelativeDateTime(commentedAt)}
              </time>
            </div>

            <button title="Deletar comentário">
              <Trash size={24} onClick={handleDeleteComment} />
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
