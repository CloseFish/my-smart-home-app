"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faDoorOpen,
	faMoon,
	faFilm,
	faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
	DndContext,
	closestCenter,
	useSensor,
	useSensors,
	PointerSensor,
	TouchSensor
} from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// 定义 Scene 类型
type Scene = {
	name: string;
	icon: any;
};

const DraggableScenes: React.FC = () => {
	// 定义初始场景数据
	const initialScenes: Scene[] = [
		{ name: "回家模式", icon: faHome },
		{ name: "离家模式", icon: faDoorOpen },
		{ name: "睡眠模式", icon: faMoon },
		{ name: "影院模式", icon: faFilm },
		{ name: "会客模式", icon: faUsers }
	];

	// 从 localStorage 中读取数据并反序列化 20250406_0155
	const storedScenes = localStorage.getItem('draggableScenes');
	const initialState = storedScenes ? JSON.parse(storedScenes) as Scene[] : initialScenes;

	// 声明状态并使用初始数据初始化
	const [draggableScenes, setDraggableScenes] = useState<Scene[]>(initialState);

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
			setDraggableScenes((prev: Scene[]) => {
				const oldIndex = prev.findIndex((scene: Scene) => scene.name === active.id);
				const newIndex = prev.findIndex((scene: Scene) => scene.name === over.id);
				const newScenes = arrayMove(prev, oldIndex, newIndex);
				// 将新的顺序数据保存到 localStorage 中 20250406_0155
				localStorage.setItem('draggableScenes', JSON.stringify(newScenes));
				return newScenes;
			});
		}
	};

	return (
		<div>
			<h2 className="text-lg font-medium mb-4">智能场景</h2>
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
				<SortableContext
					items={draggableScenes.map((scene: Scene) => scene.name)}
					strategy={rectSortingStrategy}
				>
					<div className="grid grid-cols-1 gap-4">
						{draggableScenes.map((scene: Scene) => (
							<SortableScene key={scene.name} id={scene.name} scene={scene} />
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
};

const SortableScene: React.FC<{ id: string; scene: Scene }> = ({ id, scene }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
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
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				cursor: 'grab',
				zIndex: isDragging ? 999 : 1
			}}
			{...attributes}
			className="p-4 bg-white hover:shadow-md transition-shadow relative overflow-hidden border border-[#E0E0E0]"
			{...listeners}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			<div className="flex items-center">
				<div className="flex items-center justify-center bg-[#F6EBE1] rounded-full w-12 h-12 mr-3">
					<FontAwesomeIcon icon={scene.icon} className="text-[#B07C5B] text-sm" />
				</div>
				<div className="font-medium">
					<span>{scene.name}</span>
				</div>
			</div>
		</Card>
	);
};

export default DraggableScenes;