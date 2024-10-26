
import React from "react";
import { SidebarLayout, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/app-sidebar";
import DetailsLayout from "@/src/components/projects/details/layout";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {


  return (
    <SidebarLayout defaultOpen={true}>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md border-2 border-dashed p-2">
          <SidebarTrigger />
          <DetailsLayout params={params}>{children}</DetailsLayout>
        </div>
      </main>
    </SidebarLayout>
  );
}

export default Layout;
