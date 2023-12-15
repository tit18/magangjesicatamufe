// // App.js
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// import Login from "./pages/login";
// import FormTamu from "./pages/form_tamu";
// import FormKurir from "./pages/form_kurir";
// import Historytamu from "./pages/historytamu";
// import Historykurir from "./pages/historykurir";


// function App() {
//   const isAuthenticated = !!localStorage.getItem("token");


//   return (
//     <BrowserRouter>
//         <Routes>
//             <Route path="" element={<Login />} exact></Route>
//             <Route path="/form_tamu" element={<FormTamu />}></Route>
//             <Route path="/form_kurir" element={<FormKurir />}></Route>
//             <Route path="/historytamu" element={<Historytamu/>}></Route>
//             <Route path="/historykurir" element={<Historykurir/>}></Route>
//         </Routes>
//     </BrowserRouter>
//   );
// }

// library.add(faCoffee);
// export default App;



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

// import Login from "./pages/login";
// import FormTamu from "./pages/form_tamu";
// import FormKurir from "./pages/form_kurir";
// import Historytamu from "./pages/historytamu";
// import Historykurir from "./pages/historykurir";
// import NotFound from "./pages/Notfound";

// function App() {
//   if (sessionStorage.getItem('logged') !== "true") {
//     return (
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path='*' element={<NotFound />} />
//         </Routes>
//       </Router>
//     );
//   } else if (sessionStorage.getItem('nama') !== "" && sessionStorage.getItem('token') !== "") {
//     return (
//       <Router>
//         <Routes>
//         <Route path="/form_tamu" element={<FormTamu />} />
//           <Route path="/form_kurir" element={<FormKurir />} />
//           <Route path="/historytamu" element={<Historytamu />} />
//           <Route path="/historykurir" element={<Historykurir />} />
//         </Routes>
//       </Router>
//     );
//   }
// }

// library.add(faCoffee);
// export default App;


import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import Login from "./pages/login";
import FormTamu from "./pages/form_tamu";
import FormKurir from "./pages/form_kurir";
import Historytamu from "./pages/historytamu";
import Historykurir from "./pages/historykurir";
import NotFound from "./pages/Notfound";

function App() {
  if (localStorage.getItem('token') && localStorage.getItem('token') !== "") {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/historytamu" element={<Historytamu />} />
          <Route path="/historykurir" element={<Historykurir />} />
          <Route path="/form_tamu" element={<FormTamu />} />
          <Route path="/form_kurir" element={<FormKurir />} />
        </Routes>
      </Router>

    );
  } else {
    return (
      <Router>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/form_tamu" element={<FormTamu />} />
          <Route path="/form_kurir" element={<FormKurir />} />
{/*<Route path='*' element={<NotFound />} />*/}
        </Routes>
      </Router>
    );
  }
}

library.add(faCoffee);
export default App;
