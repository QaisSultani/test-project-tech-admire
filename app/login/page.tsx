import React from "react";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center p-4">
      <Card className="w-max-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-lg uppercase font-bold">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-secondary-foreground">Don&apos;t have an account?</p>
          <Link href="/signup">
            <Button variant="link">Sign up</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
