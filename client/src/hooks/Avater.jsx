import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";

const config = genConfig({
  sex: "man",
  hairColorRandom: true,
});
const ProfileAvater = () => {
  return <Avatar className="w-9 h-9" {...config} />;
};

export default ProfileAvater;
