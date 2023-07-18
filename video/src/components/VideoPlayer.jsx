// import React, { useRef, useEffect, useState } from "react";
// const VideoBlob = () => {
//   const videoRef = useRef(null);
//   const [videoChunks, setVideoChunks] = useState([]);
// console.log(videoChunks)
//   useEffect(() => {
//     const fetchVideo = async () => {
//       const headers = { Range: "bytes=0-1024" }; // Request the first chunk
//       const response = await fetch(`http://localhost:3000/videos/sample.mp4`, { headers });
//       const reader = response.body.getReader();
//       const readChunk = async () => {
//         const { done, value } = await reader.read();
// console.log(value)
//         if (!done) {
//           setVideoChunks(prevChunks => [...prevChunks, value]);
//           readChunk();
//         }
//       };
//       readChunk();
//     };
//     fetchVideo();
//   }, []);
//   useEffect(() => {
//     if (videoChunks.length > 0 && videoRef.current) {
//       const concatenatedChunks = new Uint8Array(videoChunks.reduce((acc, chunk) => acc + chunk.length, 0));
//       let offset = 0;
//       videoChunks.forEach(chunk => {
//         concatenatedChunks.set(chunk, offset);
//         offset += chunk.length;
//       });
//       const blob = new Blob([concatenatedChunks], { type: "video/mp4" });
//       const videoURL = URL.createObjectURL(blob);
//       videoRef.current.src = videoURL;
//     }
//   }, [videoChunks]);
//   console.log(videoChunks)
//   return (
//     <video ref={videoRef} width="320" height="240" controls autoPlay>
//   {videoChunks.map((chunk, index) => (
//     <source
//       key={index}
//       src={URL.createObjectURL(new Blob([chunk], { type: "video/mp4" }))}
//       type="video/mp4"
//     />
//   ))}
//   Your browser does not support the video tag.
// </video>
//   );
// };
// export default VideoBlob;
/////////////////////////////powyżej działa na krótkim filmie, poniżej na dłuzszym tez działa
// import React, { useRef, useEffect, useState } from "react";

// const VideoBlob = () => {
//   const videoRef = useRef(null);
//   const mediaSourceRef = useRef(null);
//   const sourceBufferRef = useRef(null);
//   const [videoChunks, setVideoChunks] = useState([]);

//   useEffect(() => {
//     const fetchVideo = async () => {
//       const response = await fetch(`http://localhost:3000/videos/sample.mp4`);
//       console.log(response)
//       const reader = response.body.getReader();
//       const chunks = [];

//       const readChunk = async () => {
//         const { done, value } = await reader.read();
//         if (done) {
//           // All chunks received
//           setVideoChunks(chunks);
//           return;
//         }
//         chunks.push(value);
//         // next chunk
//         readChunk();
//       };
//       // Start reading the chunks
//       readChunk();
//     };

//     fetchVideo();
//   },[]);

//   useEffect(() => {
//     const appendVideoChunk = () => {
//       if (videoRef.current && videoChunks.length > 0) {
//         const videoBlob = new Blob(videoChunks, { type: "video/mp4" });
//         const videoURL = URL.createObjectURL(videoBlob);
//         videoRef.current.src = videoURL;
//         videoRef.current.load();
//         videoRef.current.play().catch(handlePlayError);
//       }
//     };
//     const handlePlayError = (error) => {
//       console.error("Error occurred while playing the video:", error);
//     };
//     appendVideoChunk();
//   }, [videoChunks]);
//   return (
//     <video ref={videoRef} width="320" height="240" controls autoPlay>
//       Your browser does not support the video tag.
//     </video>
//   );
// };
// export default VideoBlob;
// //////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect, useState } from "react";

// const VideoBlob = () => {
//   const videoRef = useRef(null);
//   const mediaSourceRef = useRef(null);
//   const sourceBufferRef = useRef(null);
//   const [videoChunks, setVideoChunks] = useState([]);

//   useEffect(() => {
//     const fetchVideo = async () => {
//       // const response = await fetch(`http://localhost:3000/videos`);
//       const response = await fetch(`http://192.168.128.224:8888/startvideo/?token=test&deviceid=2`);
//       console.log(response.body)
//       const reader = response.body.getReader();
//       const chunks = [];
//       const readChunk = async () => {
//         const { done, value } = await reader.read();
//         if (done) {
//           // All chunks have been received
//           setVideoChunks(chunks);
//           console.log(videoChunks)
//           return;
//         }
//         chunks.push(value);
//         // console.log(chunks)
//         // Read the next chunk
//         readChunk();
//       };

//       // Start reading the chunks
//       readChunk();
//     };

//     fetchVideo();
//   }, []);

//   useEffect(() => {
//     if (videoRef.current && videoChunks.length > 0) {
//       if (!mediaSourceRef.current) {
//         mediaSourceRef.current = new MediaSource();
//         videoRef.current.src = URL.createObjectURL(mediaSourceRef.current);
//         console.log("first")
//       }
  


// if (!sourceBufferRef.current && mediaSourceRef.current.readyState === "open") {
//   sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer("video/mp4; codecs=\"avc1.4D401E, mp4a.40.2\"");
// }

//       const appendVideoChunk = () => {
//         if (sourceBufferRef.current) {
//           const chunk = videoChunks.shift();
//           console.log(chunk)
//           if (chunk) {
//             sourceBufferRef.current.appendBuffer(chunk);
       
//           }
//         }
//       };
  
//       const handlePlayError = (error) => {
//         console.error("Error occurred while playing the video:", error);
//       };
  
//       const handleSourceOpen = () => {
//         if (mediaSourceRef.current.readyState === "open") {
//           console.log("open")
//           appendVideoChunk();
//         }
       
//       };
  
//       const handleSourceEnded = () => {
//         if (videoChunks.length === 0 && mediaSourceRef.current.readyState === "open") {
//           mediaSourceRef.current.endOfStream();
//           console.log("end")
//         }
//       };
  
//       if (sourceBufferRef.current && mediaSourceRef.current) {
//         console.log("adding")
//         sourceBufferRef.current.addEventListener("updateend", appendVideoChunk);
//         mediaSourceRef.current.addEventListener("sourceopen", handleSourceOpen);
//         mediaSourceRef.current.addEventListener("sourceended", handleSourceEnded);
//         videoRef.current.addEventListener("error", handlePlayError);
//       }
  
//       return () => {
//         console.log("removing")
//         if (sourceBufferRef.current && mediaSourceRef.current) {
//           sourceBufferRef.current.removeEventListener("updateend", appendVideoChunk);
//           mediaSourceRef.current.removeEventListener("sourceopen", handleSourceOpen);
//           mediaSourceRef.current.removeEventListener("sourceended", handleSourceEnded);
    
//           videoRef.current.removeEventListener("error", handlePlayError);
//         }
//       };
//     }
//   }, [videoChunks]);

//   return (
//     <video ref={videoRef} width="320" height="240" controls autoPlay>
//       Your browser does not support the video tag.
//     </video>
//   );
// };

// export default VideoBlob;
//////////////////////////////////Sylwester 
// import React, { useEffect, useRef } from 'react';

// function VideoBlob() {
//   const videoRef = useRef(null);

//   const fetchAB = async (url) => {
//     console.log(url);
//     const response = await fetch(url);
//     const buffer = await response.arrayBuffer();
//     console.log(buffer)
//     return buffer;
//   };


//   useEffect(() => {
//     const fetchAndAppendBuffer = async (url, sourceBuffer, index) => {
//       if (index >= 100) {
//         return; // Exit condition to stop recursion
//       }

//       const buf = await fetchAB(url);
//       sourceBuffer.addEventListener('updateend', () => {
//         // console.log(sourceBuffer.buffered);
//         // console.log(mediaSource.readyState); // ended
//       });
//       sourceBuffer.appendBuffer(buf);

    
//       await fetchAndAppendBuffer(url, sourceBuffer, index + 1); // Recursively call the function for the next iteration
//     };

//     const startVideo = async () => {
//       // const assetURL = '/videos/sample.mp4';
//       const assetURL = 'http://192.168.128.224:8888/startvideo/?token=test&deviceid=2';
//       const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

//       if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
//         const mediaSource = new MediaSource();
//         videoRef.current.src = URL.createObjectURL(mediaSource);

//         mediaSource.addEventListener('sourceopen', async () => {
//           const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
//           console.log(sourceBuffer.appendBuffer.length)
//           await fetchAndAppendBuffer(assetURL, sourceBuffer, 0);
//         });
//       } else {
//         console.error('Unsupported MIME type or codec: ', mimeCodec);
//       }
//     };

//     startVideo();
//   }, []);

//   return (
//     <div>
//       <video ref={videoRef} controls />
//     </div>
//   );
// }

// export default VideoBlob;
// //////////////////////////////
// import React, { useEffect, useRef } from 'react';

// function VideoBlob() {
//   const videoRef = useRef(null);

//   const fetchAB = async (url) => {
//     console.log(url);
//     const response = await fetch(url);
//     const buffer = await response.arrayBuffer();
//     console.log(buffer)
//     return buffer;
//   };


// useEffect(() => {
//   const appendVideoChunks = async (url, sourceBuffer, chunkCount) => {
//     if (chunkCount <= 0) {
//       return; // Exit condition to stop recursion
//     }

//     const buf = await fetchAB(url);
//     sourceBuffer.addEventListener('updateend', () => {
//       // console.log(sourceBuffer.buffered);
//     });

//     try {
//       sourceBuffer.appendBuffer(buf);
//     } catch (error) {
//       console.error('Error appending video chunk:', error);
//       return; // Exit the function if an error occurs
//     }

//     await appendVideoChunks(url, sourceBuffer, chunkCount - 1); // Recursively call the function for the next iteration
//   };

//   const startVideo = async () => {
//     const assetURL = 'http://localhost:3000/videos/sample.mp4';
//     const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

//     if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
//       const mediaSource = new MediaSource();
//       videoRef.current.src = URL.createObjectURL(mediaSource);

//       mediaSource.addEventListener('sourceopen', async () => {
//         try {
//           const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
//           await appendVideoChunks(assetURL, sourceBuffer, 100); // Append 100 video chunks
//         } catch (error) {
//           console.error('Error creating source buffer:', error);
//         }
//       });
//     } else {
//       console.error('Unsupported MIME type or codec: ', mimeCodec);
//     }
//   };

//   startVideo();
// }, []);


//   return (
//     <div>
//       <video ref={videoRef} controls />
//     </div>
//   );
// }

// export default VideoBlob;
// /////////////////////////////////////////////////////////websocket
// import React, { useRef } from 'react';

// const VideoBlob = () => {
//   const videoRef = useRef(null);
//   const wsRef = useRef(null);

//   const handleStart = () => {
//     // Connect to the WebSocket server
//     wsRef.current = new WebSocket('ws://localhost:8080');
//     console.log("start")

//     // Event listener for the WebSocket open event
//     wsRef.current.onopen = () => {
//       console.log('WebSocket connection established.');
//     };

//     // Event listener for the WebSocket close event
//     wsRef.current.onclose = () => {
//       console.log('WebSocket connection closed.');
//     };

//     // Event listener for the video "play" event
//     videoRef.current.addEventListener('play', handleVideoPlay);
//   };

//   const handleStop = () => {
//     // Close the WebSocket connection
//     wsRef.current.close();

//     // Remove the event listener for the video "play" event
//     videoRef.current.removeEventListener('play', handleVideoPlay);
//   };

//   const handleVideoPlay = () => {
//     // Create a canvas element to capture video frames
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     const captureFrame = () => {
//       if (videoRef.current.paused || videoRef.current.ended) {
//         return;
//       }

//       // Draw the current video frame on the canvas
//       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//       // Get the image data from the canvas
//       const imageData = canvas.toDataURL('image/jpeg');

//       // Send the image data as a WebSocket message to the server
//       wsRef.current.send(imageData);

//       // Capture the next video frame
//       requestAnimationFrame(captureFrame);
//     };

//     // Start capturing video frames
//     requestAnimationFrame(captureFrame);
//   };

//   return (
//     <div>
//       <video ref={videoRef} width="320" height="240" controls>
//         <source src="path/to/video.mp4" type="video/mp4" />
//       </video>
//       <button onClick={handleStart}>Start</button>
//       <button onClick={handleStop}>Stop</button>
//     </div>
//   );
// };

// export default VideoBlob;
// /////////////////////
// import React, { useEffect, useRef, useState } from 'react';

// const VideoBlob = () => {
//   const videoRef = useRef(null);
//   const assetURL = 'http://localhost:3000/videos/sample.mp4';
//   const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let mediaSource;
//     let sourceBuffer;

//     const fetchAB = async (url) => {
//       try {
//         const response = await fetch(url);
//         const buffer = await response.arrayBuffer();
//         return buffer;
//       } catch (error) {
//         throw new Error('Error fetching video: ' + error.message);
//       }
//     };

//     const initializeMediaSource = async () => {
//       try {
//         if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
//           mediaSource = new MediaSource();
//           videoRef.current.src = URL.createObjectURL(mediaSource);
//           mediaSource.addEventListener('sourceopen', handleSourceOpen);
//         } else {
//           throw new Error('Unsupported MIME type or codec: ' + mimeCodec);
//         }
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     const handleSourceOpen = async () => {
//       try {
//         sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
//         sourceBuffer.addEventListener('updateend', handleUpdateEnd);
//         await appendVideoChunks(assetURL, sourceBuffer);
//       } catch (error) {
//         setError('Error initializing source buffer: ' + error.message);
//       }
//     };

//     const appendVideoChunks = async (url, sourceBuffer) => {
//       try {
//         const buffer = await fetchAB(url);
//         sourceBuffer.appendBuffer(buffer);
//       } catch (error) {
//         setError('Error appending video chunk: ' + error.message);
//       }
//     };

//     initializeMediaSource();

//     return () => {
//       if (sourceBuffer) {
//         sourceBuffer.removeEventListener('updateend', handleUpdateEnd);
//       }
//       if (mediaSource) {
//         mediaSource.removeEventListener('sourceopen', handleSourceOpen);
//         mediaSource = null;
//       }
//     };
//   }, []);

//   const handleUpdateEnd = () => {
//     setIsLoading(false);
//     videoRef.current.play().catch((error) => {
//       setError('Error playing video: ' + error.message);
//     });
//   };

//   return (
//     <div>
//       {isLoading && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}
//       <video ref={videoRef} controls></video>
//     </div>
//   );
// };

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

// function VideoBlob() {
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
// export default VideoBlob;
// /////////////17.07
// import React, { useEffect, useRef } from "react";

// const VideoBlob = () => {
//   const videoRef = useRef(null);
//   const websocketRef = useRef(null);

//   useEffect(() => {
//     // Create a WebSocket connection
//     const socket = new WebSocket("ws://localhost:8000");

//     socket.onopen = () => {
//       console.log("Connected to server");
//     };

//     socket.onmessage = (event) => {
//       // Receive video data from the server
//       const data = event.data;
//       videoRef.current.src = URL.createObjectURL(data);
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

//   return (
//     <div>
//       <video ref={videoRef} controls autoPlay />
//     </div>
//   );
// };

// export default VideoBlob;
import React, { useEffect, useRef, useCallback } from "react";

const VideoBlob = () => {
  const videoRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);
  const websocketRef = useRef(null);
  const queueRef = useRef([]);

  const handleSourceOpen = useCallback(() => {
    sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer("video/mp4; codecs=\"avc1.4D401E, mp4a.40.2\"");
    sourceBufferRef.current.addEventListener("updateend", handleUpdateEnd);
  }, []);

  const handleUpdateEnd = useCallback(() => {
    if (queueRef.current.length > 0) {
      const blob = queueRef.current.shift();
      appendToSourceBuffer(blob);
    }
  }, []);

  const appendToSourceBuffer = useCallback((blob) => {
    if (sourceBufferRef.current) {
      const reader = new FileReader();
      reader.onload = function () {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        sourceBufferRef.current.appendBuffer(uint8Array);
      };
      reader.readAsArrayBuffer(blob);
    }
  }, []);

  useEffect(() => {
    if (!websocketRef.current) {
      const socket = new WebSocket("ws://localhost:8000");

      socket.onopen = () => {
        console.log("Connected to server");
      };

      socket.onmessage = (event) => {
        const blob = event.data;
        if (!mediaSourceRef.current) {
          mediaSourceRef.current = new MediaSource();
          videoRef.current.src = URL.createObjectURL(mediaSourceRef.current);
          console.log(videoRef.current.src);
          mediaSourceRef.current.addEventListener("sourceopen", handleSourceOpen);
        }

        if (sourceBufferRef.current && !sourceBufferRef.current.updating && queueRef.current.length === 0) {
          console.log("blob");
          appendToSourceBuffer(blob);
        } else {
          queueRef.current.push(blob);
          console.log("queue")
        }
      };

      socket.onclose = () => {
        console.log("Disconnected from server");
      };

      websocketRef.current = socket;
    }

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [handleSourceOpen, appendToSourceBuffer]);

  return (
    <div>
      <video ref={videoRef} controls autoPlay />
    </div>
  );
};

export default VideoBlob;


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
