// ///////////////////////////////only websocket,
// import React, { useEffect, useRef,useState } from "react";

// const VideoPlayer = () => {
//   const videoRef = useRef(null);

// useEffect(() => {
//   const socket = new WebSocket('ws://');

//   socket.onopen = () => {
//     socket.send("Message to send");
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

//   return (
//      <div>
//       <video ref={videoRef} controls muted />
//     </div>
//   );
// };

// export default VideoPlayer;

// /////Decoding first chunk from a string and playing it/////////////////////////////
// import React, { useEffect, useRef,useState } from "react";

// const VideoPlayer = () => {
//   const videoRef = useRef(null);

// const binaryMessage = "R2tYZm82TkNob0VCUXZlQxabTl5WjJVdWJtVjBMM0J5YjJwbFkzUnpMM2xoYld0aF"
// useEffect(() => {
//   if (videoRef.current && binaryMessage) {
//     // const base64Data = btoa(binaryMessage);

//     const binaryDatas = atob(binaryMessage);
  
//     const binaryData = atob(binaryDatas)

//     // konwertowanie bin data do Uint8Array buffer
//     const arrayBuffer = new Uint8Array(binaryData.length);
//     for (let i = 0; i < binaryData.length; i++) {
//       arrayBuffer[i] = binaryData.charCodeAt(i);
//     }

//     // utworzenie Blob z arrayBuff
//     const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });

//     // utworzenie url-a z Blob-a
//     const videoURL = URL.createObjectURL(videoBlob);

//     // src= na url
//     videoRef.current.src = videoURL;

//     // odtwórz
//     videoRef.current.play();
//   }
// }, [binaryMessage]);

//   return (
//      <div>
//       <video ref={videoRef} controls muted />
//     </div>
//   );
// };

// export default VideoPlayer;


//////////////////////with [arr] it plays first part video
// import React, { useEffect, useRef,useState } from "react";

// const VideoPlayer = () => {
//   const videoRef = useRef(null);
//   const websocketRef = useRef(null);
//   const [videoURL, setVideoURL] = useState(null);
//   const [arr, setArr] = useState(null);
//   useEffect(() => {
//     const socket = new WebSocket("ws://");

//     socket.onopen = () => {
//       socket.send("Message to send");
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

//       const arrayBuffer = new Uint8Array(binaryData.length);
//       for (let i = 0; i < binaryData.length; i++) {
//         arrayBuffer[i] = binaryData.charCodeAt(i);
//       }
//       setArr(arrayBuffer)
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
//   return (
//     <div>
//      <video ref={videoRef} controls muted />
//      <button onClick={handlePlayVideo}>Play Video</button>
//    </div>
//  );
// };

// export default VideoPlayer;