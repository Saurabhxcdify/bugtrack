import type { MakeArray } from "@/src/types";
import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";
import { searchParamsSerializer, SearchParamsType } from "@/src/components/table/search-params";

// API response structure for open releases
type OpenRelease = {
  id: number;
  name: string;
  description: string;
  appVersion: string;
  startDate: string;
  endDate: string;
  status: 'Open' | 'In Progress';
};

type ApiResponse = {
  data: OpenRelease[];
  start: number;
  end: number;
  totalCount: number;
};

export const GetOpenReleases = (projectId: string, search: SearchParamsType) => {
  return infiniteQueryOptions({
    queryKey: ["openReleases", projectId, searchParamsSerializer({ ...search, orderId: null })],
    queryFn: async ({ pageParam = 1 }) => {
      const pageSize = 50;
      
      // Create URLSearchParams instance for proper parameter handling
      const params = new URLSearchParams({
        page: pageParam.toString(),
        pageSize: pageSize.toString()
      });

      // Add search parameters if they exist
      if (search) {
        const searchParams = searchParamsSerializer({ ...search });
        // Remove the leading '?' if it exists
        const searchString = searchParams.startsWith('?') ? searchParams.slice(1) : searchParams;
        
        // Add each search parameter
        const searchPairs = searchString.split('&');
        searchPairs.forEach(pair => {
          if (pair) {
            const [key, value] = pair.split('=');
            if (key && value) {
              params.append(key, value);
            }
          }
        });
      }

      // Construct the URL with properly encoded parameters
      const url = `/api/projects/${projectId}/details/open-releases?${params.toString()}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch open releases');
      }

      const data: ApiResponse = await response.json();
      
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.end < lastPage.totalCount) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};