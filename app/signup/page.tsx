import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignupForm from "@/components/SignupForm";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-lg uppercase font-bold">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Create your account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-secondary-foreground">Already have an account?</p>
          <Link href="/login">
            <Button variant="link">Log in</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
