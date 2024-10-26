"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CreateNewUser from "./CreateNewUser";
import UserDetailsSheet from "./UserDetailsSheet";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { searchParamsParser } from "../table/search-params";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetUsers } from "@/src/queries/users/get-users";
import { DataTableInfinite } from "../table/DataTableInfinite";
import { userColumns } from "./columns";
import { columnFilterSchema } from "../table/schema";

function Users({ userId }: { userId: string | undefined }) {
  const [search] = useQueryStates(searchParamsParser);
  const { data, isFetching, isLoading, fetchNextPage } = useInfiniteQuery(
    GetUsers(search)
  );
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data ?? []) ?? [],
    [data?.pages]
  );

  const lastPage = data?.pages?.[data?.pages.length - 1];
  const totalDBRowCount = lastPage?.totalCount;
  const totalFetched = flatData?.length;
  const [openCreateNewUser, setOpenCreateNewUser] = useState(false);
  const [openUserDetails, setOpenUserDetails] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (userId) {
      setOpenUserDetails(true);
      router.replace(`/users?id=${userId}`);
    }
  }, [userId]);

  function handleCloseUserDetails() {
    setOpenUserDetails(false);
    if (userId) {
      router.replace(`/users`);
    }
  }

  function handleOpenUserDetails() {
    setOpenUserDetails(true);
    router.replace(`/users?id=${userId}`);
  }

  function onRowClick(row: any) {
    router.replace(`/users?id=${row.id}`);
    setOpenUserDetails(true);
  }

  return (
    <>
      <div className="flex flex-col gap-4 m-3">
        <div className="flex justify-between items-center w-full">
          <h2 className='text-2xl font-bold'>Users</h2>
          <Button onClick={() => setOpenCreateNewUser(true)}>
            Create New User
          </Button>
        </div>
        <div>
          <DataTableInfinite
            columns={userColumns}
            data={flatData}
            totalRows={totalDBRowCount}
            totalRowsFetched={totalFetched}
            isFetching={isFetching}
            isLoading={isLoading}
            fetchNextPage={fetchNextPage}
            schema={columnFilterSchema}
            columnFilterSchema={columnFilterSchema}
            onRowClick={onRowClick}
          />
        </div>
      </div>
      <CreateNewUser
        open={openCreateNewUser}
        onOpenChange={(open: boolean) => setOpenCreateNewUser(open)}
      />
      <UserDetailsSheet
        open={openUserDetails}
        onOpenChange={handleCloseUserDetails}
        userId={userId ?? ""}
      />
    </>
  );
}

export default Users;