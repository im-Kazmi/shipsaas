"use client";

import { Github, Key, Loader2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { signIn } from "~/lib/auth-client";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");

  const onCredentialSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signIn.email({
      email: email,
      password: password,
      callbackURL: "/dashboard",
    });
    setLoading(false);
  };

  return (
    <Card className="m-auto w-full max-w-md rounded-3xl border border-neutral-900 bg-black p-8 text-white shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Sign in</CardTitle>
        <CardDescription>
          Hey, Enter your details to sign in to your account
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-red-600/20 p-3 text-sm text-red-600">
          <TriangleAlert className="size-4" />
          <p>Invalid email or password</p>
        </div>
      )}

      <CardContent className="space-y-5">
        <form onSubmit={onCredentialSignIn} className="space-y-4">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            required
            className="border-neutral-900"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            id="password"
            placeholder="Password"
            required
            className="border-neutral-900"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <div className="w-full border-t border-neutral-700" />
          <span>or</span>
          <div className="w-full border-t border-neutral-700" />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() =>
              signIn.social({ provider: "github", callbackURL: "/dashboard" })
            }
          >
            <Github /> GitHub
          </Button>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() =>
              signIn.social({ provider: "google", callbackURL: "/dashboard" })
            }
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="...Google Icon Path..." />
            </svg>{" "}
            Google
          </Button>
        </div>
      </CardContent>

      <CardFooter className="mt-6 text-center">
        <Link
          href="/forget-password"
          className="text-sm text-blue-500 underline"
        >
          Forgot your password?
        </Link>
      </CardFooter>
    </Card>
  );
}
