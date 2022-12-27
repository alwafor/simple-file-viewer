import http from "http";
import path from "path";
import { FILES_FOLDER_PATH, SERVER_PORT } from "./constants";
import { generateUniqueFileName, writeToFile } from "./files";

const server = http.createServer(async (req, res) => {
  res.setHeader("access-control-allow-origin", "*");

  if (req.url === "/file-upload") {
    const contentType = req.headers["content-type"];
    if (!contentType) {
      res.writeHead(400, "Content-type request header was not provided!");
      res.end();
      return;
    }

    req.setEncoding("utf-8");

    if (contentType === "text/plain") {
      const newFileName = generateUniqueFileName("text");
      const newFilePath = path.join(FILES_FOLDER_PATH, `${newFileName}.txt`);

      const writeFileResult = writeToFile(newFilePath, req);
      if (writeFileResult) {
        res.writeHead(201, "Success");
        res.end();
      } else {
        res.writeHead(500, "Some server error!");
        res.end();
      }
    } else {
      res.writeHead(400, `Content type ${contentType} is not supported!`);
      res.end();
    }
    return;
  }

  res.writeHead(404);
  res.end("This route doesn't exist!");
});

export function startServer() {
  server.listen(SERVER_PORT, () =>
    console.log(`server is running on ${SERVER_PORT}`)
  );
}
