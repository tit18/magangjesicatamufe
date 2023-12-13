import React from "react";

function Navbar() {
  return (
    <nav class="navbar max-w-max md:w-auto mt-4 h-max mx-auto border-2 border-gray shadow-xl rounded-3xl bg-white flex items-center">
    <img class="w-24 h-6 mx-6 my-2" src="/assets/smktelkom.png" alt="Logo" />
    <div class="ml-4 flex text-sm">
        <a href="/form_tamu" class="tamu font-semibold focus:outline-none hover:text-red-500 ml-auto mx-6">
            <span class="ml-auto">Tamu Umum</span>
        </a>
        <a href="/form_kurir" class="tamu font-semibold focus:outline-none hover:text-red-500 mx-6">
            <span class="ml-auto">Kurir/Titip Barang</span>
        </a>
    </div>
</nav>

  );
}

export default Navbar;

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
