import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from "../components/navbar_admin";
import Footer from "../components/footer_admin";
import "../css/pagination.css";
import $ from "jquery";

class Historykurir extends Component {
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
      selectedInfoItem: null,
      users: [], // State to store the list of users
      selectedDitemuiOleh: "", // State to store the selected user in checkout
    };

    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    const bearerToken = localStorage.getItem("token");

    axios
      .get("http://103.93.130.122:4446/api/v1/halaman/kurir/histori?sort=-tanggal_datang", {
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
  }

  toggleInfoModal = (item) => {
    this.setState((prevState) => ({
      isInfoModalOpen: !prevState.isInfoModalOpen,
      selectedInfoItem: item,
    }));
  };

  handleCheckout = (item) => {
    // const bearerToken = localStorage.getItem("token");  
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin melakukan checkout?"
    );

    if (isConfirmed) {
      const checkoutData = {
        tanggal_pengambilan: new Date().toISOString(),
        status: true,
      };

      const bearerToken = localStorage.getItem("token");

      axios
        .put(
          "http://103.93.130.122:4446/api/v1/halaman/kurir/konfirmasi" +item.uuid,
          checkoutData,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        )
        .then((response) => {
          console.log("Checkout berhasil:", response.data);

          // Refresh data kurir setelah checkout
          this.refreshData();
        })
        .catch((error) => {
          console.error("Error saat checkout:", error);
        });
    }
  };

  refreshData() {
    const bearerToken = localStorage.getItem('token');

    axios
      .get("http://103.93.130.122:4446/api/v1/halaman/kurir/histori", {
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
        const itemDate = new Date(item.tanggal_datang)
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
            item.nama_penerima &&
            item.nama_penerima
              .toString()
              .toLowerCase()
              .includes(keyword.toLowerCase())) ||
          (item.no_wa_kurir &&
            item.no_wa_kurir
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

  renderTableRows = () => {
    // const { filteredData } = this.state;
    const currentItems = this.getCurrentItems();

    return currentItems.map((item) => (
      <tr key={item.id}>
        <td className="text-center whitespace-nowrap">{item.nama_kurir}</td>
        <td className="text-center whitespace-nowrap">{item.no_wa_kurir}</td>
        <td className="text-center whitespace-nowrap">{item.nama_penerima}</td>
        <td className="text-center whitespace-nowrap">{item.tanggal_datang}</td>
        <td className="text-center whitespace-nowrap">
          {item.tanggal_pengambilan}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            className="info-button px-2 items-center"
            onClick={() => this.toggleInfoModal(item)}
          >
            <FontAwesomeIcon icon={faCircleInfo} size="lg" />
          </button>
          {item.status ? (
            // Jika status checkout adalah true
            <FontAwesomeIcon
              icon={faCheckToSlot}
              size="lg"
              style={{ color: "green" }}
              className="px-2 items-center"
            />
          ) : (
            // Jika status checkout adalah false
            <button
              className="checkout-button px-2 items-center"
              onClick={() => this.handleCheckout(item)}
            >
              <FontAwesomeIcon icon={faCheckToSlot} size="lg" />
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
              className="w-full md:w-auto px-4 py-2 mt-2 bg-white border-2 border-gray-400 rounded-md"
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
              className="w-full px-4 py-2 mt-2 bg-white border-2 border-gray-400 rounded-md"
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
                  className="px-4 md:px-8 py-3 text-center text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama Kurir
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No Telp
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama Penerima
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tanggal Dititipkan
                </th>
                <th
                  scope="col"
                  className=" px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tanggal Diambil
                </th>
                <th
                  scope="col"
                  className="pl-4 pr-20 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
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

        {this.state.isInfoModalOpen && this.state.selectedInfoItem && (
          <div
            id="modal_info"
            tabIndex="-1"
            aria-hidden="true"
            className="overflow-x-auto fixed top-0 left-0 right-0 z-50 rounded-lg w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
          >
            <div className="flex lg:h-auto w-auto justify-center ">
              <div className="relative bg-white rounded-lg shadow dark:bg-white w-1/3">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={() => this.toggleInfoModal(null)}
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
                <div className="px-6 py-6 border-2 border-gray-200 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                    Foto
                  </h3>
                  <div>
                    {this.state.selectedInfoItem &&
                      this.state.selectedInfoItem.foto && (
                        <img
                          src={`http://103.93.130.122:4446/api/v1/halaman/kurir/media/${this.state.selectedInfoItem.foto}`}
                          alt="Foto"
                          className="w-full"
                        />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    );
  }
}

export default Historykurir;
