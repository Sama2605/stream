// Random ints working///////////////////////////////////
// import React, { useState, useEffect } from 'react';

// const VideoBlob = () => {
//   const [currentData, setCurrentData] = useState([]);

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:8888/");

//     ws.onopen = () => {
//       console.log('Opened Connection!');
//     };

//     ws.onmessage = (event) => {
//       setCurrentData(JSON.parse(event.data));
//     };

//     ws.onclose = () => {
//       console.log('Closed Connection!');
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   console.log(currentData);

//   return (
//     <div>
//       {currentData.map((cd)=>(
//         <div>
//           <p>{cd.name}</p>
//           <p>{cd.number}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VideoBlob;

// PING_PONG////////////////////////////////////////////////
// import React, { useEffect, useRef } from 'react';

// function VideoBlob() {
//   const socketRef = useRef(null);

//   useEffect(() => {
//     // Create a WebSocket connection
//     socketRef.current = new WebSocket('ws://localhost:8000');

//     // Listen for messages from the server
//     socketRef.current.onmessage = function (event) {
//       console.log('Received: ', event.data);
//     };

//     // Clean up the WebSocket connection when the component is unmounted
//     return () => {
//       socketRef.current.close();
//     };
//   }, []);

//   const sendPing = () => {
//     if (socketRef.current.readyState === WebSocket.OPEN) {
//       // Send a ping message to the server
//       socketRef.current.send('ping');
//     }
//   };

//   return (
//     <div className="App">
//       <button onClick={sendPing}>Send Ping</button>
//     </div>
//   );
// }

// export default VideoBlob;

// App.js chunks are coming frm server but problem is here
// import React, { useEffect, useRef } from "react";

// function VideoBlob() {
//   const videoRef = useRef(null);
//   const wsRef = useRef(null);
//   const receivedChunks = useRef([]);
//   const totalBytesReceived = useRef(0);

//   useEffect(() => {
//     wsRef.current = new WebSocket("ws://localhost:8000");

//     wsRef.current.onmessage = (event) => {
//       const videoChunk = event.data;
//       receivedChunks.current.push(videoChunk);
//       totalBytesReceived.current += videoChunk.length;

//         const concatenatedChunks = new Uint8Array(totalBytesReceived.current);
//         let offset = 0;
//         for (const chunk of receivedChunks.current) {
//           concatenatedChunks.set(chunk, offset);
//           offset += chunk.length;
//         }

//         const videoBlob = new Blob([concatenatedChunks], { type: "video/mp4" });

//         const videoUrl = URL.createObjectURL(videoBlob);

//         videoRef.current.src = videoUrl;

//     };

//     return () => {
//       wsRef.current.close();
//     };
//   }, []);

//   return (
//     <div>
//       <video ref={videoRef} controls />
//     </div>
//   );
// }

// export default VideoBlob;

// //////////////////dane przychodza ale nie odtwarza video
// import React, { useEffect, useRef } from "react";

// function VideoPlayer() {
//   const videoRef = useRef(null);
//   const wsRef = useRef(null);
//   const mediaSourceRef = useRef(null);
//   const sourceBufferRef = useRef(null);
//   const bufferQueueRef = useRef([]);
//   const isAppendingRef = useRef(false);
//   const isSourceOpenRef = useRef(false);

//   useEffect(() => {
//     wsRef.current = new WebSocket("ws://localhost:8000");

//     wsRef.current.onmessage = (event) => {
//       console.log(event)
//       if (typeof event.data === "string") {
//         console.log("string")
//         const message = JSON.parse(event.data);

//         if (message.type === "metadata") {
//           console.log("metadata")
//           const mediaSource = new MediaSource();
//           videoRef.current.src = URL.createObjectURL(mediaSource);
//           mediaSourceRef.current = mediaSource;

//           mediaSource.addEventListener("sourceopen", handleSourceOpen);
//           mediaSource.addEventListener("sourceended", handleSourceEnded);
//           mediaSource.addEventListener("error", handleSourceError);
//         }
//       } else if (event.data instanceof Blob && sourceBufferRef.current) {
//         console.log("third")
//         const videoData = event.data;
//         bufferQueueRef.current.push(videoData);

//         processBufferQueue();
//       }
//     };

//     return () => {
//       wsRef.current.close();
//     };
//   }, []);

//   const handleSourceOpen = () => {
//     const mediaSource = mediaSourceRef.current;
//     const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
//     sourceBufferRef.current = sourceBuffer;
//     isSourceOpenRef.current = true;

//     sourceBuffer.addEventListener("updateend", processBufferQueue);
//   };

//   const handleSourceEnded = () => {
//     console.log("MediaSource ended");
//   };

//   const handleSourceError = (error) => {
//     console.error("MediaSource error:", error);
//   };
//   const processBufferQueue = async () => {
//     if (isSourceOpenRef.current && !isAppendingRef.current && bufferQueueRef.current.length > 0) {
//       const videoData = bufferQueueRef.current.shift();
//       isAppendingRef.current = true;

//       try {
//         const response = await fetch(URL.createObjectURL(videoData));
//         const arrayBuffer = await response.arrayBuffer();
//         sourceBufferRef.current.appendBuffer(arrayBuffer);
//       } catch (error) {
//         console.error("Error appending video data to SourceBuffer:", error);
//         isAppendingRef.current = false;
//         processBufferQueue();
//       }
//     }
//   };

//   return (
//     <div>
//       <video ref={videoRef} controls />
//     </div>
//   );
// }
// export default VideoPlayer;

// /////////////17.07 decoding works fine
// import React, { useEffect, useRef,useState } from "react";

// const VideoPlayer = () => {
//   const videoRef = useRef(null);
//   const websocketRef = useRef(null);
//   const [videoURL, setVideoURL] = useState(null);
//   const [arr, setArr] = useState(null);
///////////////////// decoding base-64
// const base64Data = "GkXfo6NChoEBQveBAULygQRC84EIQoKEd2VibeyCAABCh4EBQoWBARhTgGcQIQmHEU2bdLtNu4tTq4QVSalmU6yBQE27i1OrhBZUrmtTrIGsTbuNU6uEEU2bdFOsgyEJc027jldoWAAV55/EqAGBvHtPkGjnkYNcCuDhvnqsMBStvBVyUBCEhzqKVAIZjI8hUbFESeG2UyanrfZ7FCy43lZ+V"
// useEffect(() => {
//   if (videoRef.current && base64Data) {

//     const binaryData = atob(base64Data);

//     const arrayBuffer = new Uint8Array(binaryData.length);
//     for (let i = 0; i < binaryData.length; i++) {
//       arrayBuffer[i] = binaryData.charCodeAt(i);
//     }

//     const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });

//     const videoURL = URL.createObjectURL(videoBlob);

//     videoRef.current.src = videoURL;

//     videoRef.current.play();
//   }
// }, [base64Data]);
// ///////////////////////////////only websocket
// useEffect(() => {

//   const socket = new WebSocket("ws://localhost:8080");

//   socket.onopen = () => {
//     console.log("Connected to server");
//   };

//   socket.onmessage = (event) => {
//     const data = event.data;
//     videoRef.current.src = URL.createObjectURL(data);
//   };

//   socket.onclose = () => {
//     console.log("Disconnected from server");
//   };

//   websocketRef.current = socket;
//   console.log({ socket });

//   return () => {
//     websocketRef.current.close();
//   };
// }, []);
// //////////////////////[arr]
//   useEffect(() => {

//     const socket = new WebSocket("ws://localhost:8080");

//     socket.onopen = () => {
//       console.log("Connected to server");
//     };

//     socket.onmessage = (event) => {
//       const data = event.data;
//       const fileReader = new FileReader();

//       fileReader.onload = function(event) {
//         const base64Datas = event.target.result;

//         const base64Data = base64Datas.replace(/^data:application\/octet-stream;base64,/, '');
//         //  const base64Data = "GkXfo6NChoEBQveBAULygQRC84EIQoKEd2VJKQg"
//         console.log(base64Data);
//         const binaryData = atob(base64Data);
// console.log(binaryData)
//       const arrayBuffer = new Uint8Array(binaryData.length);
//       for (let i = 0; i < binaryData.length; i++) {
//         arrayBuffer[i] = binaryData.charCodeAt(i);
//       }
//       setArr(arrayBuffer)
//       // Create a Blob from the Uint8Array buffer
//       const videoBlob = new Blob([arrayBuffer],  {type: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'});

//       const videoURL = URL.createObjectURL(videoBlob);

//       setVideoURL(videoURL);

//       // videoRef.current.src = videoURL;

//       // videoRef.current.play();

//       };

//       fileReader.readAsDataURL(data);
//     };

//     socket.onclose = () => {
//       console.log("Disconnected from server");
//     };

//     websocketRef.current = socket;

//     return () => {

//       websocketRef.current.close();
//     };
//   }, [arr]);
//   const handlePlayVideo = () => {
//     if (videoURL) {
//       videoRef.current.src = videoURL;
//       videoRef.current.play()
//         .catch(error => {
//           console.error("Error while playing video:", error);
//         });
//     }
//   };

//   return (
//      <div>
//       <video ref={videoRef} controls />
//       <button onClick={handlePlayVideo}>Play Video</button>
//     </div>
//   );
// };

// export default VideoPlayer;

// REACTPLAYER for hls
// import ReactPlayer from 'react-player';
// import React, { useEffect, useRef } from "react";

// const VideoPlayer = () => {
//   //   const videoRef = useRef(null);
//   // const websocketRef = useRef(null);

//   //  useEffect(() => {
//   //   const socket = new WebSocket("ws://localhost:8000");

//   //   socket.onopen = () => {
//   //     console.log("Connected to server");
//   //   };

//   //   socket.onmessage = (event) => {
//   //     const data = event.data;
//   //     videoRef.current.src = URL.createObjectURL(data);
//   //   };

//   //   socket.onclose = () => {
//   //     console.log("Disconnected from server");
//   //   };

//   //   websocketRef.current = socket;
//   //   console.log({ socket });

//   //   return () => {
//   //     websocketRef.current.close();
//   //   };
//   // }, []);
//   return (
//     <ReactPlayer
//       // url='<https://www.youtube.com/watch?v=dQw4w9WgXcQ>'
//       // url='https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
//       // url='http://192.168.128.149:8888/startvideo/?token=test&deviceid=2'
//       url="http://localhost:8000"
//       controls
//       playing
//       width="100%"
//       height="auto"
//     />
//   );
// };

// export default VideoPlayer;

// działąjace odtwarzanie !!!
// import React, { useEffect, useRef, useState } from "react";

// const VideoPlayer = () => {
//   const videoRef = useRef(null);
//   const websocketRef = useRef(null);
//   const videoChunksRef = useRef([]); // To store received video chunks
//   console.log(videoChunksRef)
//   const [videoURL, setVideoURL] = useState(null);
// console.log(videoURL)
//   useEffect(() => {
//     // const socket = new WebSocket("ws://");

//     socket.onopen = () => {

//       console.log("Connected to server");
//     };

//     socket.onmessage = (event) => {
//       const data = event.data;

//       const fileReader = new FileReader();
//       fileReader.onload = function(event) {
//         const base64Datas = event.target.result;
//         const base64Data = base64Datas.replace(/^data:application\/octet-stream;base64,/, '');
//         console.log(base64Datas)
//         const binaryData = atob(base64Data);

//         const arrayBuffer = new Uint8Array(binaryData.length);
//         for (let i = 0; i < binaryData.length; i++) {
//           arrayBuffer[i] = binaryData.charCodeAt(i);
//         }

//         videoChunksRef.current.push(arrayBuffer);

//         const combinedBuffer = new Uint8Array(videoChunksRef.current.reduce((totalLength, chunk) => totalLength + chunk.length, 0));
//         let offset = 0;
//         videoChunksRef.current.forEach(chunk => {
//           combinedBuffer.set(chunk, offset);
//           offset += chunk.length;
//         });

//         const videoBlob = new Blob([combinedBuffer], { type: 'video/mp4' });
//         console.log(videoBlob.type)

//         const videoURL = URL.createObjectURL(videoBlob);

//         setVideoURL(videoURL);
//       };

//       fileReader.readAsDataURL(data);
//     };

//     socket.onclose = () => {
//       console.log("Disconnected from server");
//     };

//     websocketRef.current = socket;

//     return () => {
//       // Clean up the WebSocket connection
//       websocketRef.current.close();
//     };
//   }, []);

//   const handlePlayVideo = () => {
//     if (videoURL) {
//       videoRef.current.src = videoURL;
//       videoRef.current.play()
//         .catch(error => {
//           console.error("Error while playing video:", error);
//         });
//     }
//   };

//   return (
//     <div>
//       <video ref={videoRef} controls />
//       <button onClick={handlePlayVideo}>Play Video</button>
//     </div>
//   );
// };
