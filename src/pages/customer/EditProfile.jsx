import React, { useContext, useEffect, useState } from "react";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../../exports";
import { UserContext } from "../../contexts/userContext";
import { Blank, Peniti } from "../../exports/exportImages";

const EditProfile = () => {
  const title = "Edit Profile";
  document.title = "WaysBeans | " + title;
  const [state] = useContext(UserContext);
  let navigate = useNavigate();

  // console.log(state.user.id);

  const [preview, setPreview] = useState(null);
  // const [profile, setProfile] = useState({});
  const [form, setForm] = useState({
    image: "",
    name: "",
    email: "",
    postcode: "",
    address: "",
  });

  const getProfile = async () => {
    try {
      const config = {
        Authorization: "Basic " + localStorage.token,
      };
      console.log(config);
      const response = await API.get("/user/" + state.user.id, config);
      setPreview(response.data.data.users.image);
      setForm({
        ...form,
        name: response.data.data.users.name,
        email: response.data.data.users.email,
        postcode: response.data.data.users.postcode,
        address: response.data.data.users.address,
      });
      // console.log(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  console.log(preview);
  console.log(form);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "multipart/form-data",
        },
      };
      // console.log(formData);
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form.image[0], form.image[0].name);
      }
      formData.set("name", form.name);
      formData.set("email", form.email);
      formData.set("postcode", form.postcode);
      formData.set("address", form.address);

      const response = await API.patch("/profile", formData, config);
      console.log(response.data);
      console.log(formData);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <h1 className="text-brand-font-color text-2xl font-bold ml-32 mb-10 ">
          Edit Profile
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mx-32">
            <div className=" flex-col w-3/5">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={form?.name}
                onChange={handleChange}
                class="text-brand-font-color bg-input-brown border-brand-font-color w-full px-3 py-2 border-2 rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-800 focus:z-10"
              />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={form?.email}
                onChange={handleChange}
                class="text-brand-font-color bg-input-brown border-brand-font-color w-full my-2 px-3 py-2 border-2 rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-800 focus:z-10"
              />
              <input
                type="number"
                id="postcode"
                name="postcode"
                placeholder="Postcode"
                value={form?.postcode}
                onChange={handleChange}
                class="text-brand-font-color bg-input-brown border-brand-font-color w-full my-2 px-3 py-2 border-2 rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-800 focus:z-10"
              />
              <textarea
                name="address"
                id="address"
                placeholder="Address"
                value={form?.address}
                onChange={handleChange}
                cols="144"
                rows="2"
                class="text-brand-font-color bg-input-brown border-brand-font-color w-full my-2 px-3 py-2 border-2 rounded-md focus:outline-none placeholder-gray-500 focus:border-amber-800 focus:z-10"
              ></textarea>
              <label
                htmlFor="upload"
                className="relative cursor-pointer font-medium text-gray-500"
                placeholder="asdads"
              >
                <div
                  className="flex mr-96 border-2 border-brand-font-color bg-input-brown rounded-md justify-between items-center px-1 py-2
                        focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
                >
                  <p className="ml-2 text-sm bg-input-brown opacity-100 font-normal">
                    Select Photo
                  </p>
                  <input
                    id="upload"
                    name="image"
                    type="file"
                    className="hidden place"
                    onChange={handleChange}
                  />
                  <img className="h-5 mr-2" src={Peniti} alt="" />
                </div>
              </label>

              <button className="bg-green-600 hover:bg-green-800 my-2 w-full px-3 py-2 rounded-md text-white font-semibold">
                Save
              </button>
            </div>
            <div className="flex flex-col items-center">
              {/* <img src={imgBlank} alt="" className="w-72 rounded-md" /> */}
              {preview ===
              "https://res.cloudinary.com/dgmgol0a2/image/upload/v1656680361/null" ? (
                <div>
                  <img
                    src={Blank}
                    className="rounded-md"
                    style={{
                      maxWidth: "300px",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                    alt="preview"
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={preview}
                    className="rounded-md"
                    style={{
                      maxWidth: "300px",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                    alt="preview"
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
