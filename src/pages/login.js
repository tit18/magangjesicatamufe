// import React from "react";
// import axios from 'axios';

// export default class Login extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             email: "",
//             password: "",
//             isModalOpen: false,
//             logged: false,
//         }
//     }

//     handleChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     handleLogin = (e) => {
//         e.preventDefault();
//         const data = {
//             email: this.state.email,
//             password: this.state.password
//         };

//         const url = "http://103.93.130.122:4446/api/v1/halaman/login"; // Gunakan URL API yang diberikan

//         axios.post(url, data, {
//             auth: {
//                 username: "MokletHebat",
//                 password: "P3rtninidfr?67"
//             }
//         })
//             .then(response => {
//                 console.log("Respons API:", response);
//                 console.log("Data API:", response.data);
//                 console.log("Status API:", response.status);

//                 // Handle respon dari API
//                 console.log(response.data); 
//                 this.setState({ logged: response.data.logged });

//                 if (response.data.logged === "true") {
//                     const token = response.data.token;
//                     const nama = response.data.nama;

//                     localStorage.setItem("token", token);
//                     localStorage.setItem("nama", nama);

//                     alert("Succes to Login");
//                     window.location.href = "/historytamu";
//                 } else {
//                     alert("Failed to Login");
//                 }
//             })
//             .catch(error => {
//                 // Tangani kesalahan
//                 console.error("Kesalahan Permintaan API:", error);
//                 if (error.response && (error.response.status === 500 || error.response.status === 404)) {
//                     window.alert("Failed to login");
//                 }
//             });
//     }

//     render() {
//         return (
//             <div className="dashboard1">
//                 <section>
//                     <div className="max-w-4xl mx-auto my-auto h-screen bg-white rounded-lg p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24">
//                         {/* <div className="justify-center mx-auto text-left align-bottom transition-all transform sm:align-middle w-[1000px] sm:w-full"> */}
//                             <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl border-2 border-gray-100 lg:grid-cols-2 rounded-xl">
//                                 <div className="w-full pl-6 pr-16 ">
//                                     <div>
//                                         <div className=" text-left">
//                                             <div className="text-center w-full">
//                                                 <img className="w-20 h-20 mx-44" src="/assets/ts1.svg"></img>
//                                                 <h3 className="font-semibold text-sm text-black">Buku Tamu</h3>
//                                                 <p className="font-semibold text-sm text-black">SMK Telkom Malang</p>
//                                             </div>
//                                             <div className="mt-8 flex justify-center font-bold text-xl text-black">
//                                                 <p>Welcome Back!</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <form onSubmit={this.handleLogin}>
//                                         <div className="mt-2">
//                                             <div className="flex justify-center">
//                                                 <label htmlFor="email" className="sr-only">Email</label>
//                                                 <input type="text" name="email" id="email" className="block w-full px-5 py-1 my-8 text-base placeholder-black-700 transition 
//                                                 duration-500 ease-in-out transform rounded-lg bg-white border-2 border-gray-300"
//                                                 placeholder="Email" value={this.state.email} onChange={this.handleChange} />
//                                             </div>
//                                             <div>
//                                                 <label htmlFor="password" className="sr-only">Password</label>
//                                                 <input type="password" name="password" id="password" className="block w-full px-5 py-1 text-base  placeholder-black-700 transition
//                                                 duration-500 ease-in-out transform rounded-lg bg-white border-2 border-gray-300" 
//                                                 placeholder="Password" value={this.state.password} onChange={this.handleChange} />
//                                             </div>
//                                             <div className="flex flex-col mt-4 lg:space-y-2 items-center lg:items-start">
//                                                 <button type="submit" name="login" className="flex justify-center mx-24 w-60 
//                                                 px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-[#B72024] rounded-xl 
//                                                 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Log In</button>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                                 <div className="order-first hidden w-full lg:block">
//                                     <img className="object-cover h-full bg-cover rounded-l-lg" src="../assets/ilustrasi.png" alt="" />
//                                 </div>
//                             </div>
//                         </div>
//                     {/* </div> */}
//                 </section>
//             </div>
//         );
//     }
// }


import React from "react";
import axios from 'axios';
import { BASE_URL } from "../global";

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            isModalOpen: false,
            logged: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };

        const url = "http://103.93.130.122:4446/api/v1/halaman/login"; // Gunakan URL API yang diberikan

        axios.post(url, data, {
            auth: {
                username: "MokletHebat",
                password: "P3rtninidfr?67"
            }
        })
            .then(response => {
                console.log("Respons API:", response);
                console.log("Data API:", response.data);
                console.log("Status API:", response.status);

                // Handle respon dari API
                console.log(response.data); 
                this.setState({ logged: response.data.logged });

                if (response.data.logged === "true") {
                    const token = response.data.token;
                    const nama = response.data.nama;

                    localStorage.setItem("token", token);
                    localStorage.setItem("nama", nama);

                    // alert("Succes to Login");
                    window.location.href = `${BASE_URL}/#/historytamu`;
                } else {
                    alert("Failed to Login");
                }
            })
            .catch(error => {
                // Tangani kesalahan
                console.error("Kesalahan Permintaan API:", error);
                if (error.response && (error.response.status === 500 || error.response.status === 404)) {
                    window.alert("Failed to login");
                }
            });
    }

    render() {
        return (
            <div className="dashboard1 bg-white">
                <div className="text-center">
                        <img className="block md:hidden w-20 h-20 mx-auto mb-4" src={`${BASE_URL}/assets/ts1.svg`} alt="Logo" />
                        <h3 className="block md:hidden text-xl font-semibold text-black mb-2">Buku Tamu</h3>
                        <p className="block md:hidden text-sm text-black">SMK Telkom Malang</p>
                    </div>
                <section>
                    <div className="max-w-4xl mx-auto my-auto h-screen px-4 flex items-center justify-center">
                        <div className="bg-white w-full md:w-full rounded-lg border-2 border-gray-300 shadow-md flex flex-wrap">
                        <div className="sm:w-max md:w-1/2">
                                <img className="object-cover w-full h-full md:w-auto md:h-auto bg-cover rounded-lg" src={`${BASE_URL}/assets/ilustrasi.png`} alt="" />
                            </div>
                            <div className="sm:w-max md:w-1/2 p-4">
                            <div className="text-center">
                                <img className="hidden md:block w-20 h-20 mx-auto mb-4" src={`${BASE_URL}/assets/ts1.svg`} alt="Logo" />
                                <h3 className="hidden md:block text-xl font-semibold text-black mb-2">Buku Tamu</h3>
                                <p className="hidden md:block text-sm text-black">SMK Telkom Malang</p>
                            </div>
                            <form onSubmit={this.handleLogin} className="mt-4 sm:w-auto md:w-auto">
                                <div className="mb-4">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="w-full p-2 mt-2 text-sm border border-gray-300 rounded"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="w-full p-2 mt-2 text-sm border border-gray-300 rounded"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button
                                        type="submit"
                                        name="login"
                                        className="w-full p-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-[#B72024] rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Log In
                                    </button>
                                </div>
                            </form>
                            </div>
                            </div>
                        </div>
                </section>
            </div>
        );
    }
}



