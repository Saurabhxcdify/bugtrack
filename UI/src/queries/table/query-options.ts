import type { MakeArray } from "@/src/types";
import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";
import { searchParamsSerializer, SearchParamsType } from "@/src/components/table/search-params";

// Mock API response expected structure
type ApiResponse = {
  data: any[]; // Your actual data structure
  start: number; // Start index for pagination
  end: number; // End index for pagination
  totalCount: number; // Total count of items
};

export const dataOptions = (search: SearchParamsType) => {
  return infiniteQueryOptions({
    queryKey:  ["data-table", searchParamsSerializer({ ...search, orderId: null })], // Include search params in the key to refetch on filter change
    queryFn: async ({ pageParam = 1 }) => {
      const pageSize = 50; // You can adjust the page size if needed
      // const start = (pageParam as number) * search.size;
      const serialize = searchParamsSerializer({ ...search });
      const response = await fetch(`/api/mock?page=${pageParam}&pageSize=${pageSize}${serialize}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: ApiResponse = await response.json();
      
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // Check if there is more data to fetch
      if (lastPage.end < lastPage.totalCount) {
        return pages.length + 1; // Move to the next page
      } else {
        return undefined; // No more pages to fetch
      }
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
