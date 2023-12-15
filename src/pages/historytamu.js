import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from "../components/navbar_admin";
import FooterAdmin from "../components/footer_admin";
import "../css/pagination.css";
import $ from "jquery";

class Historytamu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoPreview: null,
      selectedDate: "",
      data: [],
      filteredData: [],
      keyword: "",
      currentPage: 1,
      itemsPerPage: 5,
      isInfoModalOpen: false,
      currentItem: null,
      users: [],
      selectedDitemuiOleh: "",
    };

    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    const bearerToken = localStorage.getItem("token");

    axios
      .get("http://103.93.130.122:4446/api/v1/halaman/tamu/histori?sort=-tanggal_masuk", {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => {
        const responseData = response.data.data;
        this.setState({
          data: Array.isArray(responseData) ? responseData : [],
          filteredData: Array.isArray(responseData) ? responseData : [],
        });
      })
      .catch((error) => {
        console.error("API Error:", error);
      });

    this.getAllUsers();
  }

  getAllUsers = () => {
    const apiUrl = "http://103.93.130.122:4446/api/v1/halaman/user";

    axios
      .get(apiUrl, {
        auth: {
          username: "MokletHebat",
          password: "P3rtninidfr?67",
        },
      })
      .then((response) => {
        const responseData = response.data.data;
        this.setState({
          users: Array.isArray(responseData) ? responseData : [],
        });
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  handleTestimoni = (e) => {
    const testimoniValue = e.target.value;
    this.setState({
      testimoni: testimoniValue,
    });
  };

  handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.setState({
          photoPreview: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  handleDateChange = (e) => {
    const selectedDate = e.target.value;
    this.setState((prevState) => ({
      ...prevState,
      selectedDate,
      filteredData: prevState.data.filter((item) => {
        // Ambil tanggal dari properti tanggal_masuk
        const itemDate = new Date(item.tanggal_masuk)
          .toISOString()
          .split("T")[0];
        return itemDate === selectedDate;
      }),
    }));
  };

  handleChange = (e) => {
    const keyword = e.target.value;
    this.setState((prevState) => ({
      ...prevState,
      keyword,
      filteredData: prevState.data.filter(
        (item) =>
          (item &&
            item.nama_dituju &&
            item.nama_dituju
              .toString()
              .toLowerCase()
              .includes(keyword.toLowerCase())) ||
          (item.no_wa_pengunjung &&
            item.no_wa_pengunjung
              .toString()
              .toLowerCase()
              .includes(keyword.toLowerCase()))
      ),
    }));
  };

  handleButtonClick = () => {
    this.fileInputRef.current.click();
  };

  handlePageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };

  handlePrevPage = () => {
    if (this.state.currentPage > 1) {
      this.handlePageChange(this.state.currentPage - 1);
    }
  };

  handleNextPage = () => {
    const { currentPage, itemsPerPage, filteredData } = this.state;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (currentPage < totalPages) {
      this.handlePageChange(currentPage + 1);
    }
  };

  handleClose = () => {
    $("#modal_info").hide();
    $("#modal_checkout").hide();
  };

  handleInfo = (item) => {
    $("#modal_info").show();
    this.setState({
      foto: "",
      keperluan: "",
      editingItem: item, // Simpan item yang sedang diedit
    });
  };

  handleCheckout = (item) => {
    // Tampilkan modal_checkout
    $("#modal_checkout").show();

    // Simpan item saat ini di dalam state
    let today = new Date();
    this.setState({
      currentItem: item,
      diterima_oleh: "", // Reset pilihan ditemui_oleh setiap kali checkout
      testimoni: "",
      tanggal_keluar: `${today
        .toISOString()
        .substring(
          0,
          10
        )} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`,
    });
  };

  refreshData() {
    const bearerToken = localStorage.getItem("token");

    axios
      .get("http://103.93.130.122:4446/api/v1/halaman/tamu/histori", {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => {
        const responseData = response.data.data;
        this.setState({
          data: Array.isArray(responseData) ? responseData : [],
          filteredData: Array.isArray(responseData) ? responseData : [],
        });
      })
      .catch((error) => {
        console.error("Error saat merefresh data:", error);
      });
  }

  // Fungsi untuk mengirim permintaan checkout ke backend
  handleSave = (event) => {
    event.preventDefault();

    // Token autentikasi
    const bearerToken = localStorage.getItem("token");

    // Data untuk checkout
    const checkoutData = {
      diterima_oleh: this.state.diterima_oleh,
      testimoni: this.state.testimoni,
      tanggal_keluar: this.state.tanggal_keluar,
    };

    // Kirim permintaan ke backend
    axios
      .put(
        "http://103.93.130.122:4446/api/v1/halaman/tamu/testimoni/" +
          this.state.currentItem.uuid,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Checkout berhasil:", response.data);

        // Tutup modal_checkout setelah checkout berhasil
        $("#modal_checkout").hide();

        // Refresh data tamu setelah checkout
        this.refreshData();
      })
      .catch((error) => {
        console.error("Error saat checkout:", error);
      });
  };

  filterData = () => {
    const { selectedDate, keyword } = this.state;

    const filteredData = this.state.data.filter((item) => {
      const dateMatch = !selectedDate || item.date === selectedDate; // Jika selectedDate kosong, abaikan filter tanggal
      const keywordMatch =
        !keyword ||
        item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
        item.no_wa_pengunjung.toLowerCase().includes(keyword.toLowerCase()) ||
        item.date.toLowerCase().includes(keyword.toLowerCase());

      return dateMatch && keywordMatch;
    });

    this.setState({
      filteredData,
    });
  };

  renderTableRows = () => {
    // const { filteredData } = this.state;
    const currentItems = this.getCurrentItems();

    return currentItems.map((item) => (
      <tr key={item.id}>
        <td className="px-2 py-3 text-center whitespace-nowrap">
          {item.nama_pengunjung}
        </td>
        <td className="px-4 py-3 text-center whitespace-nowrap">
          {item.no_wa_pengunjung}
        </td>
        <td className="px-4 py-3 text-center whitespace-nowrap">
          {item.asal_instansi}
        </td>
        <td className="px-4 py-3 text-center whitespace-nowrap">
          {item.jumlah_tamu}
        </td>
        <td className="px-4 py-3 text-center whitespace-nowrap">
          {item.nama_dituju}
        </td>
        <td className="px-4 py-3 text-center whitespace-nowrap">
          {item.janjian === true ? "ada" : "tidak"}
        </td>
        <td className="px-6 py-4 text-center whitespace-nowrap">
          <button
            className="info-button px-2 items-center"
            onClick={() => this.handleInfo(item)}
          >
            <FontAwesomeIcon icon={faCircleInfo} size="lg" />
          </button>
          {/* <button
            className="checkout-button px-2 items-center"
            onClick={() => this.handleCheckout()}
          >
            <FontAwesomeIcon icon={faPenToSquare} size="lg" />
          </button> */}
          {item.tanggal_keluar !== null ? (
            // Jika tanggal_keluar tidak null
            <FontAwesomeIcon
              icon={faPenToSquare}
              size="lg"
              style={{ color: "green" }}
              className="px-2 items-center"
            />
          ) : (
            // Jika tanggal_keluar null
            <button
              className="checkout-button px-2 items-center"
              onClick={() => this.handleCheckout(item)}
              disabled={item.status === true}
            >
              <FontAwesomeIcon icon={faPenToSquare} size="lg" />
            </button>
          )}
        </td>
      </tr>
    ));
  };

  getCurrentItems = () => {
    const { currentPage, itemsPerPage, filteredData } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  };

  render() {
    const { keyword, currentPage } = this.state;
    const totalPages = Math.ceil(
      this.state.filteredData.length / this.state.itemsPerPage
    );

    // Tentukan jumlah halaman yang ingin ditampilkan pada navigasi pagination
    const maxPageItems = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageItems / 2));
    let endPage = Math.min(totalPages, startPage + maxPageItems - 1);

    // Jika jumlah halaman yang tersedia kurang dari maksimal, sesuaikan start dan end
    if (endPage - startPage + 1 < maxPageItems) {
      startPage = Math.max(1, endPage - maxPageItems + 1);
    }

    return (
      <div>
        <Navbar />

        <div className="filtering flex flex-col md:flex-row justify-end md:mr-20 rounded p-4 md:p-0">
          <div className="flex flex-col md:flex-row w-full md:w-auto items-center md:items-start">
            <span className="block w-auto text-md md:my-4 md:mr-4 text-slate-700">
              Filter By
            </span>
            <input
              type="date"
              name="filter_tgl"
              className="w-full md:w-auto px-4 py-2 my-2 bg-white border-2 border-gray-400 rounded-md"
              placeholder="Select Start Date"
              onChange={this.handleDateChange}
            />
          </div>
          <div className="mx-4 my-2 md:my-0 ">
            <ul>
              {this.getCurrentItems().map((item) => (
                <li key={item.nama}>{item.nama}</li>
              ))}
            </ul>
            <input
              type="text"
              className="w-full px-4 py-2 my-2 bg-white border-2 border-gray-400 rounded-md"
              placeholder="Search..."
              name="keyword"
              value={keyword}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="history-tamu bg-white mt-2 mx-2 md:mx-20 overflow-x-auto md:overflow-y-auto flex flex-col border-2 border-gray-00 rounded-2xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-8 py-3 text-center text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No Telp
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Asal Instansi
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Jumlah Tamu
                </th>
                <th
                  scope="col"
                  className=" px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Orang yang ingin ditemui
                </th>
                <th
                  scope="col"
                  className="pr-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Janji
                </th>
                <th
                  scope="col"
                  className="px-14 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {this.renderTableRows()}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination pt-8 pb-4 px-10">
              <button onClick={() => this.handlePrevPage()}>{"<< Prev"}</button>

              {/* Tampilkan navigasi halaman */}
              {Array.from({ length: endPage - startPage + 1 }).map(
                (_, index) => (
                  <button
                    key={startPage + index}
                    onClick={() => this.handlePageChange(startPage + index)}
                    className={
                      currentPage === startPage + index ? "active" : ""
                    }
                  >
                    {startPage + index}
                  </button>
                )
              )}

              <button onClick={() => this.handleNextPage()}>{"Next >>"}</button>
            </div>
          )}
        </div>

        {/* MODAL INFO */}
        <div
          id="modal_info"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div className="flex lg:h-auto w-auto justify-center ">
            <div className="relative bg-white rounded-lg shadow dark:bg-white w-1/3">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => this.handleClose()}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Tutup modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                  Foto
                </h3>
                <div>
                  <label
                    htmlFor="foto"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    foto
                  </label>
                  {this.state.editingItem && this.state.editingItem.foto && (
                    <img
                      src={`http://103.93.130.122:4446/api/v1/halaman/tamu/media/${this.state.editingItem.foto}`}
                      alt="Foto"
                      className="w-full"
                    />
                  )}
                </div>
              </div>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                  Keperluan
                </h3>
                <div>
                  <label
                    htmlFor="keterangan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    Keperluan:{" "}
                    {this.state.editingItem
                      ? this.state.editingItem.keperluan
                      : ""}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL CHECKOUT */}
        <div
          id="modal_checkout"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div className="flex lg:h-auto w-auto justify-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-white w-1/3">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => this.handleClose()}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="../assets/ts1.svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Tutup modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                  CHECKOUT
                </h3>
                <form
                  className="space-y-6"
                  onSubmit={(event) => this.handleSave(event)}
                >
                  <div>
                    <label
                      htmlFor="diterima_oleh"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >
                      Ditemui Oleh
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                      placeholder="Ditemui Oleh"
                      name="diterima_oleh"
                      value={this.state.diterima_oleh}
                      onChange={(e) =>
                        this.setState({ diterima_oleh: e.target.value })
                      }
                      required
                    >
                      <option value="">Pilih</option>
                      {this.state.users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="kesan_pesan"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >
                      Kesan/pesan
                    </label>
                    <input
                      type="text"
                      name="kesan_pesan"
                      id="kesan_pesan"
                      value={this.state.kesan_pesan}
                      onChange={this.handleTestimoni} // Menggunakan fungsi handleTestimoni
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                      placeholder="Masukkan status diterima_oleh"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(event) => this.handleSave(event)}
                    className="w-full text-white bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <FooterAdmin />
      </div>
    );
  }
}

export default Historytamu;
