"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, Zap, Lightbulb, Settings, BarChart3, UploadCloud, FileText, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const KaizenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);


export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/value-stream-mapping", label: "Value Stream Mapping", icon: Zap },
    { href: "/pareto-analysis", label: "Pareto Analysis", icon: BarChart3 },
    { href: "/problem-solving", label: "Problem Solving", icon: Lightbulb },
    { href: "/document-analysis", label: "Document Analysis", icon: FileText },
    { href: "/ai-search", label: "AI Search", icon: Search },
  ];

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarHeader className="items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-sidebar-primary">
          <KaizenIcon />
          <span className="group-data-[collapsible=icon]:hidden">KaizenAI</span>
        </Link>
        <div className="group-data-[collapsible=icon]:hidden ml-auto">
           <SidebarTrigger />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
