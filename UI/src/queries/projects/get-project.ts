import { queryOptions } from "@tanstack/react-query";

type Project = {
  id: string;
  name: string;
  key_name: string;
  created_at: string;
  updated_at: string;
};

export const GetProjectById = (id: string) => {
  return queryOptions({
    queryKey: ["project", id],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch project data');
      }

      const data: Project = await response.json();
      
      return data;
    },
  });
};