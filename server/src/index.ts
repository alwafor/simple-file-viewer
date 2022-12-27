import { checkOrCreateFilesFolder } from "./core/files";
import { startServer } from "./core/server";

async function run() {
  const isFileFolderExists = await checkOrCreateFilesFolder();
  if (!isFileFolderExists) {
    return;
  }
  await startServer();
}

run();
