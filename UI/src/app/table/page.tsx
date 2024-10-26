import React from 'react'
import Table from '@/src/components/table'
import { searchParamsCache } from '@/src/components/table/search-params';
import { getQueryClient } from '@/src/providers/get-query-client';
import { dataOptions } from '@/src/queries/table/query-options';
import { SidebarLayout, SidebarTrigger } from '@/src/components/ui/sidebar';
import { AppSidebar } from '@/src/components/app-sidebar';
async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const search = searchParamsCache.parse(searchParams);
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(dataOptions(search));
  const { cookies } = await import("next/headers")
  return (
    <SidebarLayout
      defaultOpen={cookies().get("sidebar:state")?.value === "true"}
    >
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md border-2 border-dashed p-2">
        <SidebarTrigger />
          <Table />
        </div>
      </main>
    </SidebarLayout>
  )
}



export default Page
