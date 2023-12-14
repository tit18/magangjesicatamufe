
import React from "react";
import axios from "axios";
import Navbar from "../components/navbar_user";
import Footer from "../components/footer_user";
import { BASE_URL } from "../global";

class FormKurir extends React.Component {
  constructor() {
    super();
    let today = new Date()
    this.state = {
      photoPreview: null,
      isModalVisible: false,
      formData: {
        uuid_user: "",
        nama_kurir: "",
        no_wa_kurir: "",
        nama_penerima: "",
        tanggal_datang: `${today.toISOString().substring(0,10)} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`,
        status: "false",
      },
      allUsers: [], // Initialize allUsers as an empty array
    };
    this.fileInputRef = React.createRef(); // Tambahkan ini jika hendak menggunakan fileInputRef
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
            foto: file, // Simpan objek File alih-alih "BLOB"
          },
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  handleButtonClick = () => {
    // Select file input when the button is clicked
    this.fileInputRef.current.click();
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "nama_penerima") {
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
    // Consum API to save data
    const apiUrl = "http://103.93.130.122:4446/api/v1/halaman/kurir "; // Ganti dengan endpoint yang sesuai
    const { formData } = this.state;

    // Tambahkan log untuk melihat nilai formData sebelum mengirim ke server
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
        // Handle the response as needed
        this.setState({
          isModalVisible: true,
        });
      })
      .catch((error) => {
        console.error("API Error:", error);
        // Handle errors
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

        <div className="form-tamu bg-white h-[550px] px-4 py-6 mt-10 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-32 overflow-y-auto flex flex-col border-2 border-gray-300 rounded-2xl">
          <h1 className="text-[20px] font-semibold text-center pb-4">
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
                  name="nama_kurir"
                  value={this.state.formData.nama_kurir}
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
                  name="no_wa_kurir"
                  value={this.state.formData.no_wa_}
                  onChange={this.handleInputChange}
                  className="mt-1 w-full pl-3 pr-4 py-2 bg-white focus:border-red-300 focus:outline-none focus:ring-opacity-40 
                border-2 shadow-sm placeholder-slate-400 rounded-md text-sm"
                  placeholder="Inputkan Nomor Anda"
                />
              </div>
            </div>

            <div className="mb-4 md:mb-0 lg:w-full">
                <span className="block text-md font-medium text-slate-700">
                  Nama Penerima Paket
                </span>
                <select
                  name="nama_penerima"
                  value={this.state.formData.nama_penerima}
                  onChange={this.handleInputChange}
                  className="mt-1 w-full pl-3 pr-4 py-2 bg-white focus:border-red-300 focus:outline-none focus:ring-opacity-40 
                  border-2 shadow-sm placeholder-slate-400 rounded-md text-sm"
                >
                  <option value="" disabled hidden>
                    Pilih Nama Penerima Paket
                  </option>
                  {allUsers.map((user) => (
                    <option key={user.uuid} value={user.nama}>
                      {user.nama}
                    </option>
                  ))}
                </select>
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
          {/* Tombol di luar box untuk memicu pemilihan gambar */}
          <div className="pt-4 flex justify-center">
            <button
              className="bg-[#B72024] text-white p-2 w-60 rounded-md"
              onClick={this.handleButtonClick}
            >
              Ambil Foto
            </button>
          </div>
          <div className="pt-4 flex justify-center">
            <button
              className="bg-[#27AE60] text-white p-2 w-60 rounded-md"
              onClick={this.handleSimpan}
            >
              Simpan
            </button>
          </div>
          {/* Modal button simpan */}
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
                    <img src={`${BASE_URL}/assets/succes.png`} className="px-16" alt=""></img>
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

export default FormKurir;

// yo men