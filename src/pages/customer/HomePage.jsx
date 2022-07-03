import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

import { Footer, Jumbotron, Navbar, ProductSell } from "../../exports";

const HomePage = () => {
  const title = "Homepage";
  document.title = "WaysBeans | " + title;

  const [state, dispatch] = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <Jumbotron />
      {!state.isLogin ? (
        <></>
      ) : (
        <>
          <ProductSell />
        </>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
