"use client";

import { Loader2, TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import {api} from '~/server/react'

type ResponseType = InferResponseType<typeof api.users["$post"]>;
type RequestType = InferRequestType<typeof api.users["$post"]>["json"];


const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const mutation = api.auth.signup.useMutation()

  const onProviderSignUp = (provider: "github" | "google") => {
    setLoading(true);
    setLoadingGithub(provider === "github");
    setLoadingGoogle(provider === "google");

    signIn(provider, { callbackUrl: "/" });
  };


  const onCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setLoading(true);

          mutation.mutate(
              {
                  name,
                  email,
                  password,
              },
              {
                  onSuccess: () => {
                      signIn("credentials", {
                          email,
                          password,
                          callbackUrl: "/",
                      });
                  },
              }
          );

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
              disabled={mutation.isPending ||loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              type="text"
              required
              className="border-neutral-900"
            />
            <Input
              disabled={mutation.isPending ||loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              className="border-neutral-900"
            />
            <Input
              disabled={mutation.isPending ||loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
              minLength={3}
              maxLength={20}
              className="border-neutral-900"
            />
            <RainbowButton className="w-full" type="submit" disabled={mutation.isPending ||loading}>
              {mutation.isPending ||loading ? (
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
              disabled={mutation.isPending ||loading}
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
              disabled={mutation.isPending ||loading}
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
