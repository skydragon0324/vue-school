export interface Post {
  id: string;
  image: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: number;
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export type PostWithUser = Post & { user: User };
