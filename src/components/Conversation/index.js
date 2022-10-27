/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import { useContext, useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import { BsCamera } from "react-icons/bs";
import axios from "axios";

import "./conversations.css";
import { UserContext } from "../../Context";

const Conversation = () => {
  const [message, setMessage] = useState("");

  // const [messageSend, setMessageSend] = useState("");
  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem("userID");
  const token = localStorage.getItem("token");

  const {
    contactPerson,
    discussion,
    conversationId,
    selectedConversation,
    socket,
    setDiscussion,
  } = useContext(UserContext);


  const [uploadedImage, setUploadedImage] = useState("");
  // const inputFileRef = useRef();
  
  // const cleanUpImage = () => {
  //   URL.revokeObjectURL(uploadedImage);
  //   // inputFileRef.current.value = null;
  // };
  // const setImage = (newImage) => {
  //   if (uploadedImage) {
  //     cleanUpImage();
  //   }
  //   setUploadedImage(newImage);
  // };

  // uploade image
  const handleImage = (event) => {
    setUploadedImage(event.target.files[0]); 
    console.log(uploadedImage);
   
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", uploadedImage);
    formData.append("upload_preset", "zaqnqwv4");

    console.log(formData);
    await axios({
      method: "POST",
      url: " https://api.cloudinary.com/v1_1/dhyk7zned/image/upload",
      body: formData
    }).then((response) => {
      console.log(response.data);
    })
      .catch(error => console.error(error)); 
  };


  
  const sendMessage = async (event) => {
    event.preventDefault();
    uploadImage();
    
    await axios({
      method: "POST",
      url: `http://localhost:8000/api/message/new`,
      data: {
        conversationId,
        sender: userId,
        messageText: message,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        alert("Message send : ", response.data.newMessage.messages);
        setDiscussion((prevState) => {
          return [...prevState, response.data.newMessage.messages];
        });
      })
      .catch((error) => {
        return console.error(error);
      });
    event.target.reset();

    socket.emit("send-message", { discussion });

  };

  const getAConversation = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8000/api/conversations/${conversationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (response.statusCode === 404) {
          return discussion;
        }
        setDiscussion(response.data.messages);
      })
      .catch((error) => {
        return alert(error);
      });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo(0, messagesEndRef.current.scrollHeight);
  };
  useEffect(() => {
    getAConversation();

    socket.on("receive-message", (data) => {
      setDiscussion((prevState) => {
        return [...prevState, data];
      });
    });
    scrollToBottom();
  }, [socket, discussion]);


  
  return (
    <div className="discussion__main--container">
      {selectedConversation ? (
        <div className="discussion__main--content">
          <div className="contact__person--container">
            <div className="contact__person--profile">
              <img src="/images/user.png" alt="profile pictur" />
            </div>
            <div className="contact__person--details">
              <h3>
                {contactPerson.firstName} {contactPerson.lastName}
              </h3>
              <p>Online</p>
            </div>
          </div>
          <div className="discussion__main--content">
            {!discussion ? (
              <h3>Loading messages...</h3>
            ) : (
              <div className="imessage" ref={messagesEndRef}>
                {discussion.map((content) => {
                  return content.sender === userId ? (
                    <div className="from-me" key={content._id}>
                      <p>{content.messageText}</p>
                    </div>
                  ) : (
                    <div className="from-them" key={content._id}>
                      <p>{content.messageText}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <form onSubmit={sendMessage} className="send__message--form">
            <div className="send__message--content">
              <input
                type="text"
                onChange={(event) => {
                  return setMessage(event.target.value);
                }}
                className="send__message--text"
                placeholder="Type message here"
              />
              <div className="send__message--file__container">
                <label htmlFor="uploaderImage" className="send__message--file">   
                  <BsCamera className="send__message--image" />
                 </label>
                <input
                  type="file"
                  onChange={ (event) => handleImage(event) }
                  name="img"
                  className="send__message--file"
                  id="uploaderImage"
                  accept=".jpg, .jpeg, .png, .webp"
                />
              </div>
            </div>
            <button type="submit" className="send__message--button">
              <BiSend />
            </button>
          </form>
        </div>
      ) : (
        <div className="no__selected--container">
          <div className="no__selected--content" />
        </div>
      )}
    </div>
  );
};

export default Conversation;
