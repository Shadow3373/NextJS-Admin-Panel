import { AuthForm } from "@/components/ui/auth-form";
import { AuthLayout } from "@/components/layouts/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm type="login" />
    </AuthLayout>
  );
}