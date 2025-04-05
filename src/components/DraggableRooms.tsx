"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import {
	DndContext,
	closestCenter,
	useSensor,
	useSensors,
	PointerSensor,
	TouchSensor,
} from "@dnd-kit/core";
import {
	SortableContext,
	useSortable,
	arrayMove,
	rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableRooms: React.FC<{ rooms: any[] }> = ({ rooms }) => {
	const [draggableRooms, setDraggableRooms] = useState(rooms);

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
			setDraggableRooms((prev) => {
				const oldIndex = prev.findIndex((room) => room.name === active.id);
				const newIndex = prev.findIndex((room) => room.name === over.id);
				return arrayMove(prev, oldIndex, newIndex);
			});
		}
	};

	return (
		<div>
			<h2 className="text-lg font-medium mb-4">房间</h2>
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				<SortableContext
					items={draggableRooms.map((room) => room.name)}
					strategy={rectSortingStrategy}
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{draggableRooms.map((room) => (
							<SortableRoom key={room.name} id={room.name} room={room} />
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
};

const SortableRoom: React.FC<{ id: string; room: any }> = ({ id, room }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className={`relative overflow-hidden rounded-xl ${room.active ? "ring-2 ring-[#B07C5B] ring-offset-2" : ""
				}`}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				width: '100%',
				height: '220px'
			}}
		>
			{/* 图片区域 - 直接占满整个容器 */}
			<div className="absolute inset-0">
				<Image
					src={room.image}
					alt={room.name}
					fill
					className="object-cover"
					style={{ margin: 0 }}
				/>
			</div>

			{/* 底部信息条 - 直接覆盖在图片上 */}
			<div className="absolute bottom-0 left-0 right-0 h-12 bg-[#F6EBE1]/90 backdrop-blur-sm flex items-center px-3">
				<FontAwesomeIcon
					icon={faDoorOpen}
					className="text-xs mr-2 text-[#B07C5B]"
				/>
				<span className="font-medium text-[#B07C5B]">{room.name}</span>
			</div>
		</div>
	);
};

export default DraggableRooms;