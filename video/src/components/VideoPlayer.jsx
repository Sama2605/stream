import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const websocketRef = useRef(null);
  const videoChunksRef = useRef([]);
  console.log(videoChunksRef)
  const [videoURL, setVideoURL] = useState(null);
console.log(videoURL)
  useEffect(() => {
    const socket =new WebSocket('ws://')


    socket.onopen = () => {
      socket.send("Message to send");
      console.log("Connected to server");
    };

    socket.onmessage = (event) => {
      const data = event.data;
      
      const fileReader = new FileReader();

      fileReader.onload = function(event) {

        const base64Datas = event.target.result;

        const base64Data = base64Datas.replace(/^data:application\/octet-stream;base64,/, '');
        
        const binaryDatas = atob(base64Data);

        const binaryData = atob(binaryDatas);


        const arrayBuffer = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          arrayBuffer[i] = binaryData.charCodeAt(i);
        }

        videoChunksRef.current.push(arrayBuffer);


        const combinedBuffer = new Uint8Array(videoChunksRef.current.reduce((totalLength, chunk) => totalLength + chunk.length, 0));
        let offset = 0;
        videoChunksRef.current.forEach(chunk => {
          combinedBuffer.set(chunk, offset);
          offset += chunk.length;
        });


        const videoBlob = new Blob([combinedBuffer], { type: 'video/mp4' });
        // console.log(videoBlob.type)


        const videoURL = URL.createObjectURL(videoBlob);

        setVideoURL(videoURL);
      };


      fileReader.readAsDataURL(data);
    };

    socket.onclose = () => {
      console.log("Disconnected from server");
    };

    websocketRef.current = socket;

    return () => {
      websocketRef.current.close();
    };
  }, []);

  const handlePlayVideo = () => {
    if (videoURL) {
      videoRef.current.src = videoURL;
      videoRef.current.play()
        .catch(error => {
          console.error("Error while playing video:", error);
        });
    }
  };

  return (
    <div>
      <video ref={videoRef} controls />
      <button onClick={handlePlayVideo}>Play Video</button>
    </div>
  );
};

export default VideoPlayer;
