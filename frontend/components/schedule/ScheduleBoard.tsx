"use client";

import { useState } from "react";
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, addDays, startOfWeek } from "date-fns";

// A simple Sortable Item component
function SortableItem(props: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-2">
            {props.children}
        </div>
    );
}

interface ScheduleBoardProps {
    activities: any[];
    onUpdateActivity: (id: string, newDate: Date) => void;
}

export function ScheduleBoard({ activities, onUpdateActivity }: ScheduleBoardProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            // Logic to update date based on column dropped
            const activityId = active.id;
            const columnId = over.id; // columnId is likely the date string
            if (columnId) {
                onUpdateActivity(activityId, new Date(columnId));
            }
        }
        setActiveId(null);
    };

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    }

    // Generate 7 days columns starting from today or start of week
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const columns = Array.from({ length: 7 }).map((_, i) => {
        const date = addDays(startDate, i);
        const dayName = format(date, 'EEE');
        const dateStr = format(date, 'yyyy-MM-dd');
        const dayActivities = activities.filter(a => format(new Date(a.startTime), 'yyyy-MM-dd') === dateStr);

        return {
            id: dateStr,
            title: `${dayName} ${format(date, 'd')}`,
            activities: dayActivities
        };
    });

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 h-full overflow-x-auto min-w-[1000px]">
                {columns.map((col) => (
                    <div key={col.id} className="flex flex-col bg-muted/20 rounded-lg p-2 min-h-[500px]">
                        <h3 className="font-semibold text-center mb-4">{col.title}</h3>
                        {/* Use SortableContext even if not strictly sorting for now, or use Droppable */}
                        {/* For simplicity using Droppable areas for columns and Draggable items */}
                        {/* Actually dnd-kit uses Droppable but Sortable is easier for lists */}
                        <SortableContext items={col.activities.map(a => a._id)} strategy={verticalListSortingStrategy}>
                            <div className="flex-1 space-y-2">
                                {col.activities.length === 0 && <div className="h-20 border-dashed border-2 rounded-md flex items-center justify-center text-xs text-muted-foreground">Empty</div>}
                                {col.activities.map((activity: any) => (
                                    <SortableItem key={activity._id} id={activity._id}>
                                        <Card className="cursor-grab hover:shadow-md">
                                            <CardContent className="p-3">
                                                <div className="text-sm font-medium">{activity.title}</div>
                                                <div className="text-xs text-muted-foreground">{format(new Date(activity.startTime), 'HH:mm')} - {format(new Date(activity.endTime), 'HH:mm')}</div>
                                                <div className="mt-1 text-xs px-1 py-0.5 bg-primary/10 rounded inline-block">{activity.category}</div>
                                            </CardContent>
                                        </Card>
                                    </SortableItem>
                                ))}
                            </div>
                        </SortableContext>
                        {/* Ensure the column itself is droppable if empty */}
                        {/* Requires Droppable wrapper if using pure dnd-kit, or SortableContext covers it usually if we handle it right */}
                        {/* I will assume SortableItem handles drag, but dropping into empty column needs the column to be a Droppable container */}
                    </div>
                ))}
            </div>
            <DragOverlay>
                {activeId ? (
                    <Card className="w-full opacity-80 rotate-3 cursor-grabbing">
                        <CardContent className="p-3">
                            <div className="text-sm font-medium">Moving...</div>
                        </CardContent>
                    </Card>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
