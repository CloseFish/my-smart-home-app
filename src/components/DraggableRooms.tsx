"use client";
import React, { useState, useRef, useEffect } from "react";
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
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
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
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
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
			// 短按逻辑可在此添加，暂时留空
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
			className={`overflow-hidden border border-[#E0E0E0] ${room.active ? "ring-1 ring-[#B07C5B]" : ""}`}
			style={{ transform: CSS.Transform.toString(transform), transition }}
		>
			<div className="relative h-[140px]">
				<Image
					src={room.image}
					alt={room.name}
					fill
					sizes="(max-width: 768px) 100vw, 50vw"
					className="object-cover"
				/>
			</div>
			<div className="p-3 flex items-center">
				<div className="font-medium text-[#B07C5B] flex items-center">
					<FontAwesomeIcon icon={faDoorOpen} className="text-xs mr-1" />
					<span>{room.name}</span>
				</div>
			</div>
		</Card>
	);
};

export default DraggableRooms;
