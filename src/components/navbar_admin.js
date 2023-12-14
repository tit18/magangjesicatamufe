import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../global";

function NavbarAdmin() {
  const location = useLocation();

  return (
    <nav className="navbar w-full lg:w-[900px] mt-4 h-max mx-auto border-2 border-gray shadow-xl rounded-3xl bg-white flex items-center">
      <div className="flex w-full">
        <img
          className="w-24 h-6 ml-6 mr-5 my-2"
          src={`${BASE_URL}/assets/smktelkom.png`}
          alt="Logo"
        />
        <div className="ms-auto flex items-center pe-5 text-sm">
          <Link
            to="/historytamu"
            className={`tamu font-semibold focus:outline-none hover:text-red-500 ml-auto mx-2 ${
              location.pathname === "/historytamu" && "text-red-500"
            }`}
          >
            <span className="ml-auto">Tamu Umum</span>
          </Link>
          <Link
            to="/historykurir"
            className={`tamu font-semibold focus:outline-none hover:text-red-500 mx-2 ${
              location.pathname === "/historykurir" && "text-red-500"
            }`}
          >
            <span className="ml-auto">Kurir/Titip Barang</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdmin;

// import { useNavigate } from "react-router-dom";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome"

// const navigate = useNavigate();

// const navigateToFormTamu = () => {
//   navigate("/pages/form_tamu");
// };

// const navigateToFormKurir = () => {
//   navigate("/pages/form_kurir");
// };

// onClick={navigateToFormTamu}
// onClick={navigateToFormKurir}

// import {NavLink} from 'react-router-dom'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// function Navbar() {
//   const navigate = useNavigate();

//   const navigateToFormTamu = () => {
//     navigate("/pages/form_tamu");
//   };

//   const navigateToFormKurir = () => {
//     navigate("/pages/form_kurir");
//   };

//   return (
//     <nav className="navbar mt-4 h-14 w-[1000px] border-2 border-gray shadow-xl rounded-3xl bg-white mx-auto flex items-center">
//       <img className="w-24 h-6 mx-6 my-2" src="/assets/smktelkom.png" alt="Logo" />
//       <div className="ml-4 flex text-sm">
//         <button
//           onClick={navigateToFormTamu}
//           className="font-semibold focus:outline-none hover:text-red-500 ml-[470px] mx-6"
//         >
//           Tamu Umum
//         </button>
//         <button
//           onClick={navigateToFormKurir}
//           className="font-semibold focus:outline-none hover:text-red-500"
//         >
//           Kurir/Titip Barang
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
