"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api-client";
import { StatCards } from "@/components/dashboard/StatCards";
import { ActivityCharts } from "@/components/dashboard/ActivityCharts";
import { AIIntegration } from "@/components/dashboard/AIIntegration";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get("/stats");
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <StatCards stats={stats} loading={loading} />
            <ActivityCharts stats={stats} />
            <AIIntegration />
        </div>
    );
}
