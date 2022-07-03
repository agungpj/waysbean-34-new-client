// import hook
import React, { useState, useEffect, useContext } from "react";

//import component
import { UserContext } from "../../contexts/userContext";

// import package here
import { io } from "socket.io-client";
import { Chat, Contact, Navbar } from "../../exports";
import { API } from "../../config/api";

// variable socket initiation
let socket;

export default function ComplainAdmin() {
  const title = "Complain Admin";
  document.title = "WaysBeans | " + title;

  // code here
  const [contact, setContact] = useState(null); // data contact yang diklik
  const [contacts, setContacts] = useState([]); // data contact dari server
  const [messages, setMessages] = useState([]); // data messages

  //get data state from userContext
  const [state] = useContext(UserContext);

  const [profile, setProfile] = useState({});
  const getProfile = async () => {
    try {
      const response = await API.get("/user/" + state.user.id);
      // Store product data to useState variabel
      setProfile(response.data.data.users);

      // console.log(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
    console.log(profile.image);
  }, []);

  useEffect(() => {
    // get auth and query
    socket = io("https://rest-api-waysbeans.herokuapp.com", {
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        id: state.user.id,
      },
    });

    // running new message
    socket.on("new message", () => {
      console.log("contact : ", contact);
      socket.emit("load messages", contact?.id);
    });

    // running function
    loadContacts();
    loadMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]); // input message

  // get load contact
  const loadContacts = () => {
    socket.emit("load customer contacts");
    socket.on("customer contacts", (data) => {
      let dataContacts = data.map((item) => ({
        ...item,
        message:
          item.senderMessage.length > 0
            ? item.senderMessage[item.senderMessage.length - 1].message
            : "Click here to start message",
      }));
      setContacts(dataContacts);
      console.log(dataContacts);
    });
  };

  const onClickContact = (data) => {
    setContact(data);
    socket.emit("load messages", data.id);
  };

  // get load message
  const loadMessages = () => {
    socket.on("messages", (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        setMessages(dataMessages);
      }
      loadContacts();
    });
  };

  //send message command
  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };

      socket.emit("send message", data);
      e.target.value = "";
    }
  };

  console.log(contact);
  console.log(messages);

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <div className="basis-1/4 pl-3">
          <Contact
            dataContact={contacts}
            clickContact={onClickContact}
            contact={contact}
          />
        </div>
        <div className="basis-3/4 pl-3">
          <Chat
            contact={contact}
            messages={messages}
            user={state.user}
            dataContact={contacts}
            sendMessage={onSendMessage}
          />
        </div>
      </div>
    </>
  );
}

// // import React from "react";
// // import NavbarAdmin from "../component/navbar/navbarAdmin";
// import NavbarAll from "../component/auth/navbar";
// import imgContact from "../assets/default-user.png";
// import sendIco from "../assets/send.png";

// const ComplainAdmin = () => {
//   const title = "Complain Admin";
//   return (
//     <div className="bg-black">
//       <NavbarAll title={title} />
//       <div className="flex w-full items-end ">
//         <div className="flex justify-start items-start border-r-2 border-r-brand-grey-light h-vh80 w-full basis-1/3 cursor-pointer">
//           <img
//             src={imgContact}
//             alt=""
//             className="w-14 rounded-full ml-6 mr-2"
//           />
//           <div className="text-white mr-16">
//             <ul>
//               <li>Customer 1</li>
//               <li className="text-brand-grey-light">Hallo Admin</li>
//             </ul>
//           </div>
//         </div>
//         <div className="space-y-2 flex flex-col w-full basis-2/3">
//           <div className="flex ">
//             <img
//               src={imgContact}
//               alt="pict"
//               className="w-14 rounded-full ml-2 mr-2"
//             />
//             <div className="text-white bg-brand-dark-grey mr-40 ml-2 p-4 text-sm rounded-md rounded-bl-none self-start">
//               <div> Hallo Admin </div>
//             </div>
//           </div>
//           <div className="text-white bg-brand-grey-light ml-40 mr-2 p-4 text-sm rounded-md rounded-br-none self-end">
//             <div> Yes, is there anything I can help </div>
//           </div>
//           <div className="flex items-center">
//             <img
//               src={imgContact}
//               alt="pict"
//               className="w-14 rounded-full ml-2 mr-2"
//             />
//             <div className="text-white bg-brand-dark-grey mr-40 ml-2 p-4 text-sm rounded-md rounded-bl-none self-start">
//               <div>
//                 I want to ask Lorem ipsum dolor sit, amet consectetur
//                 adipisicing elit. Ullam officiis ut debitis nam numquam
//                 assumenda quo et dolores reprehenderit optio, qui vitae eaque?
//                 Omnis assumenda modi quos officia, sapiente totam?
//               </div>
//             </div>
//           </div>
//           <div className="p-5 flex items-center">
//             <label htmlFor="message" class="sr-only">
//               Message
//             </label>
//             <input
//               type="message"
//               id="message"
//               name="message"
//               placeholder="Send Message"
//               class="text-white bg-brand-grey-light  relative block w-full px-3 py-2 border-2 rounded-md focus:outline-none placeholder-gray-500 focus:border-zinc-400 focus:z-10 "
//             />

//             <img src={sendIco} alt="" className="w-10 ml-2 cursor-pointer" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComplainAdmin;
