"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";

import { LoaderButton } from "~/components/loader-button";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { cn } from "~/lib/utils";
import { pageTitleStyles } from "~/styles/common";
import { resetPasswordAction } from "./actions";

const registrationSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const { execute, isPending, isSuccess } = useServerAction(
    resetPasswordAction,
    {
      onError({ err }) {
        toast({
          title: "Something went wrong",
          description: err.message,
          variant: "destructive",
        });
      },
    }
  );

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    execute(values);
  }

  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      <h1 className={cn(pageTitleStyles, "text-center")}>Forgot Password</h1>

      {isSuccess && (
        <Alert variant="success">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Reset link sent</AlertTitle>
          <AlertDescription>
            We have sent you an email with a link to reset your password.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter your email"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoaderButton isLoading={isPending} className="w-full" type="submit">
            Send Reset Email
          </LoaderButton>
        </form>
      </Form>
    </div>
  );
}
