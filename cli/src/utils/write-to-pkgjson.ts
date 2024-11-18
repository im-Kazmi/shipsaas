import fs from "fs-extra";
import { PackageJson } from "type-fest";

export async function writeToPkgJson(
  path: string,
  content: Record<string, string>
) {
  const packageJsonContent = fs.readJSONSync(path) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    ...content,
  };

  fs.writeJSONSync(path, packageJsonContent, { spaces: 2 });
}
