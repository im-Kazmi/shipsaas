import fs from 'fs';
import path from 'path';

async function copyRecursive(src: string, dest: string): Promise<void> {
  try {
    const stats = await fs.promises.stat(src);
    if (stats.isDirectory()) {

      await fs.promises.mkdir(dest, { recursive: true });

      const files = await fs.promises.readdir(src);
      // Copy each file/folder recursively
      for (const file of files) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        await copyRecursive(srcPath, destPath);
      }
    } else {
      // If it's a file, copy it to the destination
      await fs.promises.copyFile(src, dest);
    }
  } catch (error) {
    console.error(`Error copying from ${src} to ${dest}:`, error);
    throw error;
  }
}


export async function copyMultipleFilesAndFolders(sources: string[], destinations: string[]): Promise<void> {
  if (sources.length !== destinations.length) {
    throw new Error('Sources and destinations arrays must have the same length.');
  }

  for (let i = 0; i < sources.length; i++) {
    const src = sources[i];
    const dest = destinations[i];
    await copyRecursive(src!, dest!);
  }
}
