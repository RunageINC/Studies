/* eslint-disable react/prop-types */
import { useState } from "react";
import { PARAGRAPH, LINK } from "../elementConstants";
import { formatDateTime, formatRelativeDateTime } from "../formatters";

import {
  post,
  author,
  authorInfo,
  content,
  commentForm,
  commentList,
} from "./Post.module.css";

import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

export function Post({ postContent, comments = [] }) {
  const [postComments, setPostComments] = useState(comments);
  const [newCommentText, setNewCommentText] = useState("");

  const disableSubmitButton = newCommentText.length === 0;

  const {
    title,
    content: postBodyContent,
    publishedAt,
    author: contentAuthor,
  } = postContent;

  const handleInvalidComment = (event) => {
    event.target.setCustomValidity("Comentário é obrigatório");
  };

  const handleCreateNewComment = (event) => {
    event.preventDefault();

    const commentBody = {
      id: comments.length + 1,
      content: newCommentText,
      commentedAt: new Date(),
      likes: 0,
      postId: postContent.id,
      author: contentAuthor,
    };

    setPostComments((prev) => [...prev, commentBody]);
    setNewCommentText("");
  };

  const handleNewCommentChange = (event) => {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  };

  const deleteComment = (commentId) => {
    const listWithRemovedComment = postComments.filter(
      (comment) => comment.id !== commentId
    );

    setPostComments(listWithRemovedComment);
  };

  return (
    <article className={post}>
      <header>
        <div className={author}>
          <Avatar hasBorder imgUrl={contentAuthor.avatarUrl} />
          <div className={authorInfo}>
            <strong>{contentAuthor.name}</strong>
            <span>{contentAuthor.role}</span>
          </div>
        </div>
        <time
          title={formatDateTime(publishedAt)}
          dateTime={publishedAt.toISOString()}
        >
          {formatRelativeDateTime(publishedAt)}
        </time>
      </header>

      <div className={content}>
        {postBodyContent.map((line, index) => {
          switch (line.type) {
            case LINK:
              return (
                <p key={index + line.type}>
                  <a href="#">{line.content}</a>
                </p>
              );
            case PARAGRAPH:
              return <p key={index + line.type}>{line.content}</p>;
            default:
              return <p>{line.content}</p>;
          }
        })}
      </div>

      <form className={commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário..."
          name="comment"
          value={newCommentText}
          required
          onInvalid={handleInvalidComment}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button disabled={disableSubmitButton} type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <div className={commentList}>
        {postComments.map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
