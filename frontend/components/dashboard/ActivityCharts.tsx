"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface ChartsProps {
    stats: any;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function ActivityCharts({ stats }: ChartsProps) {
    const categoryData = stats?.categoryBreakdown
        ? Object.keys(stats.categoryBreakdown).map((key, index) => ({
            name: key,
            value: stats.categoryBreakdown[key]
        }))
        : [];

    // Dummy data for weekly progress if not provided by backend yet
    const weeklyData = [
        { name: 'Mon', completed: 4, total: 6 },
        { name: 'Tue', completed: 3, total: 5 },
        { name: 'Wed', completed: 5, total: 8 },
        { name: 'Thu', completed: 2, total: 4 },
        { name: 'Fri', completed: 4, total: 7 },
        { name: 'Sat', completed: 1, total: 3 },
        { name: 'Sun', completed: 2, total: 2 },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={weeklyData}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Legend />
                            <Bar dataKey="total" name="Planned" fill="#adfa1d" radius={[4, 4, 0, 0]} className="fill-primary" />
                            <Bar dataKey="completed" name="Completed" fill="#82ca9d" radius={[4, 4, 0, 0]} className="fill-muted-foreground opacity-50" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
