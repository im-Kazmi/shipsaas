import { redirect } from "next/navigation";

import { CustomerPortalForm } from "~/components/ui/AccountForms/CustomerPortalForm";
import { EmailForm } from "~/components/ui/AccountForms/EmailForm";
import { NameForm } from "~/components/ui/AccountForms/NameForm";
import { getUser, getUserDetails } from "~/features/auth/queries";
import { getSubscriptions } from "~/features/subscriptions/queries";
import { createClient } from "~/lib/supabase/server";

export default async function Account() {
  const supabase = createClient();
  const [user, userDetails, subscriptions] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getSubscriptions(supabase),
  ]);

  if (!user) {
    return redirect("/signin");
  }

  return (
    <section className="mb-32">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extralight text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="m-auto mt-5 max-w-2xl text-xl text-zinc-200 sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-5 p-4">
        <CustomerPortalForm subscriptions={subscriptions} />
        <NameForm userName={userDetails?.full_name ?? ""} />
        <EmailForm userEmail={user?.email} />
      </div>
    </section>
  );
}
