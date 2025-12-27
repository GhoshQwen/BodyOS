import { HomeIcon, Utensils, Dumbbell, TrendingUp, User, Users, Bluetooth } from "lucide-react";
import Index from "./pages/Index.jsx";
import DietRecord from "./pages/DietRecord.jsx";
import ExerciseRecord from "./pages/ExerciseRecord.jsx";
import Progress from "./pages/Progress.jsx";
import Profile from "./pages/Profile.jsx";
import Social from "./pages/Social.jsx";
import DeviceConnection from "./pages/DeviceConnection.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "饮食",
    to: "/diet",
    icon: <Utensils className="h-4 w-4" />,
    page: <DietRecord />,
  },
  {
    title: "运动",
    to: "/exercise",
    icon: <Dumbbell className="h-4 w-4" />,
    page: <ExerciseRecord />,
  },
  {
    title: "进度",
    to: "/progress",
    icon: <TrendingUp className="h-4 w-4" />,
    page: <Progress />,
  },
  {
    title: "社交",
    to: "/social",
    icon: <Users className="h-4 w-4" />,
    page: <Social />,
  },
  {
    title: "我的",
    to: "/profile",
    icon: <User className="h-4 w-4" />,
    page: <Profile />,
  },
  {
    title: "设备",
    to: "/devices",
    icon: <Bluetooth className="h-4 w-4" />,
    page: <DeviceConnection />,
  },
];
