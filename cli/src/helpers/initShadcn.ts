import { execa } from "execa";

export async function initShadcn(projectDir: string, pkgManager: string) {
  const command =
    pkgManager === "npm"
      ? "npx"
      : pkgManager === "bun"
        ? "bunx"
        : pkgManager === "pnpm"
          ? "pnpm dlx"
          : "npx";

  console.log("Initializing ShadCN UI...\n");

  const initProcess = execa(command, ["shadcn@latest", "init", "-d"], {
    cwd: projectDir,
  });

  initProcess.stdout?.pipe(process.stdout);
  initProcess.stderr?.pipe(process.stderr);

  await initProcess;

  console.log("\nAdding components...\n");

  const addComponentsProcess = execa(
    command,
    [
      "shadcn@latest",
      "add",
      "-y",
      "-o",
      "button",
      "label",
      "card",
      "separator",
      "https://magicui.design/r/rainbow-button",
      "https://magicui.design/r/animated-gradient-text",
      "https://magicui.design/r/shimmer-button",
    ],
    {
      cwd: projectDir,
    }
  );

  addComponentsProcess.stdout?.pipe(process.stdout);
  addComponentsProcess.stderr?.pipe(process.stderr);

  await addComponentsProcess;

  console.log("\nShadCN UI setup complete.");
}
