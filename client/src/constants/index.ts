import {
  createCampaign,
  dashboard,
  profile,
  withdraw,
  notifications,
  chainlink,
} from "../assets";


export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/dashboard",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/campaign",
  },
  {
    name: "analyse",
    imgUrl: chainlink,
    link: "/analyse",
  },
  {
    name: "Reward",
    imgUrl: withdraw,
    link: "/reward",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile"
  },
  {
    name: "dao",
    imgUrl: withdraw,
    link: "/dao"
  }
];
