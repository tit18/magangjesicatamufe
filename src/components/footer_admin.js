
// import React from "react";
// import "../App.css";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

// function Footer() {
//   const user = {
//     // Anda dapat mengganti ini dengan cara sesuai bagaimana informasi pengguna disimpan
//     photo: localStorage.getItem("userPhoto"),
//     email: localStorage.getItem("userEmail"),
//   };
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <footer class="bg-[#B72024] py-3 absolute bottom-0 inset-x-0 text-white mt-[38px]">
//       <div className="container mx-auto flex items-center justify-between">
//         {/* Menampilkan foto profil */}
//         {user.photo && (
//           <img
//             src={user.photo}
//             alt="Profile"
//             className="w-8 h-8 rounded-full mr-2"
//           />
//         )}
//         {/* Menampilkan email pengguna */}
//         {user.email && (
//           <div className="flex items-center">
//             <p className="text-[20px] italic mr-2">{user.email}</p>
//             <FontAwesomeIcon icon={faPowerOff} size="lg" onClick={handleLogout} />
//           </div>
//         )}
//       </div>
//       <div class="container mx-auto flex justify-between items-center">
//         <ul class="flex">
//           <li class="my-px" onClick={handleLogout}>
//             <a href="/" class="">
//               <FontAwesomeIcon icon={faPowerOff} size="lg ml-6" />
//               <span class="ml-2" onClick={() => this.logOut()}>
//                 Logout
//               </span>
//             </a>
//           </li>
//         </ul>
//         <p class="text-[20px] italic mr-8">The real informatic schools</p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;



import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../global";

function FooterAdmin() {
  const user = {
    photo: localStorage.getItem("userPhoto"),
    email: localStorage.getItem("userEmail"),
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // navigate("/magangjesicatamufe/build/");
    // window.location.reload();
    window.location.href = `${BASE_URL}/`;
  };

  return (
    <footer className="bg-[#B72024] py-3 absolute bottom-0 inset-x-0 text-white mt-[38px]">
      <div className="container mx-auto flex items-center justify-between">
        {user.photo && (
          <img
            src={user.photo}
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        {user.email && (
          <div className="flex items-center">
            <p className="text-[20px] italic mr-2">{user.email}</p>
            <FontAwesomeIcon icon={faPowerOff} size="lg" onClick={handleLogout} />
          </div>
        )}
      </div>
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex">
          <li className="my-px" onClick={handleLogout}>
              <FontAwesomeIcon icon={faPowerOff} size="lg ml-6" />
              <span className="ml-2">Logout</span>
          </li>
        </ul>
        <p className="text-[20px] italic mr-8">The real informatic schools</p>
      </div>
    </footer>
  );
}

export default FooterAdmin;
