// @ts-nocheck
import {
  ActionIcon,
  Avatar,
  Header as HeaderMantine,
  TextInput,
} from "@mantine/core";
import { Button, Input } from "@geist-ui/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ologo, thirdweb,name } from "../assets";
import { useAppState } from "../context";
import "./Header.css";
import { ConnectWallet } from "@thirdweb-dev/react";

const Header = () => {
  const navigate = useNavigate();
  const { address, connect } = useAppState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <HeaderMantine
      style={{ background: "#000", color: "#fff" }}
      height={80}
      p="md"
      px="lg"
    >
      <div className="flex items-center justify-between mx-10">
        <div className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          {/* Logo */}
          {/* <img src={name} alt="Logo" className="h-10 w-auto" /> */}
          <h2>OmniGovern DAO</h2>
        </div>

        <div className="flex items-center space-x-5 rounded-full">
          
          <Input
            labelRight="🔍"
            placeholder="Search..."
            value=""
            scale={2}
            className="text-sm" 
            onChange={(e) => {}}
          />

          <ConnectWallet />

          <Link to="/profile">
            <Avatar
              src={null}
              alt="Profile"
              radius="xl"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </Link>
        </div>
      </div>
    </HeaderMantine>
  );
};

export default Header;
