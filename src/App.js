import { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../src/assets/styles/App.css";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./contexts/userContext";
import {
  AddProduct,
  AdminDashboard,
  Cart,
  Complain,
  ComplainAdmin,
  DetailProduct,
  EditProduct,
  HomePage,
  Product,
  Profile,
  EditProfile,
  Footer,
  Struct,
} from "./exports";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (!state.isLogin) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/dashboard-admin");
      } else if (state.user.status === "customer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // console.log(payload);
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/struct/:id" element={<Struct />} />
        <Route path="/complain" element={<Complain />} />
        <Route path="/detail-product/:id" element={<DetailProduct />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        <Route path="/complain-admin" element={<ComplainAdmin />} />
        <Route path="/product" element={<Product />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
