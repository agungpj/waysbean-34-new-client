import React from "react";
import { Admin, Blank } from "../../exports/exportImages";

export default function Contact({ dataContact, clickContact, contact }) {
  return (
    <div className="bg-chat-grey rounded-lg mt-10 pb-8 px-4">
      {dataContact.length > 0 && (
        <>
          {dataContact.map((item) => (
            <div
              key={item.id}
              className={`contact p-3 border-b-1 border-contact-line ${
                contact?.id === item?.id && "contact-active"
              }`}
              onClick={() => {
                clickContact(item);
              }}
            >
              {item.profile.image !== null ? (
                <>
                  <img
                    src={"http://localhost:5000/uploads/" + item.profile?.image}
                    className="rounded-full mr-3 img-contact"
                    alt="user avatar"
                  />
                </>
              ) : (
                <>
                  <img
                    src={Blank}
                    alt="img"
                    className="rounded-full mr-3"
                    style={{ width: "49px" }}
                  />
                </>
              )}

              <div className="ps-1 text-contact d-flex flex-column justify-content-around">
                <p className="font-semibold text-base">{item.name}</p>
                <p className="text-contact-chat mt-1 mb-0">
                  {item.message.slice(0, 25) + "..."}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
