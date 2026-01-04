import { PARAGRAPH, LINK } from "./elementConstants";

interface PostAuthor {
    id: number;
    name: string;
    avatarUrl: string;
    role: string;
}

interface CommentAuthor {
    name: string;
    avatarUrl: string;
}

export interface Comment {
    id: number;
    postId: number;
    author: CommentAuthor;
    content: string;
    commentedAt: Date;
    likes: number;
}

export interface PostContent {
    type: PARAGRAPH | LINK;
    content: string;
}

export interface Post {
    id: number;
    title: string;
    content: PostContent[];
    publishedAt: Date;
    author: PostAuthor;
}