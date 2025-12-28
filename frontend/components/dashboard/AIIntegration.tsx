"use client";

import { useState } from "react";
import api from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

export function AIIntegration() {
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const getRecommendations = async () => {
        setLoading(true);
        try {
            const { data } = await api.post("/ai/recommendations");
            // Assuming data.recommendations is the array
            setRecommendations(data.recommendations || []);
        } catch (error) {
            console.error("AI Error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">AI Optimization</h2>
                <Button onClick={getRecommendations} disabled={loading} className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    {loading ? "Analyzing..." : "Get AI Recommendations"}
                </Button>
            </div>

            {recommendations.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recommendations.map((rec, i) => (
                        <Card key={i} className="border-primary/20 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-lg">{rec.title}</CardTitle>
                                <CardDescription>{rec.impact} Impact</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{rec.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
