import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EmailSignIn } from "@/features/auth/components/email-signin";
import { ForgotPassword } from "@/features/auth/components/forgot-password";
import { OauthSignIn } from "@/features/auth/components/oauth-signin";
import { PasswordSignIn } from "@/features/auth/components/password-signin";
import { SignUp } from "@/features/auth/components/signup";
import { UpdatePassword } from "@/features/auth/components/update-password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Logo from "~/components/icons/Logo";
import { createClient } from "~/lib/supabase/server";
import {
  getAuthTypes,
  getDefaultSignInView,
  getRedirectMethod,
  getViewTypes,
} from "~/utils/auth-helpers/settings";

export default async function SignIn({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { disable_button: boolean };
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  let viewProp: string;

  if (typeof params.id === "string" && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const preferredSignInView =
      cookies().get("preferredSignInView")?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== "update_password") {
    return redirect("/");
  } else if (!user && viewProp === "update_password") {
    return redirect("/signin");
  }

  const getCardTitle = () => {
    switch (viewProp) {
      case "forgot_password":
        return "Reset Password";
      case "update_password":
        return "Update Password";
      case "signup":
        return "Sign Up";
      default:
        return "Sign In";
    }
  };

  return (
    <div className="height-screen-helper flex justify-center">
      <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3">
        <div className="flex justify-center pb-12">
          <Logo width="64px" height="64px" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{getCardTitle()}</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {viewProp === "password_signin" && (
              <PasswordSignIn
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
              />
            )}
            {viewProp === "email_signin" && (
              <EmailSignIn
                allowPassword={allowPassword}
                redirectMethod={redirectMethod}
                disableButton={searchParams.disable_button}
              />
            )}
            {viewProp === "forgot_password" && (
              <ForgotPassword
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
                disableButton={searchParams.disable_button}
              />
            )}
            {viewProp === "update_password" && (
              <UpdatePassword redirectMethod={redirectMethod} />
            )}
            {viewProp === "signup" && (
              <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
            )}
            {viewProp !== "update_password" &&
              viewProp !== "signup" &&
              allowOauth && (
                <>
                  <Separator className="my-4" />
                  <OauthSignIn />
                </>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
