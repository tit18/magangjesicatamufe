import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const user = {
    photo: localStorage.getItem("userPhoto"),
    email: localStorage.getItem("userEmail"),
  };

  const navigate = useNavigate();


  return (
    <footer className="bg-[#B72024] py-3 absolute bottom-0 inset-x-0 text-white mt-[38px]">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-[20px] italic mr-8">The real informatic schools</p>
      </div>
    </footer>
  );
}

export default Footer;
