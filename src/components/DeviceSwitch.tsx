"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSnowflake,
	faLightbulb,
	faWind,
	faShieldAlt,
	faTemperatureHigh
} from "@fortawesome/free-solid-svg-icons";

type Device = {
	status: boolean;
	icon: any;
	name: string;
};

type DeviceSwitchProps = {
	device: Device;
	onStatusChange: (newStatus: boolean) => void;
};

const DeviceSwitch: React.FC<DeviceSwitchProps> = ({ device, onStatusChange }) => {
	const handleSwitchChange = (newStatus: boolean) => {
		onStatusChange(newStatus);
	};

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 rounded-full bg-[#F6EBE1] flex items-center justify-center text-[#B07C5B]">
					<FontAwesomeIcon icon={device.icon} />
				</div>
				<div>
					<div className="font-medium">{device.name}</div>
					<div className="text-xs text-gray-500">
						{device.status ? "已开启" : "已关闭"}
					</div>
				</div>
			</div>
			<Switch
				checked={device.status}
				onCheckedChange={handleSwitchChange}
				onClick={(e) => e.stopPropagation()} // 阻止事件冒泡
			/>
		</div>
	);
};

export default DeviceSwitch;