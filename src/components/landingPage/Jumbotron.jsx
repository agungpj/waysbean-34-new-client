import { Transition } from "@headlessui/react";
import React from "react";
import {
  BgBeans,
  BgBrown,
  LogoHomePage,
  Waves,
} from "../../exports/exportImages";

const Jumbotron = () => {
  return (
    <>
      <Transition
        show={true}
        enter="transition ease duration-1000"
        enterFrom="transform -translate-x-20 opacity-0"
        enterTo="transform translate-x-0 opacity-100"
      >
        <div className="mx-4 lg:mx-32 my-2 lg:mt-10 lg:mb-20 relative h-80 lg:h-full">
          <img
            src={BgBrown}
            alt="Background"
            className="opacity-0 lg:opacity-100"
          />
          <img
            src={Waves}
            alt="Background"
            className="absolute brightness-50 lg:brightness-100 lg:right-48 top-64 opacity-0 lg:opacity-100"
          />
          <img
            src={BgBeans}
            alt="Background"
            className="absolute brightness-50 lg:brightness-100 lg:right-0 top-7"
          />
          <img
            src={LogoHomePage}
            alt="Background"
            className="absolute w-20 left-20 lg:w-auto lg:left-12 top-12"
          />
          <div className="absolute text-white top-12 left-3 lg:text-black lg:top-48 lg:left-12 lg:w-1/2">
            <p className="text-2xl my-6">BEST QUALITY COFFEE BEANS</p>
            <p className="text-lg">
              Quality freshly roasted coffee made just for you.
              <br /> Pour, brew and enjoy
            </p>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Jumbotron;
