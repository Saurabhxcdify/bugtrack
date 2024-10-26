import { AppSidebar } from '@/src/components/app-sidebar'
import Users from '@/src/components/users'
import { SidebarLayout, SidebarTrigger } from '@/src/components/ui/sidebar'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users',
}

async function Page({
  searchParams,
}  : {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
    const { cookies } = await import("next/headers")
    const userId = searchParams.id as string | undefined
    return ( 
        <SidebarLayout
            defaultOpen={cookies().get("sidebar:state")?.value === "true"}
        >
            <AppSidebar />
            <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
                <div className="h-full rounded-md border-2 border-dashed p-2">
                    <SidebarTrigger />

                    <Users userId={userId}/>
                </div>
            </main>
        </SidebarLayout>
    )
}

export default Page
