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

// /////////////websocket
const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  // Serve the video file
  if (req.url === "videos/samplef.mp4") {
    const videoPath = "./videos/samplef.mp4";
    const stat = fs.statSync(videoPath);

    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Length": stat.size,
    });

    const readStream = fs.createReadStream(videoPath);
    readStream.pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Received message:", message);
  });

  // Send video chunks to the connected client
  const videoPath = "./videos/samplef.mp4";
  const videoStream = fs.createReadStream(videoPath);
  // const chunkSize = 1024 * 1024; // 1MB chunk size

  videoStream.on("data", (chunk) => {
    ws.send(chunk, { binary: true });
    console.log("video transmition now");
    console.log(chunk);
  });

  videoStream.on("end", () => {
    ws.close();
    console.log("Video transmission completed");
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});

// ///////////przesyłą paczki ale front nie odtwarza
// const express = require("express");
// const http = require("http");
// const WebSocket = require("ws");
// const fs = require("fs");

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// // Serve static files from the "public" directory
// app.use(express.static("/videos"));

// // WebSocket connection handling
// wss.on("connection", (ws) => {
//   console.log("New client connected");

//   // Read the video file
//   const videoPath = "videos/sample.m3u8";
//   // const videoSize = fs.statSync(videoPath).size;
//   // console.log(videoSize);
//   const videoStream = fs.createReadStream(videoPath);

//   // Send video metadata to the client
//   // ws.send(JSON.stringify({ type: "metadata", size: videoSize }));

//   // Send video data to the client in chunks
//   videoStream.on("data", (chunk) => {
//     ws.send(chunk);
//     console.log(chunk);
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

// hlsServer
// const express = require("express");
// const app = express();
// const path = require("path");
// const cors = require("cors");

// const videosDirectory = path.join(__dirname, "videos");

// app.use(cors());

// // Set CORS headers for sample.m3u8 and .ts files
// app.use("/sample.m3u8", (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });

// app.use("/sample0.ts", (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });

// // Serve the HLS files
// app.use(express.static(videosDirectory));

// // Start the server
// const port = 8000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// hls?
// var http = require("http");
// var fs = require("fs");
// var url = require("url");
// var path = require("path");
// var zlib = require("zlib");

// PORT = 8000;

// http
//   .createServer(function (req, res) {
//     var uri = url.parse(req.url).pathname;

//     if (uri == "/player.html") {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(
//         "<html><head><title>HLS Player fed by node.js" + "</title></head><body>"
//       );
//       res.write(
//         '<video src="http://' +
//           req.socket.localAddress +
//           ":" +
//           PORT +
//           '/out.M3U8" controls autoplay></body></html>'
//       );
//       res.end();
//       return;
//     }

//     var filename = path.join("./", uri);
//     fs.exists(filename, function (exists) {
//       if (!exists) {
//         console.log("file not found: " + filename);
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.write("file not found: %s\n", filename);
//         res.end();
//       } else {
//         console.log("sending file: " + filename);
//         switch (path.extname(uri)) {
//           case ".M3U8":
//             fs.readFile(filename, function (err, contents) {
//               if (err) {
//                 res.writeHead(500);
//                 res.end();
//               } else if (contents) {
//                 res.writeHead(200, {
//                   "Content-Type": "application/vnd.apple.mpegurl",
//                 });
//                 var ae = req.headers["accept-encoding"];
//                 if (ae.match(/\bgzip\b/)) {
//                   zlib.gzip(contents, function (err, zip) {
//                     if (err) throw err;

//                     res.writeHead(200, { "content-encoding": "gzip" });
//                     res.end(zip);
//                   });
//                 } else {
//                   res.end(contents, "utf-8");
//                 }
//               } else {
//                 console.log("emptly playlist");
//                 res.writeHead(500);
//                 res.end();
//               }
//             });
//             break;
//           case ".ts":
//             res.writeHead(200, { "Content-Type": "video/MP2T" });
//             var stream = fs.createReadStream(filename, {
//               bufferSize: 64 * 1024,
//             });
//             stream.pipe(res);
//             break;
//           default:
//             console.log("unknown file type: " + path.extname(uri));
//             res.writeHead(500);
//             res.end();
//         }
//       }
//     });
//   })
//   .listen(PORT);
