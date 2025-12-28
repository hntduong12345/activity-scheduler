"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { ScheduleBoard } from "@/components/schedule/ScheduleBoard";
import { ActivityDialog } from "@/components/schedule/ActivityDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SchedulePage() {
    const [activities, setActivities] = useState<any[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchActivities = async () => {
        try {
            const { data } = await api.get("/activities");
            setActivities(data);
        } catch (error) {
            console.error("Failed to fetch activities", error);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleCreateActivity = async (data: any) => {
        await api.post("/activities", data);
        fetchActivities();
    };

    const handleUpdateActivityDate = async (id: string, newDate: Date) => {
        // Find the activity to keep time but change date
        const activity = activities.find(a => a._id === id);
        if (!activity) return;

        const oldStart = new Date(activity.startTime);
        const oldEnd = new Date(activity.endTime);

        const newStart = new Date(newDate);
        newStart.setHours(oldStart.getHours(), oldStart.getMinutes());

        const newEnd = new Date(newDate);
        newEnd.setHours(oldEnd.getHours(), oldEnd.getMinutes());

        // Update local state optimistic
        setActivities(prev => prev.map(a => a._id === id ? { ...a, startTime: newStart.toISOString(), endTime: newEnd.toISOString() } : a));

        try {
            await api.put(`/activities/${id}`, { startTime: newStart, endTime: newEnd });
        } catch (error) {
            console.error("Failed to update activity", error);
            fetchActivities(); // Revert
        }
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Weekly Schedule</h2>
                <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Activity
                </Button>
            </div>

            <div className="flex-1 overflow-hidden">
                <ScheduleBoard activities={activities} onUpdateActivity={handleUpdateActivityDate} />
            </div>

            <ActivityDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleCreateActivity} />
        </div>
    );
}
