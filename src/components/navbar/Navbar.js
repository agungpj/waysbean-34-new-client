import React, {
  useContext,
  useState,
  useEffect,
  Fragment,
  useRef,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  Admin,
  BeansIcon,
  Blank,
  CartIcon,
  ChatIcon,
  IconNav,
  LogoutIcon,
  ProfileImg,
  ProfilIcon,
  Transaction,
} from "../../exports/exportImages";

import CartDummy from "../../dummyDatabase/CartDummy";

import { API } from "../../config/api";
import { UserContext } from "../../contexts/userContext";

export default function Navbar() {
  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [message, setMessage] = useState(null);
  const cancelButtonRef = useRef(null);

  // console.log(state.user.id);
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/user/" + state.user.id);
      // Store product data to useState variabel
      setProfile(response.data.data.users);
      // console.log(response.data.data.users);
      // console.log(state);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      // console.log(response.data.data.users);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
    }
  };

  const [qtyCart, setQtyCart] = useState(0);
  const getProductCart = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await API.get("/cart/" + state.user.id, config);
      setQtyCart(response.data.data.length);
      console.log(response.data.data.length);
    } catch (error) {
      // console.log(error);
    }
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = form;

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const { emailLogin, passwordLogin } = formLogin;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);
      console.log(response.data);
      // setOpenRegister(false);

      if (response.data.status === "success") {
        const alert = (
          <>
            <div className="mt-2 w-full px-6 overflow-auto text-sm text-center text-green-600">
              <p>Register Success.</p>
              <p>Please Login.</p>
            </div>
          </>
        );
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        email: formLogin.email,
        password: formLogin.password,
      });

      const response = await API.post("/login", body, config);
      console.log(response.data.data.user);

      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });
      }
      setOpenLogin(false);

      // console.log(isAdmin);
      // console.log(state);
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      console.log(error);
    }
  };

  const checkAdmin = () => {
    if (state.user.status === "admin") {
      setIsAdmin(true);
    } else setIsAdmin(false);
  };

  const logout = () => {
    // console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  useEffect(() => {
    checkAdmin();
    getProfile();
    getProductCart();
    // console.log(state);
  }, [state]);

  return (
    <>
      <div>
        <nav className="z-10 px-20 py-4 w-full flex bg-brand-white bg-opacity-80 justify-between items-center shadow-xl">
          <Link to="/">
            <img src={IconNav} alt="" />
          </Link>

          <div className="space-y-2 md:space-y-0 md:space-x-3 flex items-center flex-col md:flex-row">
            {!state.isLogin ? (
              <>
                <button
                  onClick={() => setOpenLogin(!openLogin)}
                  className="text-brand-font-color px-5 md:px-7 py-1 border-2 border-brand-font-color rounded-lg hover:bg-gray-100 hover:text-brand-font-color duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setOpenRegister(!openRegister)}
                  className="text-white px-5 md:px-7 py-1 bg-brand-font-color border border-brand-font-color rounded-lg hover:bg-amber-900 hover:border-amber-900 duration-200"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {!isAdmin ? (
                  <div
                    onClick={() => {
                      navigate("/my-cart");
                    }}
                  >
                    <img
                      src={CartIcon}
                      className="mx-5 w-8 cursor-pointer"
                      alt=""
                    />
                    {qtyCart > 0 ? (
                      <div className="w-5 h-5 text-xs text-white font-bold bg-red-600 rounded-full absolute top-5 right-40 flex justify-center items-center">
                        {qtyCart}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div> </div>
                )}

                <div className="z-10">
                  <Menu>
                    <div>
                      <Menu.Button className="max-w-xs border-brand-font-color border-2 bg-brand-font-color rounded-full flex items-center text-sm focus:border-card-color">
                        <span className="sr-only">Open user menu</span>
                        {profile.image !==
                        "https://res.cloudinary.com/dgmgol0a2/image/upload/v1656680361/null" ? (
                          <>
                            <img
                              className="h-12 w-12 object-cover rounded-full"
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
                              className="h-12 w-12 rounded-full"
                              // style={{ width: "49px" }}
                            />
                          </>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 mr-10 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {!isAdmin ? (
                          <>
                            <Menu.Item>
                              <div className="flex my-3">
                                <img
                                  className="w-8 h-8 mx-3 mt-1"
                                  src={ProfilIcon}
                                  alt=""
                                />
                                <Link
                                  to="/profile"
                                  className='bg-white block px-4 py-2 text-md font-["Avenir-Black"] text-gray-700'
                                >
                                  Profile
                                </Link>
                              </div>
                            </Menu.Item>
                            <Menu.Item>
                              <div className="flex my-3">
                                <img
                                  className="w-8 h-8 mx-3 mt-1"
                                  src={ChatIcon}
                                  alt=""
                                />
                                <Link
                                  to="/complain"
                                  className='bg-white block px-4 py-2 text-md font-["Avenir-Black"] text-gray-700'
                                >
                                  Complain
                                </Link>
                              </div>
                            </Menu.Item>
                          </>
                        ) : (
                          <>
                            <Menu.Item>
                              <div className="flex my-3">
                                <img
                                  className="w-8 h-8 mx-3 mt-1"
                                  src={Transaction}
                                  alt=""
                                />
                                <Link
                                  to="/dashboard-admin"
                                  className='bg-white block px-4 py-2 text-md font-["Avenir-Black"] text-gray-700'
                                >
                                  Transaction
                                </Link>
                              </div>
                            </Menu.Item>
                            <Menu.Item>
                              <div className="flex my-3">
                                <img
                                  className="w-8 h-8 mx-3 mt-1"
                                  src={BeansIcon}
                                  alt=""
                                />
                                <Link
                                  to="/product"
                                  className='bg-white block px-4 py-2 text-md font-["Avenir-Black"] text-gray-700'
                                >
                                  Product
                                </Link>
                              </div>
                            </Menu.Item>
                            <Menu.Item>
                              <div className="flex my-3">
                                <img
                                  className="w-8 h-8 mx-3 mt-1"
                                  src={ChatIcon}
                                  alt=""
                                />
                                <Link
                                  to="/complain-admin"
                                  className='bg-white block px-4 py-2 text-md font-["Avenir-Black"] text-gray-700'
                                >
                                  Chat
                                </Link>
                              </div>
                            </Menu.Item>
                          </>
                        )}

                        <hr />
                        <Menu.Item onClick={logout}>
                          <div className="flex mt-3 my-2">
                            <img
                              className="h-8 mx-3 mt-1"
                              src={LogoutIcon}
                              alt=""
                            />
                            <div className='bg-white block px-4 py-2 font-["Avenir-Black"] text-md text-gray-700 cursor-pointer'>
                              Logout
                            </div>
                          </div>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </>
            )}
          </div>
        </nav>
        {/* Modal Register */}
        <Transition.Root show={openRegister} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={setOpenRegister}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-28 sm:align-middle w-96">
                  <div class="rounded-lg">
                    <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h1 class="text-brand-font-color text-4xl font-[Avenir-Black]">
                        Sign Up
                      </h1>
                      <p className="mt-5 w-full px-6 overflow-auto text-md text-center text-red-600">
                        {message && message}
                      </p>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-5">
                          <label htmlFor="name" class="sr-only">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                            placeholder="Name"
                            class="text-black bg-input-brown relative block w-full px-3 py-2 border-2 border-brand-font-color rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-900 focus:z-10"
                          />
                          <label htmlFor="email" class="sr-only">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                            placeholder="Email"
                            class="text-black bg-input-brown relative block w-full px-3 py-2 border-2 border-brand-font-color rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-900 focus:z-10"
                          />
                          <label htmlFor="password" class="sr-only">
                            password Address
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                            placeholder="Password"
                            class="text-black bg-input-brown relative block w-full px-3 py-2 border-2 border-brand-font-color rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-900 focus:z-10"
                          />
                        </div>
                        <button className="bg-brand-font-color text-white font-bold text-lg w-full px-3 py-1.5 rounded-md mt-8 mb-2 hover:bg-brand-red-hover ">
                          Sign Up
                        </button>
                        <div className="mt-3 mb-5 text-center">
                          <p>
                            Already have an account ? Klik
                            <button
                              className="font-bold ml-1"
                              onClick={() =>
                                setOpenLogin(!openLogin) ||
                                setOpenRegister(false)
                              }
                            >
                              Here
                            </button>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        {/* {/* Modal Login */}
        <Transition.Root show={openLogin} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={setOpenLogin}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-28 sm:align-middle w-96">
                  <div class="rounded-lg">
                    <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h1 class="text-brand-font-color text-4xl font-[Avenir-Black]">
                        Sign In
                      </h1>
                      <p className="mt-5 w-full px-6 overflow-auto text-md text-center text-red-600">
                        {message && message}
                      </p>
                      <form onSubmit={handleLogin}>
                        <div className="space-y-5">
                          <label htmlFor="email" class="sr-only">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={emailLogin}
                            onChange={handleLoginChange}
                            required
                            placeholder="Email"
                            class="text-black bg-input-brown relative block w-full px-3 py-2 border-2 border-brand-font-color rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-900 focus:z-10"
                          />
                          <label htmlFor="password" class="sr-only">
                            password Address
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={passwordLogin}
                            onChange={handleLoginChange}
                            required
                            placeholder="Password"
                            class="text-black bg-input-brown relative block w-full px-3 py-2 border-2 border-brand-font-color rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-900 focus:z-10"
                          />
                        </div>
                        <button className="bg-brand-font-color text-white font-bold text-lg w-full px-3 py-1.5 rounded-md mt-8 mb-2 hover:bg-brand-red-hover ">
                          Sign In
                        </button>
                        <div className="mt-3 mb-5 text-center">
                          <p>
                            Don't have an account ? Klik{" "}
                            <button
                              className="font-bold ml-1"
                              onClick={() =>
                                setOpenRegister(!openRegister) ||
                                setOpenLogin(false)
                              }
                            >
                              Here
                            </button>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}
