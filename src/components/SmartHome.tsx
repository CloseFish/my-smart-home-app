"use client"

import React, { useState } from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeviceSwitch from "./DeviceSwitch"; // 导入新组件
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome, faDoorOpen, faMoon, faFilm, faUsers,
  faSnowflake, faLightbulb, faShieldAlt, faWind,
  faTemperatureHigh, faCloudSun, faBell, faCog, faChevronRight,
  faTabletAlt, faMagic, faUser
} from "@fortawesome/free-solid-svg-icons";

const SmartHome: React.FC = () => {
  const [rooms] = useState([
    {
      name: "客厅",
      image: "/images/living_room.jpg",
      active: true,
    },
    {
      name: "主卧室",
      image: "/images/bedroom.jpg",
      active: false,
    },
    {
      name: "厨房",
      image: "/images/kitchen.jpg",
      active: false,
    },
    {
      name: "书房",
      image: "/images/study.jpg",
      active: false,
    }
  ]);

  const [devices, setDevices] = useState([
    { name: "智能空调", icon: faSnowflake, status: true },
    { name: "客厅灯光", icon: faLightbulb, status: false },
    { name: "智能窗帘", icon: faWind, status: true },
    { name: "安防系统", icon: faShieldAlt, status: true },
    { name: "新风系统", icon: faWind, status: false },
    { name: "地暖控制", icon: faTemperatureHigh, status: true },
  ]);

  const scenes = [
    { name: "回家模式", icon: faHome },
    { name: "离家模式", icon: faDoorOpen },
    { name: "睡眠模式", icon: faMoon },
    { name: "影院模式", icon: faFilm },
    { name: "会客模式", icon: faUsers },
  ];

  const handleDeviceStatusChange = (deviceName: string, newStatus: boolean) => {
    console.log(`Received new status for ${deviceName}: ${newStatus}`);
    setDevices(prevDevices => {
      const updatedDevices = prevDevices.map(device =>
        device.name === deviceName ? { ...device, status: newStatus } : device
      );
      console.log("Updated devices:", updatedDevices); // 确保 log 里看到最新数据
      return updatedDevices;
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* 顶部导航 */}
      <div className="bg-white p-4 rounded-b-xl shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/ChenZhiqiang.jpg" alt="Avatar" />
            </Avatar>
            <div>
              <div className="text-sm text-gray-500">早上好</div>
              <div className="font-medium">陈志强</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#F6EBE1] px-3 py-1.5 rounded-full">
              <FontAwesomeIcon icon={faCloudSun} className="text-[#B07C5B]" />
              <span className="text-sm text-[#8B5E3C]">26°C 晴朗</span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <FontAwesomeIcon icon={faBell} className="text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <FontAwesomeIcon icon={faCog} className="text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* 主要内容区 */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧内容 */}
          <div className="flex-1">
            {/* 房间选择 */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">房间</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rooms.map((room) => (
                  <Card
                    key={room.name}
                    className={`overflow-hidden border border-[#E0E0E0] ${room.active ? "ring-1 ring-[#B07C5B]" : ""}`}
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
                ))}
              </div>
            </div>

            {/* 快捷控制 */}
            <div>
              <h2 className="text-lg font-medium mb-4">快捷控制</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {devices.map((device) => (
                  <Card key={device.name} className="p-4 bg-white hover:shadow-md transition-shadow">
                    <DeviceSwitch
                      device={device}
                      onStatusChange={(newStatus) => handleDeviceStatusChange(device.name, newStatus)}
                    /> {/* 使用新组件 */}
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧场景模式 */}
          <div className="w-full lg:w-[320px]">
            <h2 className="text-lg font-medium mb-4">智能场景</h2>
            <div className="space-y-4">
              {scenes.map((scene) => (
                <Button
                  key={scene.name}
                  variant="outline"
                  className="w-full h-auto py-4 flex items-center gap-4 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F6EBE1] flex items-center justify-center">
                    <FontAwesomeIcon icon={scene.icon} className="text-[#B07C5B] text-lg" />
                  </div>
                  <span className="flex-1 text-left">{scene.name}</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 底部导航 - 保持不变 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-3">
            {[
              { name: "首页", icon: faHome, active: true },
              { name: "设备", icon: faTabletAlt, active: false },
              { name: "场景", icon: faMagic, active: false },
              { name: "我的", icon: faUser, active: false },
            ].map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto rounded-xl ${item.active ? "text-[#B07C5B]" : "text-gray-500"
                  }`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-base" />
                <span className="text-xs">{item.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHome;