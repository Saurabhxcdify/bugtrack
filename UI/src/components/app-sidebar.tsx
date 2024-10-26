"use client";

import {
  Atom,
  Bird,
  BookOpen,
  Bot,
  Bug,
  Code2,
  Database,
  Eclipse,
  Frame,
  History,
  LifeBuoy,
  Map,
  PieChart,
  Rabbit,
  Send,
  Settings2,
  SquareTerminal,
  Star,
  Turtle,
} from "lucide-react";

import { NavMain } from "@/src/components/nav-main";
import { NavProjects } from "@/src/components/nav-projects";
import { NavSecondary } from "@/src/components/nav-secondary";
import { NavUser } from "@/src/components/nav-user";
import { StorageCard } from "@/src/components/storage-card";
import { TeamSwitcher } from "@/src/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/src/components/ui/sidebar";
const data = {
  teams: [
    {
      name: "Xcdify",
      logo: Atom,
      plan: "Enterprise",
    },
    {
      name: "CenZen",
      logo: Eclipse,
      plan: "Startup",
    },
    {
      name: "Ascent factory",
      logo: Rabbit,
      plan: "Free",
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Bug Tracker",
      url: "#",
      icon: Bug,
      isActive: true,
      items: [
        {
          title: "Master Data",
          url: "#",
          icon: Database,
          isActive: true,
          description: "View your recent prompts",
          items: [
            {
              title: "Companies",
              url: "/companies",
              icon: Star,
              description: "Browse your starred prompts",
            },
            {
              title: "Projects",
              url: "/projects",
              icon: Settings2,
              description: "Configure your playground",
            },
            {
              title: "Users",
              url: "/users",
              icon: Settings2,
              description: "Configure your playground",
            },
           
          ],
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],

  searchResults: [
    {
      title: "Routing Fundamentals",
      teaser:
        "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
      url: "#",
    },
    {
      title: "Layouts and Templates",
      teaser:
        "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
      url: "#",
    },
    {
      title: "Data Fetching, Caching, and Revalidating",
      teaser:
        "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
      url: "#",
    },
    {
      title: "Server and Client Composition Patterns",
      teaser:
        "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
      url: "#",
    },
    {
      title: "Server Actions and Mutations",
      teaser:
        "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
      url: "#",
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Platform</SidebarLabel>
          <NavMain items={data.navMain} searchResults={data.searchResults} />
        </SidebarItem>
        {/* <SidebarItem>
          <SidebarLabel>Projects</SidebarLabel>
          <NavProjects projects={data.projects} />
        </SidebarItem> */}
        <SidebarItem className="mt-auto">
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
