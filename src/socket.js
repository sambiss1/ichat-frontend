import socketIOClient from "socket.io-client";

// export Socket

export const connectToSocket = () => {
  const socket = socketIOClient("http://localhost:8000/");
  socket.on("http://localhost:8000/", (data) => {
    console.log(data);
  });
};

export default connectToSocket;
