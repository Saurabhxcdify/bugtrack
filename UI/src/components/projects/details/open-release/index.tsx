"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import NewRelease from "./NewReleas";
import { useParams } from "next/navigation";
import { useQueryStates } from "nuqs";
import { searchParamsParser } from "@/components/table/search-params";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetOpenReleases } from "@/src/queries/projects/details/open-releases/get-open-releases";
import { DataTableInfinite } from "@/components/table/DataTableInfinite";
import { releaseColumns } from "./columns";
import { columnFilterSchema } from "@/components/table/schema";

function OpenReleases() {
  const params = useParams();
  const projectId = params.id as string;
  const [search] = useQueryStates(searchParamsParser);
  const { data, isFetching, isLoading, fetchNextPage } = useInfiniteQuery(
    GetOpenReleases(projectId, search)
  );
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data ?? []) ?? [],
    [data?.pages]
  );

  const lastPage = data?.pages?.[data?.pages.length - 1];
  const totalDBRowCount = lastPage?.totalCount;
  const totalFetched = flatData?.length;

  return (
    <div className="flex flex-col gap-4 m-3">
      <div className="flex justify-between items-center w-full">
        <h2 className='text-2xl font-bold'>Open Releases</h2>
        <NewRelease />
      </div>
      <div>
        <DataTableInfinite
          columns={releaseColumns}
          data={flatData}
          totalRows={totalDBRowCount}
          totalRowsFetched={totalFetched}
          isFetching={isFetching}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          schema={columnFilterSchema}
          columnFilterSchema={columnFilterSchema}
        />
      </div>
    </div>
  );
}

export default OpenReleases;
