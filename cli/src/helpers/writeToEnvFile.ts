import fs from "fs";
import path from "path";

export function writeToEnvFile(
  dir: string,
  section: string,
  variable: string,
  definition: string
) {
  const envJsPath = path.resolve(dir, "src", "env.js");
  let envJsContent = fs.readFileSync(envJsPath, "utf-8");

  const sectionPattern = new RegExp(`(${section}: {)([^]*?)(})`);
  const match = envJsContent.match(sectionPattern);

  if (match) {
    const existingSection = match[0];
    const newVariable = `    ${variable}: ${definition},`;
    const updatedSection = existingSection.replace(
      /(})$/,
      `${newVariable}\n  }`
    );

    envJsContent = envJsContent.replace(sectionPattern, updatedSection);
    fs.writeFileSync(envJsPath, envJsContent, "utf-8");
    console.log(`Added ${variable} to the ${section} section in env.js`);
  } else {
    console.error(`Section ${section} not found in env.js`);
  }

  // Update .env file with structured spacing
  const envFilePath = path.resolve(dir, ".env");
  let envFileContent = fs.existsSync(envFilePath)
    ? fs.readFileSync(envFilePath, "utf-8")
    : "";

  // Check if the variable already exists in .env
  const envVariablePattern = new RegExp(`^${variable}=`, "m");
  if (!envVariablePattern.test(envFileContent)) {
    // Detect if a new section is being added based on prefixes
    const variablePrefix = variable.split("_")[0];
    const sectionPattern = new RegExp(`\n*^${variablePrefix}_`, "m");
    const needsSpacing = !sectionPattern.test(envFileContent);

    // Append with space before if it’s a new section
    const newVariableEntry = `${needsSpacing ? "\n" : ""}${variable}=\n`;
    envFileContent += newVariableEntry;

    fs.writeFileSync(envFilePath, envFileContent, "utf-8");
    console.log(`Added ${variable} with an empty value to .env`);
  } else {
    console.log(`${variable} already exists in .env`);
  }
}
