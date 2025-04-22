import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  ClipboardList,
  FileText,
  Truck,
  Users,
} from "lucide-react";
import Link from "next/link";
import Login from "./pageLogin/login/page";
import Image from "next/image";
export default function Dashboard() {
  return (
    <Login/>
  )
}
