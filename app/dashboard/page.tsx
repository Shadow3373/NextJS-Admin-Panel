"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { UserChart } from "@/components/dashboard/user-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { toast } from "sonner";
import { Users, UserPlus, UserCheck, Activity } from "lucide-react";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data - in a real app, this would be fetched from the API
  const stats = [
    { title: "Total Users", value: "1,284", icon: <Users />, trend: "up" as const, trendValue: "+12%", description: "from last month" },
    { title: "New Users", value: "348", icon: <UserPlus />, trend: "up" as const, trendValue: "+8%", description: "from last month" },
    { title: "Active Users", value: "942", icon: <UserCheck />, trend: "down" as const, trendValue: "-3%", description: "from last week" },
    { title: "User Sessions", value: "3,721", icon: <Activity />, trend: "up" as const, trendValue: "+16%", description: "from last month" },
  ];
  
  const chartData = [
    { name: "Jan", value: 420 },
    { name: "Feb", value: 520 },
    { name: "Mar", value: 490 },
    { name: "Apr", value: 780 },
    { name: "May", value: 650 },
    { name: "Jun", value: 870 },
    { name: "Jul", value: 920 },
  ];
  
  const activities = [
    {
      id: "1",
      user: { name: "John Doe", initials: "JD" },
      action: "Created a new account",
      date: "2 hours ago",
    },
    {
      id: "2",
      user: { name: "Sarah Johnson", initials: "SJ" },
      action: "Updated profile information",
      date: "5 hours ago",
    },
    {
      id: "3",
      user: { name: "Mike Peterson", initials: "MP" },
      action: "Changed password",
      date: "Yesterday at 4:30 PM",
    },
    {
      id: "4",
      user: { name: "Emily Wilson", initials: "EW" },
      action: "Logged in after 30 days",
      date: "Yesterday at 2:12 PM",
    },
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Dashboard data loaded successfully");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your application's performance and user statistics.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              trendValue={stat.trendValue}
              description={stat.description}
              className={isLoading ? "animate-pulse" : ""}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <UserChart
            data={chartData}
            title="User Growth"
            description="Number of new users per month"
          />
          <div className="md:col-span-1 lg:col-span-3">
            <RecentActivity activities={activities} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}