"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import DeviceSwitch from "./DeviceSwitch";
import {
	DndContext,
	closestCenter,
	useSensor,
	useSensors,
	PointerSensor,
	TouchSensor,
} from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableQuickControls: React.FC<{
	devices: any[];
	onDeviceStatusChange: (deviceName: string, newStatus: boolean) => void;
}> = ({ devices, onDeviceStatusChange }) => {
	const [draggableDevices, setDraggableDevices] = useState(devices);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { delay: 300, tolerance: 5 },
		}),
		useSensor(TouchSensor, {
			activationConstraint: { delay: 300, tolerance: 5 },
		})
	);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			setDraggableDevices((prev) => {
				const oldIndex = prev.findIndex((device) => device.name === active.id);
				const newIndex = prev.findIndex((device) => device.name === over.id);
				return arrayMove(prev, oldIndex, newIndex);
			});
		}
	};

	return (
		<div>
			<h2 className="text-lg font-medium mb-4">快捷控制</h2>
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
				<SortableContext
					items={draggableDevices.map((device) => device.name)}
					strategy={rectSortingStrategy}
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{draggableDevices.map((device) => (
							<SortableDevice
								key={device.name}
								id={device.name}
								device={device}
								onStatusChange={(newStatus) =>
									onDeviceStatusChange(device.name, newStatus)
								}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
};

const SortableDevice: React.FC<{
	id: string;
	device: any;
	onStatusChange: (newStatus: boolean) => void;
}> = ({ id, device, onStatusChange }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
	const longPressRef = useRef<NodeJS.Timeout | null>(null);
	const isLongPress = useRef(false);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		longPressRef.current = setTimeout(() => {
			isLongPress.current = true;
			if (listeners && listeners.onMouseDown) {
				listeners.onMouseDown(e);
			}
		}, 300);
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
		if (longPressRef.current) {
			clearTimeout(longPressRef.current);
			longPressRef.current = null;
		}
		if (!isLongPress.current) {
			onStatusChange(!device.status);
		}
		isLongPress.current = false;
	};

	useEffect(() => {
		return () => {
			if (longPressRef.current) {
				clearTimeout(longPressRef.current);
			}
		};
	}, []);

	return (
		<Card
			ref={setNodeRef}
			{...attributes}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			{...listeners}
			className="p-4 bg-white hover:shadow-md transition-shadow"
			style={{ transform: CSS.Transform.toString(transform), transition }}
		>
			<DeviceSwitch device={device} onStatusChange={onStatusChange} />
		</Card>
	);
};

export default DraggableQuickControls;
