"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

function DetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop() || "overview";

  const handleTabChange = (value: string) => {
    router.push(`/projects/${params.id}/details/${value}`);
  };

  return (
    <div>
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full mt-4 bg-white shadow-md rounded-lg "
      >
        <TabsList className=" space-x-1 py-4 bg-gray-100 rounded-t-lg">
          <TabsTrigger value="open-releases" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black focus:outline-none !focus:bg-black !focus:text-white">Open Releases</TabsTrigger>
          <TabsTrigger value="release-details" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black focus:outline-none !focus:bg-black !focus:text-white">Release Details</TabsTrigger>
          <TabsTrigger value="module-list" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black focus:outline-none !focus:bg-black !focus:text-white">Module List</TabsTrigger>
          <TabsTrigger value="create-release-report" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black focus:outline-none !focus:bg-black !focus:text-white">
            Create Release Report   
          </TabsTrigger>
          <TabsTrigger value="backlog-issues" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black focus:outline-none !focus:bg-black !focus:text-white">Backlog Issues</TabsTrigger>
        </TabsList>
        <TabsContent value={currentTab} className="p-4">{children}</TabsContent>
      </Tabs>
    </div>
  );
}

export default DetailsLayout;
