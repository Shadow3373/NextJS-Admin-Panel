import { AuthForm } from "@/components/ui/auth-form";
import { AuthLayout } from "@/components/layouts/auth-layout";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthForm type="register" />
    </AuthLayout>
  );
}