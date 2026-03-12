import { User } from "@/types/user";
import { Post } from "../types/post";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: User[] = await res.json();
  return data;
}

export const fetchPostsByUser = async (userId: number): Promise<Post[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data: Post[] = await res.json();
  return data;
};