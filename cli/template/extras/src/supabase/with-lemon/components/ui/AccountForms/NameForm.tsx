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
import { updateName } from "~/features/auth/actions";
import { handleRequest } from "~/utils/auth-helpers/client";

export function NameForm({ userName }: { userName: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const newName = formData.get("fullName") as string;

    // Check if the new name is the same as the old name
    if (newName === userName) {
      setIsSubmitting(false);
      return;
    }

    await handleRequest(e, updateName, router);
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full border-neutral-700 bg-transparent text-white">
      <CardHeader>
        <CardTitle>Your Name</CardTitle>
        <CardDescription>
          Please enter your full name, or a display name you are comfortable
          with.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="nameForm" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fullName">Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Your name"
                defaultValue={userName}
                maxLength={64}
                required
                className="border-neutral-700 bg-transparent"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <p className="pb-4 sm:pb-0">64 characters maximum</p>
        <Button form="nameForm" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Name"}
        </Button>
      </CardFooter>
    </Card>
  );
}
