"use client";

import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 flex">
                    <Link className="mr-6 flex items-center space-x-2" href="/">
                        <span className="font-bold sm:inline-block">ActivityPlanner Pro</span>
                    </Link>
                </div>
                <div className="flex flex-1 item-center justify-end space-x-2">
                    {!user ? (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">Dashboard</Button>
                            </Link>
                            <Button onClick={logout} variant="outline" size="sm">Logout</Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
