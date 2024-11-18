"use client";

import { useRouter } from "next/navigation";
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
import { Label } from "~/components/ui/label";
import { updateEmail } from "~/features/auth/actions";
import { handleRequest } from "~/utils/auth-helpers/client";

export function EmailForm({ userEmail }: { userEmail: string | undefined }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const newEmail = formData.get("newEmail") as string;

    // Check if the new email is the same as the old email
    if (newEmail === userEmail) {
      setIsSubmitting(false);
      return;
    }

    await handleRequest(e, updateEmail, router);
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full border-neutral-700 bg-transparent text-white">
      <CardHeader>
        <CardTitle>Your Email</CardTitle>
        <CardDescription>
          Please enter the email address you want to use to login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="emailForm" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newEmail">New Email</Label>
              <Input
                id="newEmail"
                name="newEmail"
                type="email"
                placeholder="Your email"
                defaultValue={userEmail ?? ""}
                maxLength={64}
                required
                className="border-neutral-700 bg-transparent"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <p className="pb-4 sm:pb-0">We will email you to verify the change.</p>
        <Button form="emailForm" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Email"}
        </Button>
      </CardFooter>
    </Card>
  );
}
