import { queryOptions } from "@tanstack/react-query";

type OpenRelease = {
  id: number;
  name: string;
  description: string;
  appVersion: string;
  startDate: string;
  endDate: string;
  status: 'Open' | 'In Progress';
};

export const GetOpenReleaseById = (projectId: string, releaseId: string) => {
  return queryOptions({
    queryKey: ["openRelease", projectId, releaseId],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${projectId}/details/open-releases/${releaseId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch open release data');
      }

      const data: OpenRelease = await response.json();
      
      return data;
    },
  });
};
