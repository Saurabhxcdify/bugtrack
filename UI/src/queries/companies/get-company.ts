import { queryOptions } from "@tanstack/react-query";

type Company = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export const GetCompanyById = (id: string) => {
  return queryOptions({
    queryKey: ["company", id],
    queryFn: async () => {
      const response = await fetch(`/api/company/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch company data');
      }

      const data: Company = await response.json();
      
      return data;
    },
  });
};