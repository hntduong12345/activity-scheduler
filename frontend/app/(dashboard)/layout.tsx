"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { LayoutDashboard, Calendar, Settings, User, LogOut } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Schedule", href: "/schedule", icon: Calendar },
        { name: "Settings", href: "/settings", icon: Settings },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-background md:flex">
                <div className="flex h-14 items-center border-b px-6">
                    <Link className="flex items-center gap-2 font-bold" href="/">
                        ActivityPlanner
                    </Link>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                    <nav className="grid gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                            >
                                <Button
                                    variant={pathname === item.href ? "secondary" : "ghost"}
                                    className="w-full justify-start gap-2"
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="border-t p-4">
                    <div className="flex items-center gap-4 px-2 py-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{user?.name}</span>
                            <span className="text-xs text-muted-foreground">{user?.email}</span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={logout}>
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-background px-6 lg:hidden">
                    <Link className="font-bold" href="/">ActivityPlanner</Link>
                    {/* Mobile Nav would go here */}
                </header>
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
