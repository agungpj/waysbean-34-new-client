import React from "react";
import { Admin, Blank, Online } from "../../exports/exportImages";

export default function Chat({
  contact,
  user,
  messages,
  sendMessage,
  dataContact,
}) {
  return (
    <>
      {contact ? (
        <>
          <div className="w-full flex items-center bg-chat-dark-grey mt-10 rounded-t-md mx-1 mr-1">
            {contact.profile?.image == null ? (
              <>
                <img
                  src={Blank}
                  alt=""
                  className="rounded-full mx-5 img-chat"
                />
              </>
            ) : (
              <>
                <img
                  src={
                    "http://localhost:5000/uploads/" + contact.profile?.image
                  }
                  className="rounded-full mx-5 img-chat"
                  alt="bubble avatar"
                />
              </>
            )}

            <div className="py-2">
              <p className="font-bold">{contact.name}</p>
              <div className="flex items-center">
                <img src={Online} alt="" />
                <p className="text-sm mx-2">Online</p>
              </div>
            </div>
          </div>
          <div
            id=""
            style={{ height: "55.7vh" }}
            className="bg-chat-grey overflow-x-hidden px-3 py-2 mb-5 ml-1 rounded-b-md"
          >
            {messages.map((item, index) => (
              <div key={index}>
                <div
                  className={`flex py-1 ${
                    item.idSender === user.id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={
                      item.idSender === user.id ? "chat-me" : "chat-other"
                    }
                  >
                    <div className="text-black">{item.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: "6vh" }} className="px-3">
            <input
              placeholder="Write your message here ..."
              className="input-message px-4"
              onKeyPress={sendMessage}
            />
          </div>
        </>
      ) : (
        <div
          style={{ height: "75vh" }}
          className="flex items-center justify-center text-white text-xl "
        >
          No Message
        </div>
      )}
    </>
  );
}
