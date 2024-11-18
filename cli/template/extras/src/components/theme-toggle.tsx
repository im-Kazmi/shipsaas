"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      {theme === "dark" ? (
        <Button
          variant="ghost"
          className="border-zinc-900 bg-[#0c0c0d] hover:bg-inherit"
          size="icon"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="border-zinc-100 bg-inherit hover:bg-inherit"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}
    </div>
  );
}
