"use client";
import React, { useRef } from "react";
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

interface Device {
	name: string;
	icon: any;
	status: boolean;
}

interface DraggableDevicesProps {
	devices: Device[];
	onDeviceStatusChange: (deviceName: string, newStatus: boolean) => void;
	onDevicesOrderChange: (newDevices: Device[]) => void; // 新增的回调
}

const DraggableDevices: React.FC<DraggableDevicesProps> = ({ devices, onDeviceStatusChange, onDevicesOrderChange }) => {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				delay: 300, // 长按300ms触发拖拽
				tolerance: 5,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 300, // 长按300ms触发拖拽
				tolerance: 5,
			},
		})
	);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			const oldIndex = devices.findIndex((device) => device.name === active.id);
			const newIndex = devices.findIndex((device) => device.name === over.id);
			const newDevices = arrayMove(devices, oldIndex, newIndex);
			onDevicesOrderChange(newDevices); // 调用回调更新顺序
		}
	};

	return (
		<div>
			<h2 className="text-lg font-medium mb-4">快捷控制</h2>
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
				<SortableContext
					items={devices.map((device) => device.name)}
					strategy={rectSortingStrategy}
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{devices.map((device) => (
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

interface SortableDeviceProps {
	id: string;
	device: Device;
	onStatusChange: (newStatus: boolean) => void;
}

const SortableDevice: React.FC<SortableDeviceProps> = ({ id, device, onStatusChange }) => {
	const switchRef = useRef<HTMLDivElement>(null);
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id });

	// 检查点击是否发生在开关区域
	const isClickOnSwitch = (e: React.MouseEvent) => {
		if (!switchRef.current) return false;
		return switchRef.current.contains(e.target as Node);
	};

	return (
		<Card
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				cursor: 'grab', // 显示可拖拽的手型光标
			}}
			{...attributes}
			className="p-4 bg-white hover:shadow-md transition-shadow relative"
			{...listeners}
			onClick={(e) => {
				// 如果点击的是开关区域，阻止拖拽
				if (isClickOnSwitch(e)) {
					e.stopPropagation();
				}
			}}
		>
			<div ref={switchRef}>
				<DeviceSwitch device={device} onStatusChange={onStatusChange} />
			</div>
		</Card>
	);
};

export default DraggableDevices;