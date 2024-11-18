"use client";

import { Loader2, TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { registerUser } from "~/actions/auth";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { Separator } from "~/components/ui/separator";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onProviderSignUp = (provider: "github" | "google") => {
    setLoading(true);
    setLoadingGithub(provider === "github");
    setLoadingGoogle(provider === "google");

    signIn(provider, { callbackUrl: "/" });
  };

  const onCredentialSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await registerUser(formData);

      if (result.error) {
        // Handle validation errors
        console.error("Validation errors:", result.error);
        // You might want to set these errors in state and display them in the UI
      } else if (result.success) {
        // Registration successful
        console.log("User registered successfully");
        // You might want to redirect the user or show a success message
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      // Handle any unexpected errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="m-auto h-fit w-full rounded-3xl border border-neutral-900 bg-black p-8 text-white shadow-2xl md:w-[400px]">
        <CardHeader className="mx-auto flex items-center px-0 pt-0">
          <CardTitle className="text-3xl">Sign up</CardTitle>
          <CardDescription className="text-center">
            Hey, Enter your details <br />
            below to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-0 pb-0">
          <form onSubmit={onCredentialSignUp} className="space-y-2.5">
            <Input
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              type="text"
              required
              className="border-neutral-900"
            />
            <Input
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              className="border-neutral-900"
            />
            <Input
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
              minLength={3}
              maxLength={20}
              className="border-neutral-900"
            />
            <RainbowButton className="w-full" type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="left-2.5 top-2.5 mr-2 size-5 animate-spin" />
              ) : (
                "Continue"
              )}
            </RainbowButton>
          </form>
          <Separator className="bg-neutral-900" />
          <div className="flex flex-col gap-y-2.5">
            <Button
              onClick={() => onProviderSignUp("google")}
              size="lg"
              variant="outline"
              className="relative border-neutral-900 bg-transparent"
              disabled={loading}
            >
              {loadingGoogle ? (
                <Loader2 className="absolute left-2.5 top-2.5 mr-2 size-5 animate-spin" />
              ) : (
                <FcGoogle className="absolute left-2.5 top-2.5 mr-2 size-5" />
              )}
              Continue with Google
            </Button>
            <Button
              onClick={() => onProviderSignUp("github")}
              size="lg"
              variant="outline"
              disabled={loading}
              className="relative border-neutral-900 bg-transparent"
            >
              {loadingGithub ? (
                <Loader2 className="absolute left-2.5 top-2.5 mr-2 size-5 animate-spin" />
              ) : (
                <FaGithub className="absolute left-2.5 top-2.5 mr-2 size-5" />
              )}
              Continue with Github
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">
            Already have an account?{" "}
            <Link href="/sign-in" onClick={() => setLoading(true)}>
              <span className="hover:underline">Sign in</span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default SignUp;
