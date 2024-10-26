import { queryOptions } from "@tanstack/react-query";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export const GetUserById = (id: string) => {
  return queryOptions({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data: User = await response.json();
      
      return data;
    },
  });
};