// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
const App: React.FC = () => {
const rooms = [
{
name: "客厅",
image: "https://ai-public.mastergo.com/ai/img_res/62072cecafb4478f3cbaaa4da70db5cb.jpg",
active: true,
},
{
name: "主卧室",
image: "https://ai-public.mastergo.com/ai/img_res/cb736beaa72c2a9860e0a36761700bee.jpg",
active: false,
},
{
name: "厨房",
image: "https://ai-public.mastergo.com/ai/img_res/cce01fcd27e1f6a49f679693573a45d6.jpg",
active: false,
},
{
name: "书房",
image: "https://ai-public.mastergo.com/ai/img_res/31248d5ae6fc5f1c7b83283e7c166444.jpg",
active: false,
}
];
const devices = [
{ name: "智能空调", icon: "fa-snowflake", status: true },
{ name: "客厅灯光", icon: "fa-lightbulb", status: false },
{ name: "智能窗帘", icon: "fa-curtains", status: true },
{ name: "安防系统", icon: "fa-shield-alt", status: true },
{ name: "新风系统", icon: "fa-wind", status: false },
{ name: "地暖控制", icon: "fa-temperature-high", status: true },
];
const scenes = [
{ name: "回家模式", icon: "fa-home" },
{ name: "离家模式", icon: "fa-door-open" },
{ name: "睡眠模式", icon: "fa-moon" },
{ name: "影院模式", icon: "fa-film" },
{ name: "会客模式", icon: "fa-users" },
];
return (
<div className="min-h-screen bg-[#FDF7F0]">
{/* 顶部导航 */}
<div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
<div className="flex items-center gap-4">
<Avatar className="h-10 w-10">
<AvatarImage src="https://ai-public.mastergo.com/ai/img_res/f84933b2c1b47b5537a3bca12fd2045e.jpg" />
</Avatar>
<div>
<div className="text-sm text-gray-500">早上好</div>
<div className="font-medium">陈志强</div>
</div>
</div>
<div className="flex items-center gap-4">
<div className="flex items-center gap-2 bg-[#F6EBE1] px-3 py-1.5 rounded-full">
<i className="fas fa-cloud-sun text-[#B07C5B]"></i>
<span className="text-sm text-[#8B5E3C]">26°C 晴朗</span>
</div>
<Button variant="ghost" size="icon" className="!rounded-button">
<i className="fas fa-bell text-gray-600"></i>
</Button>
<Button variant="ghost" size="icon" className="!rounded-button">
<i className="fas fa-cog text-gray-600"></i>
</Button>
</div>
</div>
</div>
{/* 主要内容区 */}
<main className="pt-20 pb-20">
<div className="max-w-7xl mx-auto px-4 flex gap-8">
{/* 左侧主要内容 */}
<div className="flex-1">
{/* 房间选择 */}
<div className="mb-8">
<h2 className="text-lg font-medium mb-4">房间</h2>
<div className="grid grid-cols-2 gap-4">
{rooms.map((room) => (
<div
key={room.name}
className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${
room.active ? "ring-2 ring-[#B07C5B] rounded-xl overflow-hidden shadow-lg" : ""
}`}
>
<div className="h-[180px] rounded-xl overflow-hidden bg-gray-50">
<img
src={room.image}
alt={room.name}
className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
/>
</div>
<div className="mt-3 font-medium text-[#B07C5B] flex items-center gap-2">
<i className="fas fa-door-open text-sm"></i>
{room.name}
</div>
</div>
))}
</div>
</div>
{/* 设备控制 */}
<div className="mb-8">
<h2 className="text-lg font-medium mb-4">快捷控制</h2>
<div className="grid grid-cols-3 gap-4">
{devices.map((device) => (
<Card key={device.name} className="p-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-[#F6EBE1] flex items-center justify-center">
<i className={`fas ${device.icon} text-[#B07C5B] text-xl`}></i>
</div>
<div>
<div className="font-medium">{device.name}</div>
<div className="text-sm text-gray-500">
{device.status ? "已开启" : "已关闭"}
</div>
</div>
</div>
<Switch checked={device.status} />
</div>
</Card>
))}
</div>
</div>
</div>
{/* 右侧场景模式 */}
<div className="w-[300px]">
<h2 className="text-lg font-medium mb-4">智能场景</h2>
<div className="space-y-4">
{scenes.map((scene) => (
<Button
key={scene.name}
variant="outline"
className="w-full h-auto py-4 flex items-center gap-4 !rounded-button"
>
<div className="w-12 h-12 rounded-full bg-[#F6EBE1] flex items-center justify-center">
<i className={`fas ${scene.icon} text-[#B07C5B] text-xl`}></i>
</div>
<span className="flex-1 text-left">{scene.name}</span>
<i className="fas fa-chevron-right text-gray-400"></i>
</Button>
))}
</div>
</div>
</div>
</main>
{/* 底部导航 */}
<div className="fixed bottom-0 left-0 right-0 bg-white border-t">
<div className="max-w-7xl mx-auto px-4">
<div className="flex justify-around py-3">
{[
{ name: "首页", icon: "fa-home", active: true },
{ name: "设备", icon: "fa-tablet-alt", active: false },
{ name: "场景", icon: "fa-magic", active: false },
{ name: "我的", icon: "fa-user", active: false },
].map((item) => (
<Button
key={item.name}
variant="ghost"
className={`flex flex-col items-center gap-1 h-auto !rounded-button ${
item.active ? "text-[#B07C5B]" : "text-gray-500"
}`}
>
<i className={`fas ${item.icon} text-xl`}></i>
<span className="text-xs">{item.name}</span>
</Button>
))}
</div>
</div>
</div>
</div>
);
};
export default App