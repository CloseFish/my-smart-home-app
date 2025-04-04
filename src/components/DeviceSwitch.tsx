"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSnowflake,
	faLightbulb,
	faWind,
	faShieldAlt,
	faTemperatureHigh
} from "@fortawesome/free-solid-svg-icons";

// 定义 device 对象的类型
type Device = {
	status: boolean;
	icon: any; // 这里使用 any 类型，因为 FontAwesomeIcon 的 icon 属性类型较复杂，可根据实际情况细化
	name: string;
};

type DeviceSwitchProps = {
	device: Device;
	onStatusChange: (newStatus: boolean) => void;
};

const DeviceSwitch: React.FC<DeviceSwitchProps> = ({ device, onStatusChange }) => {
	const handleSwitchChange = () => {
		console.log('Switch changed in DeviceSwitch component');
		const newStatus = !device.status; // 直接基于 props.device.status 取反
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
				checked={device.status} // 直接使用 props.device.status
				onCheckedChange={handleSwitchChange} // `onChange` 改为 `onCheckedChange`
			/>
		</div>
	);
};


export default DeviceSwitch;