import { Image, Navbar as NavbarMantine, NavLink } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { navlinks } from "../constants";
import { useAppState } from "../context";
import { Grid, Card } from "@geist-ui/core";
import { useState } from "react";
import { useContext } from "react";
import useButtonContext from "../context/buttonContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { disconnect } = useAppState();
  const buttonToggle = useButtonContext((state) => state.togglePage)
  const value = useButtonContext((state) => state.value)
  console.log(buttonToggle,value)

  return (
    <div
      // width={{ base: 240 }}
      // height={{base:800}}
      className="flex flex-col max-h-full border-r-2 border-gray-700 "
    >
      <div className="space-y-5 p-5 w-64 h-full mt-20">
        {navlinks.map((link) => (
          <div key={link.name} className="flex">
            <NavLink
              label={link.name}
              disabled={link.disabled}
              onClick={() => {
                buttonToggle(link.name)
                if (link.name === "logout") {
                  disconnect && disconnect();
                } else {
                  navigate(link.link);
                }
              }}
              variant="filled"
              childrenOffset={10}
              className="rounded-lg capitalize"
              icon={<Image src={link.imgUrl} />}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
