"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { UserTable } from "@/components/users/user-table";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { userApi } from "@/lib/api";

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const data = async () => {
      setIsLoading(true);
      try {
        const uData = await userApi("/getall", { method: "GET" });
        console.log(uData);
        setUserData(uData);
        setIsLoading(false);
        toast.success("User Data Fetch Successfully");
      } catch (error: any) {
        toast.error(error.message || "User Fetch Failed");
      } finally {
        setIsLoading(false);
      }
    };
    data();
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
              <UserTable users={userData} />
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
