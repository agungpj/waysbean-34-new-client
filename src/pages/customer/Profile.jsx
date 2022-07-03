import MyTransaction from "../../dummyDatabase/MyTransaction";
// import ProfileData from "../../dummyDatabase/ProfileData";
import { Footer, Navbar } from "../../exports";
import { Barcode, Blank, LogoHomePage } from "../../exports/exportImages";

import dateFormat from "dateformat";
import rupiahFormat from "rupiah-format";

import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { API } from "../../config/api";

const Profile = () => {
  const title = "Profile";
  document.title = "WaysBeans | " + title;

  const navigate = useNavigate();
  const [state] = useContext(UserContext);

  console.log(state.user.id);

  const [profile, setProfile] = useState({});
  const [transaction, setTransaction] = useState([]);
  // const [product, setproduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //fetch data
  const getProfile = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/user/" + state.user.id);
      // Store product data to useState variabel
      setProfile(response.data.data.users);
      console.log(response.data.data.users);
      // setTimeout(() => {
      setIsLoading(false);
      // }, 5000);
      // console.log(response.data.data.users);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getTransactions = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await API.get("/transactions", config);
      setTransaction(response.data.data);
      // setproduct(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({ status: status });
      const response = await API.patch(`/transaction/${id}`, body, config);
      navigate(`/struct/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getTransactions();
    console.log(state);
  }, [state]);
  return (
    <>
      <Navbar />
      <div className="flex mt-16">
        <div className="ml-32 basis-1/2">
          <h1 className="text-brand-font-color font-[Avenir-Black] font-bold text-2xl mb-10">
            My Profile
          </h1>
          <div className="flex items-start">
            <div className="flex flex-col items-center">
              {!isLoading ? (
                <>
                  {profile.image !==
                  "https://res.cloudinary.com/dgmgol0a2/image/upload/v1656680361/null" ? (
                    <>
                      <img
                        className="w-64 rounded-md mb-2"
                        src={profile.image}
                        // src={BlankProfile}
                        alt="profile"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={Blank}
                        alt="img"
                        className="w-64 rounded-md mb-2"
                        // style={{ width: "49px" }}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "200px",
                      display: "flex",
                      justifyContent: "center",
                      height: "200px",
                      alignItems: "center",
                    }}
                  >
                    <div class="sk-chase">
                      <div class="sk-chase-dot"></div>
                      <div class="sk-chase-dot"></div>
                      <div class="sk-chase-dot"></div>
                      <div class="sk-chase-dot"></div>
                      <div class="sk-chase-dot"></div>
                      <div class="sk-chase-dot"></div>
                    </div>
                  </div>
                </>
              )}
              <button
                onClick={() => {
                  navigate("/edit-profile");
                }}
                className="bg-brand-font-color hover:bg-amber-900 px-7 py-2 rounded-md text-white font-semibold"
              >
                Edit Profile
              </button>
            </div>
            <div className="">
              <h2 className="text-brand-font-color font-semibold text-xl ml-6 mb-1">
                Name
              </h2>
              <p className="text-black ml-6 mb-3">{profile.name}</p>
              <h2 className="text-brand-font-color font-semibold text-xl ml-6 mb-1">
                Email
              </h2>
              <p className="text-black ml-6 mb-3">{profile.email}</p>
              <h2 className="text-brand-font-color font-semibold text-xl ml-6 mb-1">
                Phone
              </h2>
              <p className="text-black ml-6 mb-3">
                {profile.phone !== null ? profile.phone : "-"}
              </p>
              <h2 className="text-brand-font-color font-semibold text-xl ml-6 mb-1">
                Postcode
              </h2>
              <p className="text-black ml-6 mb-3">
                {profile.postcode !== null ? profile.postcode : "-"}
              </p>
              <h2 className="text-brand-font-color font-semibold text-xl ml-6 mb-1">
                Address
              </h2>
              <p className="text-black ml-6 mb-3">
                {profile.address !== null ? profile.address : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <h1 className="text-brand-font-color font-[Avenir-Black] font-bold text-2xl mb-10">
            My Transaction
          </h1>
          {!isLoading ? (
            <>
              {transaction.length !== 0 ? (
                <div
                  className="overflow-x-hidden mb-5"
                  style={{ height: "60vh" }}
                >
                  <div className="space-y-3">
                    {transaction?.map((item, index) => (
                      <div
                        key={index}
                        className="bg-card-color flex items-center space-x-5 mr-20 px-5"
                      >
                        <div className="basis 1/4">
                          {item.products?.map((product, index) => (
                            <img
                              className="w-24 rounded-sm my-5"
                              src={`https://res.cloudinary.com/dgmgol0a2/image/upload/v1656680361/${product.image}`}
                              alt="product"
                            />
                          ))}
                        </div>
                        <div className="basis-2/4">
                          {item.products?.map((product, index) => (
                            <div>
                              <h1 className="text-brand-font-color font-bold text-md">
                                {product.name}
                              </h1>
                              <p className="text-brand-red text-xs">
                                {dateFormat(
                                  item.createdAt,
                                  "dddd, d mmmm yyyy"
                                )}
                              </p>
                              <p className="text-brand-red text-xs mt-1">
                                {dateFormat(item.createdAt, "HH:MM")} WIB
                              </p>
                              <p className="text-brand-font-color text-sm mt-1">
                                Price : {rupiahFormat.convert(product.price)}
                              </p>
                              <p className="text-brand-font-color text-sm mt-1">
                                Qty : {product.producttransaction.qty}
                              </p>
                              <p className="text-brand-font-color text-sm font-bold mt-1 mb-2">
                                Subtotal :
                                {rupiahFormat.convert(
                                  product.price * product.producttransaction.qty
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="basis-1/4 flex flex-col items-center space-y-2 my-5">
                          <img src={LogoHomePage} alt="homepage" />
                          <span className="text-brand-font-color text-lg font-[Avenir-Black]">
                            Total
                          </span>
                          <span className="text-brand-soft-font">
                            {rupiahFormat.convert(item.price)}
                          </span>
                          <div className="bg-brand-font-color rounded-md px-4 py-2 font-bold text-sm text-center text-white ">
                            {item.status}
                          </div>
                          {item.status == "on the way" ? (
                            <button
                              className="bg-green-500 hover:bg-green-700 rounded-md px-3 py-2 font-bold text-sm text-center text-white"
                              onClick={() => {
                                updateStatus(item.id, "success");
                              }}
                            >
                              Completed
                            </button>
                          ) : (
                            <></>
                          )}
                          {item.status == "success" ? (
                            <button
                              className="bg-green-500 hover:bg-green-700 rounded-md px-3 py-2 font-bold text-sm text-center text-white"
                              onClick={() => navigate(`/struct/${item.id}`)}
                            >
                              Struct
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-data-transaction">No transaction</div>
              )}
            </>
          ) : (
            <>
              <div
                style={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "center",
                  height: "200px",
                  alignItems: "center",
                }}
              >
                <div class="sk-chase">
                  <div class="sk-chase-dot"></div>
                  <div class="sk-chase-dot"></div>
                  <div class="sk-chase-dot"></div>
                  <div class="sk-chase-dot"></div>
                  <div class="sk-chase-dot"></div>
                  <div class="sk-chase-dot"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
