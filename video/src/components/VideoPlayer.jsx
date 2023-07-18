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

//       // Check if all chunks are received (e.g., by comparing total received bytes with expected size)
//       // If all chunks are received, proceed to create and play the video

    
//         const concatenatedChunks = new Uint8Array(totalBytesReceived.current);
//         let offset = 0;
//         for (const chunk of receivedChunks.current) {
//           concatenatedChunks.set(chunk, offset);
//           offset += chunk.length;
//         }

//         // Create a Blob from the concatenated chunks
//         const videoBlob = new Blob([concatenatedChunks], { type: "video/mp4" });

//         // Create a Blob URL
//         const videoUrl = URL.createObjectURL(videoBlob);

//         // Set the video element's src attribute to the Blob URL
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
import React, { useEffect, useRef } from "react";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const websocketRef = useRef(null);

  // const base64Data = "GkXfo6NChoEBQveBAULygQRC84EIQoKEd2VibeyCAABCh4EBQoWBARhTgGcQIQmHEU2bdLtNu4tTq4QVSalmU6yBQE27i1OrhBZUrmtTrIGsTbuNU6uEEU2bdFOsgyEJc027jFOrhBxTu2tTrIINQRVJqWbnc6SQRsadRaGFqSlNPQovdQBWvSrXsYMPQkBEiYRG/cAARGGIBBu7mlIesABNgKVodHRwOi8vc291cmNlZm9yZ2UubmV0L3Byb2plY3RzL3lhbWthV0GQU29yZW5zb24gU3F1ZWV6ZRZUrmtMj66414EBc8WHiBmgyaYxwoOBASPjg4QCYloAIzFPhD...
  // useEffect(() => {
  //   if (videoRef.current && base64Data) {
  //     // Decode the base64 data
  //     const binaryData = atob(base64Data);

  //     // Convert the binary data to a Uint8Array buffer
  //     const arrayBuffer = new Uint8Array(binaryData.length);
  //     for (let i = 0; i < binaryData.length; i++) {
  //       arrayBuffer[i] = binaryData.charCodeAt(i);
  //     }

  //     // Create a Blob from the Uint8Array buffer
  //     const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });

  //     // Create an object URL from the Blob
  //     const videoURL = URL.createObjectURL(videoBlob);

  //     // Set the video source to the object URL
  //     videoRef.current.src = videoURL;

  //     // Play the video
  //     videoRef.current.play();
  //   }
  // }, [base64Data]);

  useEffect(() => {
    // Create a WebSocket connection
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      console.log("Connected to server");
    };

    socket.onmessage = (event) => {
      // Receive video data from the server
      const data = event.data;
      videoRef.current.src = URL.createObjectURL(data);
    };

    socket.onclose = () => {
      console.log("Disconnected from server");
    };

    websocketRef.current = socket;

    return () => {
      // Clean up the WebSocket connection
      websocketRef.current.close();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} controls autoPlay />
    </div>
  );
};

export default VideoPlayer;


// import React, { useEffect, useRef } from 'react';

// const VideoPlayer = () => {
//   const videoRef = useRef(null);
//   const websocketRef = useRef(null);

//   // useEffect(() => {
//   //   if (websocketRef.current) {
//   //     console.log(websocketRef.current)
//   //     websocketRef.current.onmessage = (event) => {
//   //       // Receive base64-encoded video data from the server
//   //       const base64Data = event.data;
//   //       console.log(base64Data, event)


//   //       // Decode the base64 data
//   //       const binaryData = atob(base64Data);

//   //       // Convert the binary data to a Uint8Array buffer
//   //       const arrayBuffer = new Uint8Array(binaryData.length);
//   //       for (let i = 0; i < binaryData.length; i++) {
//   //         arrayBuffer[i] = binaryData.charCodeAt(i);
//   //       }

//   //       // Create a Blob from the Uint8Array buffer
//   //       const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });

//   //       // Create an object URL from the Blob
//   //       const videoURL = URL.createObjectURL(videoBlob);

//   //       // Set the video source to the object URL
//   //       videoRef.current.src = videoURL;

//   //       // Play the video
//   //       videoRef.current.play();
//   //     };
//   //   }
//   // }, []);

//   // websocketRef.current.onmessage = (event) => {
//   //   const base64DataBlob = event.data;
  
//   //   // Convert the Blob to a FileReader to read its content as text (base64 string)
//   //   const reader = new FileReader();
  
//   //   reader.onloadend = () => {
//   //     const base64Data = reader.result;
//   //     console.log(base64Data); // Output the received base64 data
  
//   //     // Decode the base64 data
//   //     const binaryData = atob(base64Data);
  
//   //     // Convert the binary data to a Uint8Array buffer
//   //     const arrayBuffer = new Uint8Array(binaryData.length);
//   //     for (let i = 0; i < binaryData.length; i++) {
//   //       arrayBuffer[i] = binaryData.charCodeAt(i);
//   //     }
  
//   //     // Create a Blob from the Uint8Array buffer
//   //     const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });
  
//   //     // Create an object URL from the Blob
//   //     const videoURL = URL.createObjectURL(videoBlob);
  
//   //     // Set the video source to the object URL
//   //     videoRef.current.src = videoURL;
  
//   //     // Play the video
//   //     videoRef.current.play();
//   //   };
  
//   //   reader.readAsText(base64DataBlob);
//   // };
  

//   useEffect(() => {
//     // Create a WebSocket connection
//     const socket = new WebSocket('ws://localhost:8000');

//     socket.onopen = () => {
//       console.log('Connected to server');
//     };
    
//     // socket.onmessage = (event) => {
//     //   // Receive base64-encoded video data from the server
//     //   const base64DataBlob = event.data;
//     //   console.log(base64DataBlob); // Output the received base64 data
//     //   const reader = new FileReader();

//     //     reader.onloadend = () => {
//     //   const base64Data = reader.result;
//     //   // Decode the base64 data and handle video
//     //   const binaryData = atob(base64Data);
//     //        // Convert the binary data to a Uint8Array buffer
//     //   const arrayBuffer = new Uint8Array(binaryData.length);
//     //   for (let i = 0; i < binaryData.length; i++) {
//     //     arrayBuffer[i] = binaryData.charCodeAt(i);
//     //   }
//     //       // Create a Blob from the Uint8Array buffer
//     //   const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });
//     //         // Create an object URL from the Blob
//     //   const videoURL = URL.createObjectURL(videoBlob);
  
//     //   // Set the video source to the object URL
//     //   videoRef.current.src = videoURL;
  
//     //   // Play the video
//     //   videoRef.current.play();
//     // }
//     //   reader.readAsText(base64DataBlob);
//     //   // (the rest of your video handling logic)
//     // };
//     socket.onmessage = (event) => {
//   const arrayBuffer = event.data;

//   // Create a Blob from the ArrayBuffer
//   const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });

//   // Create an object URL from the Blob
//   const videoURL = URL.createObjectURL(videoBlob);

//   // Set the video source to the object URL
//   videoRef.current.src = videoURL;

//   // Play the video
//   videoRef.current.play();
// };


    
//     socket.onclose = () => {
//       console.log('Disconnected from server');
//     };

//     websocketRef.current = socket;

//     return () => {
//       // Clean up the WebSocket connection
//       websocketRef.current.close();
//     };
//   }, []);

//   return (
//     <div>
//       <video ref={videoRef} controls autoPlay />
//     </div>
//   );
// };

// export default VideoPlayer;









