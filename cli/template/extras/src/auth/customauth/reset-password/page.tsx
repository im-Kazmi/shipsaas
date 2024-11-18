"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";

import { LoaderButton } from "~/components/loader-button";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { changePasswordAction } from "./actions";

const registrationSchema = z
  .object({
    password: z.string().min(8),
    token: z.string(),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      password: "",
      token: searchParams.token,
      passwordConfirmation: "",
    },
  });

  const { execute, isPending, isSuccess, error } =
    useServerAction(changePasswordAction);

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    execute({
      token: values.token,
      password: values.password,
    });
  }

  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      {isSuccess && (
        <>
          <h1 className={cn("text-center")}>Password Updated</h1>
          <Alert variant="success">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Password updated</AlertTitle>
            <AlertDescription>
              Your password has been successfully updated.
            </AlertDescription>
          </Alert>

          <Button variant="default" asChild className="w-full">
            <Link href="/sign-in/email">Login with New Password</Link>
          </Button>
        </>
      )}

      {!isSuccess && (
        <>
          <h1 className={cn("text-center")}>Change Password</h1>

          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Uh-oh, something went wrong</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder="Enter your new password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder="Enter Confirm your Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoaderButton
                isLoading={isPending}
                className="w-full"
                type="submit"
              >
                Change Password
              </LoaderButton>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
