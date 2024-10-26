'use client'
import React from 'react'
import { DataTableInfinite } from './DataTableInfinite'
import { columns } from './column'
import { useInfiniteQuery } from '@tanstack/react-query';
import { dataOptions } from '@/src/queries/table/query-options';
import { useQueryStates } from 'nuqs';
import { searchParamsParser } from './search-params';
import { ColumnSchema, columnFilterSchema } from "./schema";

function Table() {
  const [search] = useQueryStates(searchParamsParser);
  const { data, isFetching, isLoading, fetchNextPage } = useInfiniteQuery(dataOptions(search));
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data ?? []) ?? [],
    [data?.pages]
  );

  const lastPage = data?.pages?.[data?.pages.length - 1];
  const totalDBRowCount = lastPage?.totalCount;
  const totalFetched = flatData?.length;

  return (
    <div>
      <DataTableInfinite
          columns={columns}
          data={flatData}
          totalRows={totalDBRowCount}
          totalRowsFetched={totalFetched}
          isFetching={isFetching}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          schema={ColumnSchema}
          columnFilterSchema={columnFilterSchema}
        /> 
    </div>
  )
}

export default Table
