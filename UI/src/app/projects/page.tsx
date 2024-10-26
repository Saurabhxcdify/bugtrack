import { AppSidebar } from '@/src/components/app-sidebar'
import Projects from '@/src/components/projects'
import { SidebarLayout, SidebarTrigger } from '@/src/components/ui/sidebar'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
}

async function Page({
  searchParams,
}  : {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
    const { cookies } = await import("next/headers")
    const projectId = searchParams.id as string | undefined
    return (
        <SidebarLayout
            defaultOpen={cookies().get("sidebar:state")?.value === "true"}
        >
            <AppSidebar />
            <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
                <div className="h-full rounded-md border-2 border-dashed p-2">
                    <SidebarTrigger />

                    <Projects projectId={projectId}/>
                </div>
            </main>
        </SidebarLayout>
    )
}

export default Page
