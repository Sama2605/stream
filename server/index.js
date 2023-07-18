// const express = require("express");
// const app = express();
// const fs = require("fs");
// // console.log("first");
// const videoFileMap = {
//   video: "videos/video.mp4",
//   videoMovie: "videos/sample.mp4",
// };
// //dla VideoBlob
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   next();
// });
// app.get("/videos/:filename", (req, res) => {
//   // kod obsługi żądania
//   const fileName = req.params.filename;
//   const filePath = videoFileMap[fileName];
//   if (!filePath) {
//     return res.status(404).send("File not found");
//   }
//   const stat = fs.statSync(filePath);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     let chunksize = end - start + 1;
//     if (chunksize > 20 * 1024) {
//       chunksize = 20 * 1024;
//       console.log(chunksize);
//     }
//     const file = fs.createReadStream(filePath, { start, end });
//     const head = {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunksize,
//       //dla Blob
//       "Content-Type": "video/mp4v-es",
//       // "Content-Type": "video/mp4",
//     };
//     res.writeHead(206, head);
//     return file.pipe(res);
//   } else {
//     const head = {
//       "Content-Length": fileSize,
//       "Content-Type": "video/mp4v-es",
//       // "Content-Type": "video/mp4",
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(filePath).pipe(res);
//   }
//   // res.send("strona serwera wideo!");
// });
// app.listen(3000, () => {
//   console.log("Serwer działa na porcie 3000");
// });
// ///////////
// const express = require("express");
// const fs = require("fs");
// const app = express();
// const videoPath = "./path/to/video.mp4";
// const chunkSize = 20 * 1024; // 20KB
// app.get("/video", (req, res) => {
//   const videoSize = fs.statSync(videoPath).size;
//   const range = req.headers.range;
//   if (range) {
//     const [start, end] = range.replace(/bytes=/, "").split("-");
//     const startByte = parseInt(start, 10);
//     const endByte = Math.min(startByte + chunkSize, videoSize - 1);
//     const chunkLength = endByte - startByte + 1;
//     const headers = {
//       "Content-Range": `bytes ${startByte}-${endByte}/${videoSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunkLength,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(206, headers);
//     const videoStream = fs.createReadStream(videoPath, {
//       start: startByte,
//       end: endByte,
//     });
//     videoStream.pipe(res);
//   } else {
//     const headers = {
//       "Content-Length": videoSize,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(200, headers);
//     const videoStream = fs.createReadStream(videoPath);
//     videoStream.pipe(res);
//   }
// });
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
///////////////////////////////////////////
// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const app = express();
// app.use(express.static(path.join(__dirname, "Components")));
// // app.get("/", function (req, res) {
// //   res.sendFile(path.join(__dirname + "/Video.htm"));
// // });
// app.get("/video", function (req, res) {
//   const path = "videos/sample.mp4";
//   const stat = fs.statSync(path);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     if (start >= fileSize) {
//       res
//         .status(416)
//         .send("Requested range not satisfiable\n" + start + " >= " + fileSize);
//       return;
//     }
//     let chunksize = end - start + 1;
//     const file = fs.createReadStream(path, { start, end });
//     const head = {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunksize,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(206, head);
//     file.pipe(res);
//   } else {
//     const head = {
//       "Content-Length": fileSize,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(path).pipe(res);
//   }
// });
// app.listen(3000, function () {
//   console.log("Listening on port 3000!");
// });
// ////////////////////////
// const express = require("express");
// const fs = require("fs");
// const app = express();
// const videoFileMap = {
//   video: "videos/video.mp4",
//   videoMovie: "videos/sample.mp4",
// };
// //dla VideoBlob
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   next();
// });
// app.get("/videos/:filename", (req, res) => {
// const fileName = req.params.filename;
//   const filePath = videoFileMap[fileName];
//   if (!filePath) {
//     return res.status(404).send("File not found");
//   }
//   const stat = fs.statSync(filePath);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunksize = end - start + 1;
//     const file = fs.createReadStream(filePath, { start, end });
//     const head = {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunksize,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(206, head);
//     file.pipe(res);
//   } else {
//     const head = {
//       "Content-Length": fileSize,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(filePath).pipe(res);
//   }
// });
// app.listen(3000, () => {
//   console.log("server is listening on post 3000");
// });
// /////
// const express = require("express");
// const fs = require("fs");
// const app = express();
// const videoFileMap = {
//   video: "videos/video.mp4",
//   videoMovie: "videos/sample.mp4",
// };
// //dla VideoBlob
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   next();
// });
// app.get("/videos/:filename", function (req, res) {
//   const fileName = req.params.filename;
//   const path = videoFileMap[fileName];
//   // const path = "videos/video.mp4";
//   const stat = fs.statSync(path);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunksize = end - start + 1;
//     // const chunksize = 20 * 1024; // 20KB
//     const file = fs.createReadStream(path, { start, end });
//     const head = {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunksize,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(206, head);
//     file.pipe(res);
//   } else {
//     const head = {
//       "Content-Length": fileSize,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(path).pipe(res);
//   }
// });
// app.listen(3000, () => {
//   console.log("server is listening on post 3000");
// });
// ///////////////////
// const express = require("express");
// const fs = require("fs");
// const app = express();
// const videoFileMap = {
//   video: "videos/video.mp4",
//   videoMovie: "videos/sample.mp4",
// };
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   next();
// });
// app.get("/videos/:filename", function (req, res) {
//   const fileName = req.params.filename;
//   const path = videoFileMap[fileName];
//   const stat = fs.statSync(path);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunksize = end - start + 1;
//     const maxChunkSize = 20 * 1024; // Maximum chunk size of 20KB
//     const chunks = Math.ceil(chunksize / maxChunkSize); // Calculate the total number of chunks
//     let currentChunk = 0;
//     const stream = fs.createReadStream(path, { start, end });
//     stream.on("data", function (chunk) {
//       currentChunk++;
//       res.write(chunk);
//       if (currentChunk >= chunks) {
//         res.end();
//       }
//     });
//     stream.on("error", function (err) {
//       console.log("Error reading video stream:", err);
//       res.sendStatus(500);
//     });
//   } else {
//     const head = {
//       "Content-Length": fileSize,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(path).pipe(res);
//   }
// });
// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });
// /////////////////////////////////////////////////////////
// const express = require("express");
// const fs = require("fs");
// const app = express();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   next();
// });

// app.get("/test", function (req, res) {
//   res.send({ test: 123 });
// });

// app.get("/videos", function (req, res) {
//   const path = "./videos/sample.mp4";
//   const stat = fs.statSync(path);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   // res.send({ path, fileSize });
//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunksize = end - start + 1;
//     const maxChunkSize = 20 * 1024; // Maximum chunk size of 20KB
//     const chunks = Math.ceil(chunksize / maxChunkSize); // Calculate the total number of chunks
//     let currentChunk = 0;
//     console.log(currentChunk);

//     res.writeHead(206, {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunksize,
//       "Content-Type": "video/mp4",
//     });

//     const stream = fs.createReadStream(path, { start, end });
//     stream.on("data", function (chunk) {
//       currentChunk++;
//       res.write(chunk);
//       if (currentChunk >= chunks) {
//         res.end();
//       }
//     });

//     stream.on("error", function (err) {
//       console.log("Error reading video stream:", err);
//       res.sendStatus(500);
//     });
//   } else {
//     const head = {
//       "Content-Length": fileSize,
//       "Content-Type": "video/mp4",
//     };

//     res.writeHead(200, head);
//     fs.createReadStream(path).pipe(res);
//   }
// });

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

// /////////////websocket
// const http = require("http");
// const fs = require("fs");
// const WebSocket = require("ws");

// const server = http.createServer((req, res) => {
//   // Serve the video file
//   if (req.url === "videos/sample.mp4") {
//     const videoPath = "./videos/sample.mp4";
//     const stat = fs.statSync(videoPath);

//     res.writeHead(200, {
//       "Content-Type": "video/mp4",
//       "Content-Length": stat.size,
//     });

//     const readStream = fs.createReadStream(videoPath);
//     readStream.pipe(res);
//   } else {
//     res.writeHead(404);
//     res.end();
//   }
// });

// const wss = new WebSocket.Server({ server });

// wss.on("connection", (ws) => {
//   ws.on("message", (message) => {
//     console.log("Received message:", message);
//   });

//   // Send video chunks to the connected client
//   const videoPath = "./videos/sample.mp4";
//   const videoStream = fs.createReadStream(videoPath);
//   const chunkSize = 1024 * 1024; // 1MB chunk size

//   videoStream.on("data", (chunk) => {
//     ws.send(chunk, { binary: true });
//     console.log("video transmition now");
//   });

//   videoStream.on("end", () => {
//     ws.close();
//     console.log("Video transmission completed");
//   });
// });

// server.listen(8080, () => {
//   console.log("Server listening on port 8080");
// });

// server.js working server.
// const express = require("express");
// const http = require("http");
// const WebSocket = require("ws");
// const fs = require("fs");

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// // Serve static files from the "public" directory
// app.use(express.static("videos"));

// // WebSocket connection handling
// wss.on("connection", (ws) => {
//   console.log("New client connected");

//   // Read the video file
//   const videoStream = fs.createReadStream("videos/sampleb.mp4");

//   // Send the video data to the client in chunks
//   videoStream.on("data", (chunk) => {
//     ws.send(chunk);
//     console.log(chunk);
//   });

//   // When the video stream ends, close the WebSocket connection
//   videoStream.on("end", () => {
//     ws.close();
//     console.log("end");
//   });

//   videoStream.on("error", (error) => {
//     console.error("Video stream error:", error);
//   });

//   // Handle WebSocket connection close
//   ws.on("close", () => {
//     console.log("Client disconnected");
//     videoStream.destroy();
//   });
// });

// // Start the server
// server.listen(8000, () => {
//   console.log("Server started on port 8000");
// });
// ///////////przesyłą paczki ale front nie odtwarza
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the "public" directory
app.use(express.static("/videos"));

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Read the video file
  const videoPath = "videos/sample.mp4";
  // const videoSize = fs.statSync(videoPath).size;
  // console.log(videoSize);
  const videoStream = fs.createReadStream(videoPath);

  // Send video metadata to the client
  // ws.send(JSON.stringify({ type: "metadata", size: videoSize }));

  // Send video data to the client in chunks
  videoStream.on("data", (chunk) => {
    ws.send(chunk);
    console.log(chunk);
  });

  // Handle WebSocket connection close
  ws.on("close", () => {
    console.log("Client disconnected");
    videoStream.destroy();
  });
});

// Start the server
server.listen(8000, () => {
  console.log("Server started on port 8000");
});

// PING_PONG
// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 8000 });

// wss.on("connection", function connection(ws) {
//   ws.on("message", function incoming(message) {
//     console.log("Received: %s", message);
//     // Respond with a pong
//     ws.send("pong");
//   });

//   ws.send("Connected to the server.");
// });

// random intsworking//////////////////////////////
// const express = require("express");
// const http = require("http");
// const WebSocket = require("ws");

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// wss.on("connection", (ws) => {
//   const interval = setInterval(() => {
//     const data = [
//       {
//         name: "Random Int 1",
//         number: getRandomInt(0, 1000),
//       },
//       {
//         name: "Random Int 2",
//         number: getRandomInt(1001, 2000),
//       },
//       {
//         name: "Random Int 3",
//         number: getRandomInt(2001, 3000),
//       },
//     ];
//     ws.send(JSON.stringify(data));
//   }, 1000);

//   ws.on("close", () => {
//     clearInterval(interval);
//   });
// });

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// server.listen(8888, () => {
//   console.log("Server started on port 8888");
// });
