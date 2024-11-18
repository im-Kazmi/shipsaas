"use client";

import { Loader2, TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
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

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();
  const error = params.get("error");

  const onCredentialSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoadingLogin(true);

    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
  };

  const onProviderSignIn = (provider: "github" | "google") => {
    setLoading(true);
    setLoadingGithub(provider === "github");
    setLoadingGoogle(provider === "google");

    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <>
      <Card className="m-auto h-fit w-full rounded-3xl border border-neutral-900 bg-black p-8 text-white shadow-2xl md:w-[400px]">
        <CardHeader className="mx-auto flex items-center px-0 pt-0">
          <CardTitle className="text-3xl">Sign in</CardTitle>
          <CardDescription className="text-center">
            Hey, Enter your details to get sign in <br />
            to your account
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 text-destructive mb-6 flex items-center gap-x-2 rounded-md p-3 text-sm">
            <TriangleAlert className="size-4" />
            <p>Invalid email or password</p>
          </div>
        )}
        <CardContent className="space-y-5 px-0 pb-0">
          <form onSubmit={onCredentialSignIn} className="space-y-2.5">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              disabled={loading || loadingLogin}
              required
              className="border-neutral-900"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              disabled={loading || loadingLogin}
              required
              className="border-neutral-900"
            />
            <RainbowButton className="w-full" type="submit" disabled={loading}>
              {loadingLogin ? (
                <Loader2 className="left-2.5 top-2.5 mr-2 size-5 animate-spin" />
              ) : (
                "Sign in"
              )}
            </RainbowButton>
          </form>
          <Separator className="bg-neutral-700" />
          <div className="flex flex-col gap-y-2.5">
            <Button
              onClick={() => onProviderSignIn("google")}
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
              onClick={() => onProviderSignIn("github")}
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
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" onClick={() => setLoading(true)}>
              <span className="hover:underline">Sign up</span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default SignIn;
