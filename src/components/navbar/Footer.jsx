import React from "react";
import { IconNav } from "../../exports/exportImages";
export default function Footer() {
  return (
    <>
      <div className=" bg-gradient-to-t from-card-color pt-6 pb-8">
        <div className="mx-auto container flex flex-col items-center justify-center">
          <div>
            <img src={IconNav} alt="" />
          </div>
          <div className="text-black flex flex-col mt-3 md:items-center">
            <div className="text-sm text-color">
              <p>
                © {new Date().getFullYear()} WaysBeans. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
