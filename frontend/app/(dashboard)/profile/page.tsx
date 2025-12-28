"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>My Account</CardTitle>
                    <CardDescription>Manage your account settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input value={user?.name || ''} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input value={user?.email || ''} disabled />
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto">Change Password</Button>
                </CardContent>
            </Card>
        </div>
    );
}
