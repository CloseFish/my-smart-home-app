"use client";
import React, { useState } from "react";
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

const DraggableRooms = ({ rooms: initialRooms }: { rooms: any[] }) => {
	const [rooms, setRooms] = useState(initialRooms);
	const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor)
	);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			setRooms((prev) => {
				const oldIndex = prev.findIndex((room) => room.name === active.id);
				const newIndex = prev.findIndex((room) => room.name === over.id);
				return arrayMove(prev, oldIndex, newIndex);
			});
		}
	};

	return (
		<div className="mb-8">
			<h2 className="text-lg font-medium mb-4">房间</h2>
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				<SortableContext items={rooms.map((room) => room.name)} strategy={rectSortingStrategy}>
					<div className="grid grid-cols-2 gap-4">
						{rooms.map((room) => (
							<SortableRoom
								key={room.name}
								id={room.name}
								room={room}
								isHovered={hoveredRoom === room.name}
								onHoverChange={(hover) =>
									hover ? setHoveredRoom(room.name) : setHoveredRoom(null)
								}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
};

const SortableRoom = ({
	id,
	room,
	isHovered,
	onHoverChange,
}: {
	id: string;
	room: any;
	isHovered: boolean;
	onHoverChange: (hover: boolean) => void;
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className="relative rounded-xl overflow-hidden border-2 border-transparent transition-all duration-300"
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				height: "220px",
				borderColor: isHovered ? "#B07C5B" : "transparent"
			}}
			onMouseEnter={() => onHoverChange(true)}
			onMouseLeave={() => onHoverChange(false)}
		>
			{/* 固定外框作为蒙版 */}
			<div className="absolute inset-0 rounded-xl overflow-hidden">
				{/* 可放大的图片内容 */}
				<div
					className="absolute inset-0 transition-transform duration-300"
					style={{
						transform: isHovered ? "scale(1.1)" : "scale(1)",
						zIndex: 1
					}}
				>
					<Image
						src={room.image}
						alt={room.name}
						fill
						className="object-cover"
					/>
				</div>
			</div>

			{/* 底部信息条（固定在蒙版内） */}
			<div className="absolute bottom-0 left-0 right-0 h-12 bg-[#F6EBE1]/90 backdrop-blur-sm flex items-center px-3 z-10">
				<FontAwesomeIcon icon={faDoorOpen} className="text-xs mr-2 text-[#B07C5B]" />
				<span className="font-medium text-[#B07C5B]">{room.name}</span>
			</div>
		</div>
	);
};

export default DraggableRooms;