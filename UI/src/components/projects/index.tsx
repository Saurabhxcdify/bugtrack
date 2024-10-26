"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CreateNewProject from "./CreateNewProject";
import ProjectDetailsSheet from "./ProjectDetailsSheet";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { searchParamsParser } from "../table/search-params";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetProjects } from "@/src/queries/projects/get-projects";
import { DataTableInfinite } from "../table/DataTableInfinite";
import { projectColumns } from "./columns";
import { columnFilterSchema } from "../table/schema";

function Projects({ projectId }: { projectId: string | undefined }) {
  const [search] = useQueryStates(searchParamsParser);
  const { data, isFetching, isLoading, fetchNextPage } = useInfiniteQuery(
    GetProjects(search)
  );
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data ?? []) ?? [],
    [data?.pages]
  );

  const lastPage = data?.pages?.[data?.pages.length - 1];
  const totalDBRowCount = lastPage?.totalCount;
  const totalFetched = flatData?.length;
  const [openCreateNewProject, setOpenCreateNewProject] = useState(false);
  const [openProjectDetails, setOpenProjectDetails] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (projectId) {
      setOpenProjectDetails(true);
      router.replace(`/projects?id=${projectId}`);
    }
  }, [projectId]);

  function handleCloseProjectDetails() {
    setOpenProjectDetails(false);
    if (projectId) {
      router.replace(`/projects`);
    }
  }

  function handleOpenProjectDetails() {
    setOpenProjectDetails(true);
    router.replace(`/projects?id=${projectId}`);
  }

  function onRowClick(row: any) {
    router.replace(`/projects?id=${row.id}`);
    setOpenProjectDetails(true);
  }

  return (
    <>
      <div className="flex flex-col gap-4 m-3">
        <div className="flex justify-between items-center w-full">
          <h2 className='text-2xl font-bold'>Projects</h2>
          <Button onClick={() => setOpenCreateNewProject(true)}>
            Create New Project
          </Button>
        </div>
        <div>
          <DataTableInfinite
            columns={projectColumns}
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
      <CreateNewProject
        open={openCreateNewProject}
        onOpenChange={(open: boolean) => setOpenCreateNewProject(open)}
      />
      <ProjectDetailsSheet
        open={openProjectDetails}
        onOpenChange={handleCloseProjectDetails}
        projectId={projectId ?? ""}
      />
    </>
  );
}

export default Projects;
