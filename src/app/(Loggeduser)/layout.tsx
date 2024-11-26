import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LoggedUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
