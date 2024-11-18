import gradient from "gradient-string";

import { TITLE_TEXT } from "~/consts.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

const theme = {
  blue: "#add7ff",
  cyan: "#89ddff",
  green: "#5de4c7",
  magenta: "#fae4fc",
  red: "#d0679d",
  yellow: "#fffac2",
};

export const renderTitle = () => {
  const nameGradient = gradient(Object.values(theme));

  const pkgManager = getUserPkgManager();
  if (pkgManager === "yarn" || pkgManager === "pnpm") {
    console.log("");
  }
  console.log(nameGradient.multiline(TITLE_TEXT));
};
