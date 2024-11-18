import path from "path";
import fs from "fs-extra";

export const ensureDirectoriesExist = (paths: string[]) => {
  paths.forEach((destinationPath) => {
    const dir = path.dirname(destinationPath);
    fs.ensureDirSync(dir, {
      mode: 0o755,
    });
    fs.chmodSync(dir, 0o755);
  });
};
