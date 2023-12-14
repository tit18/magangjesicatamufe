
import React from "react";
import axios from "axios";
import Navbar from "../components/navbar_user";
import Footer from "../components/footer_user";
import { BASE_URL } from "../global";

class FormTamu extends React.Component {
  constructor() {
    super();
    let today = new Date()
    this.state = {
      photoPreview: null,
      isModalVisible: false,
      formData: {
        nama_pengunjung: "",
        no_wa_pengunjung: "",
        uuid_user: "",
        asal_instansi: "",
        nama_dituju: "",
        keperluan: "",
        jumlah_tamu: "",
        janjian: false,
        tanggal_masuk: `${today.toISOString().substring(0,10)} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`,
        foto: null,
      },
      allUsers: [], // Initialize allUsers as an empty array
    };
    this.fileInputRef = React.createRef();  
  }

  componentDidMount() {
    // Call getAllUser when the component is mounted
    this.getAllUser();
  }

  getAllUser = () => {
    // Adjust the API endpoint to your server's route
    const apiUrl = "http://103.93.130.122:4446/api/v1/halaman/user";

    axios
      .get(apiUrl, {
        auth: {
          username: "MokletHebat",
          password: "P3rtninidfr?67",
        }
      })

      .then((response) => {
        const users = response.data.data;

        // Assuming the response is an array of users
        this.setState({
          allUsers: users,
        });
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.setState({
          photoPreview: reader.result,
          formData: {
            ...this.state.formData,
            foto: file,
          },
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  handleButtonClick = () => {
    this.fileInputRef.current.click();
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "janjian") {
      // Convert value to boolean
      const janjianValue = value === "true";
  
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          [name]: janjianValue,
        },
      }));
    } else if (name === "nama_dituju") {
      const selectedUser = this.state.allUsers.find(
        (user) => user.nama === value
      );
  
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          uuid_user: selectedUser ? selectedUser.uuid : "",
          [name]: value,
        },
      }));
    } else {
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          [name]: value,
        },
      }));
    }
  };
  
  

  handleSimpan = () => {
    const apiUrl =
      "http://103.93.130.122:4446/api/v1/halaman/tamu";
    const { formData } = this.state;

    console.log("Data yang akan dikirim ke server:", formData);

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    axios
      .post(apiUrl, formDataToSend, {
        auth: {
          username: "MokletHebat",
          password: "P3rtninidfr?67",
        },
      })
      .then((response) => {
        console.log("Respons API:", response);
        this.setState({
          isModalVisible: true,
        });
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  handleCloseModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  render() {
    const { photoPreview, isModalVisible } = this.state;
    const { allUsers } = this.state;

    return (
      <div>
        <Navbar />

        <div className="form-tamu bg-white h-[560px] mt-10 mx-4 sm:mx-8 md:mx-16 lg:mx-32 px-4 py-2 md:py-8 lg:py-10 xl:py-4 overflow-y-auto flex flex-col border-2 border-gray-300 rounded-2xl">
          <h1 className="text-2xl md:text-md lg:text-md font-semibold text-center pb-4">
            Form Pengisian
          </h1>
          <div className="px-5">
            <div className="pt-2 flex flex-col md:flex-row justify-center md:gap-8 ">
              <div className="mb-4 md:mb-0 lg:w-full">
                <span className="block text-md font-medium text-slate-700">
                  Nama
                </span>
                <input
                  type="text"
                  name="nama_pengunjung"
                  value={this.state.formData.nama_pengunjung}
                  onChange={this.handleInputChange}
                  className="mt-1 w-full pl-3 pr-4 py-2 bg-white focus:border-red-300 focus:outline-none focus:ring-opacity-40 
                border-2 shadow-sm placeholder-slate-400 rounded-md text-sm"
                  placeholder="Inputkan Nama Anda"
                />
              </div>
              <div className="mb-4 md:mb-0 lg:w-full">
                <span className="block text-md font-medium text-slate-700">
                  No Telp
                </span>
                <input
                  type="text"
                  name="no_wa_pengunjung"
                  value={this.state.formData.no_wa_pengunjung}
                  onChange={this.handleInputChange}
                  className="mt-1 w-full pl-3 pr-4 py-2 bg-white focus:border-red-300 focus:outline-none focus:ring-opacity-40 
                border-2 shadow-sm placeholder-slate-400 rounded-md text-sm"
                  placeholder="Inputkan Nomor Anda"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col md:flex-row justify-center md:gap-8 ">
              <div className="mb-4 md:mb-0 lg:w-full">
                <span className="block text-md font-medium text-slate-700">
                  Asal Instansi
                </span>
                <input
                  type="text"
                  name="asal_instansi"
                  value={this.state.formData.asal_instansi}
                  onChange={this.handleInputChange}
                  className="mt-1 w-full pl-3 pr-4 py-2 bg-white focus:border-red-300 focus:outline-none focus:ring-opacity-40 
                border-2 shadow-sm placeholder-slate-400 rounded-md text-sm"
                  placeholder="Asal Instansi"
                />
              </div>
              <div className="mb-4 md:mb-0 lg:w-full">
                <span className="block text-md font-medium text-slate-700">
                  Jumlah Tamu
                </span>
                <input
                  type="text"
                  name="jumlah_tamu"
                  value={this.state.formData.jumlah_tamu}
                  onChange={this.handleInputChange}
                  className="mt-1 w-full pl-3 pr-4 py-2 bg-white focus:border-red-300 focus:outline-none focus:ring-opacity-40 
                border-2 shadow-sm placeholder-slate-400 rounded-md text-sm"
                  placeholder="Jumlah Tamu"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col md:flex-row justify-center md:gap-8 ">
              <div className=" mb-4 md:mb-0 lg:w-full">
                <span className="block text-md font-medium text-slate-700">
                  Orang yang ditemui
                </span>
                <select
                  name="nama_dituju"
                  value={this.state.formData.nama_dituju}
                  onChange={this.handleInputChange}
                  className="mt-1 w-full pl-3 pr-4 py-2 bg-white focus:border-red-300 focus:outline-none focus:ring-opacity-40 
                  border-2 shadow-sm placeholder-slate-400 rounded-md text-sm"
                >
                  <option value="" disabled hidden>
                    Pilih Orang yang ditemui
                  </option>
                  {allUsers.map((user) => (
                    <option key={user.uuid} value={user.nama}>
                      {user.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 md:mb-0 lg:w-full flex flex-col">
                <label
                  htmlFor="janjian"
                  className="block text-md font-medium text-slate-700"
                >
                  Ada janji?
                </label>
                <select
                  id="janjian"
                  name="janjian"
                  value={this.state.formData.janjian ? "true" : "false"}
                  onChange={this.handleInputChange}
                  className="mt-1 w-full md:w-auto pl-3 py-2 bg-white focus:border-red-300 focus:outline-none focus:ring-opacity-40
                  border-2 shadow-sm placeholder-slate-400 rounded-md text-sm"
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Pilih Opsi
                  </option>
                  <option value="true">Ada</option>
                  <option value="false">Tidak</option>
                </select>
              </div>
            </div>
            <div className="">
              <div className="pt-2 mb-4 md:mb-0 lg:w-full">
                <span className="block text-md font-medium text-slate-700">
                  Keperluan
                </span>
                <textarea
                  type="text"
                  name="keperluan"
                  value={this.state.formData.keperluan}
                  onChange={this.handleInputChange}
                  className="mt-1 w-full pl-3 pr-4 py-2 bg-white focus:border-red-300 focus:outline-none focus:ring-opacity-40 
              border-2 shadow-sm placeholder-slate-400 rounded-md text-sm"
                  placeholder="Keperluan"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-center">
            <div className="relative">
              <span className="block text-md font-medium text-slate-700">
                Foto
              </span>
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  border: "2px dashed #ccc",
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: "10px",
                }}
              >
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <input
                  type="file"
                  onChange={this.handlePhotoChange}
                  accept="image/*"
                  style={{
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    cursor: "pointer",
                  }}
                  ref={this.fileInputRef}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              className="bg-[#B72024] text-white p-2 w-full md:w-60 rounded-md"
              onClick={this.handleButtonClick}
            >
              Ambil Foto
            </button>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              className="bg-[#27AE60] text-white p-2 w-full md:w-60 rounded-md"
              onClick={this.handleSimpan}
            >
              Simpan
            </button>
          </div>

          {isModalVisible && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                  onClick={this.handleCloseModal}
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                {/* Modal Content */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  {/* Tombol Close */}
                  <button
                    onClick={this.handleCloseModal}
                    className="absolute top-0 right-2 m-4 text-3xl text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>

                  {/* Modal Content Goes Here */}
                  <div className="p-6">
                    <img
                      src={`${BASE_URL}/assets/succes.png`}
                      className="px-16"
                      alt="Succes"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default FormTamu;
