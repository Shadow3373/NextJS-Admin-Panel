"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { UserTable } from "@/components/users/user-table";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data - in a real app, this would be fetched from the API
  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active" as const,
      lastActive: "Just now",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "active" as const,
      lastActive: "10 minutes ago",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "Editor",
      status: "inactive" as const,
      lastActive: "2 days ago",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "User",
      status: "active" as const,
      lastActive: "1 hour ago",
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      role: "User",
      status: "pending" as const,
      lastActive: "Never",
    },
    {
      id: "6",
      name: "Sarah Taylor",
      email: "sarah.taylor@example.com",
      role: "Editor",
      status: "active" as const,
      lastActive: "3 hours ago",
    },
    {
      id: "7",
      name: "David Brown",
      email: "david.brown@example.com",
      role: "User",
      status: "inactive" as const,
      lastActive: "1 week ago",
    },
    {
      id: "8",
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      role: "User",
      status: "active" as const,
      lastActive: "2 hours ago",
    },
    {
      id: "9",
      name: "Thomas Moore",
      email: "thomas.moore@example.com",
      role: "Admin",
      status: "active" as const,
      lastActive: "5 minutes ago",
    },
    {
      id: "10",
      name: "Jennifer Clark",
      email: "jennifer.clark@example.com",
      role: "User",
      status: "pending" as const,
      lastActive: "Never",
    },
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("User data loaded successfully");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage your application users and their permissions.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <UserTable users={mockUsers} />
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}