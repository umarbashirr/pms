import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full h-full">
      <Card className="w-full max-w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Welcome back! We are happy to see you again
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
