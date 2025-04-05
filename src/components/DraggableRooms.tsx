"use client";
import React, { useState, useRef, useEffect } from "react";
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

// 定义 Room 类型
type Room = {
	name: string;
	image: string;
	active: boolean;
};

const DraggableRooms = ({ rooms: initialRooms }: { rooms: Room[] }) => {
	// 从 localStorage 中读取数据并反序列化 20250406_0205
	const storedRooms = localStorage.getItem('draggableRooms');
	const initialState = storedRooms ? JSON.parse(storedRooms) as Room[] : initialRooms;

	// 声明状态并使用初始数据初始化
	const [rooms, setRooms] = useState<Room[]>(initialState);
	const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { delay: 300, tolerance: 5 }
		}),
		useSensor(TouchSensor, {
			activationConstraint: { delay: 300, tolerance: 5 }
		})
	);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			setRooms((prev) => {
				const oldIndex = prev.findIndex((room) => room.name === active.id);
				const newIndex = prev.findIndex((room) => room.name === over.id);
				const newRooms = arrayMove(prev, oldIndex, newIndex);
				// 将新的顺序数据保存到 localStorage 中 20250406_0205
				localStorage.setItem('draggableRooms', JSON.stringify(newRooms));
				return newRooms;
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
	room: Room;
	isHovered: boolean;
	onHoverChange: (hover: boolean) => void;
}) => {
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
		<div
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				cursor: isLongPress.current ? 'grabbing' : 'grab'
			}}
			className="relative"
			{...attributes}
			onMouseEnter={() => !isLongPress.current && onHoverChange(true)}
			onMouseLeave={() => !isLongPress.current && onHoverChange(false)}
		>
			<div
				className={`rounded-xl overflow-hidden border-2 transition-all duration-300 ${isHovered ? "border-[#B07C5B]" : "border-transparent"}`}
				style={{ height: "220px" }}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				{...listeners}
			>
				{/* 图片容器 */}
				<div className="absolute inset-0 rounded-xl overflow-hidden">
					<div
						className="absolute inset-0 transition-transform duration-300"
						style={{
							transform: isHovered ? "scale(1.1)" : "scale(1)",
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

				{/* 底部信息条 */}
				<div className="absolute bottom-0 left-0 right-0 h-12 bg-[#F6EBE1]/90 backdrop-blur-sm flex items-center px-3 z-10">
					<FontAwesomeIcon icon={faDoorOpen} className="text-xs mr-2 text-[#B07C5B]" />
					<span className="font-medium text-[#B07C5B]">{room.name}</span>
				</div>
			</div>
		</div>
	);
};

export default DraggableRooms;