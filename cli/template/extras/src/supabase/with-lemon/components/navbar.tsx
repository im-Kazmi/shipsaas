import { createClient } from "~/lib/supabase/server";
import { Navlinks } from "./nav-links";

export async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className={""}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <Navlinks user={user} />
      </div>
    </nav>
  );
}
