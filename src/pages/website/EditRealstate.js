import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import MainBtn from "../../components/common/buttons/MainBtn";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import MainSelect from "../../components/common/inputs/MainSelect";
import MainInput from "../../components/common/inputs/MainInput";
import RealstateImages from "../../components/editRealstate/RealstateImages";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { getRealStateDetails } from "../../services/get/getRealStateDetails";
import Spinner from "../../components/common/Spinner";
import axios from "axios";
import { useGlobalContext } from "../../hooks/GlobalContext";
import EditRealstateMapSearch from "../../components/editRealstate/EditRealstateMapSearch";
import EditRealstateMap from "../../components/editRealstate/EditRealstateMap";
import useNumberInput from "../../hooks/validation/useNumberInput";
import { elevatorsAr, elevatorsEn } from "../../data/data";
import EditSuck from "../../components/editRealstate/EditSuck";
import EditVideo from "../../components/editRealstate/EditVideo";
import { useNavigate } from "react-router-dom";
const EditRealstate = () => {
  const navigate = useNavigate();
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [previewsPhotos, setPreveiwsPhotos] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [elevator, setElevator] = useState("");
  const [suckNum, setSuckNum] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const {
    value: age,
    error: ageError,
    handleChange: handleAgeChange,
    setValue: setAge,
  } = useNumberInput("");
  const {
    value: area,
    error: areaError,
    handleChange: handleAreaChange,
    setValue: setArea,
  } = useNumberInput("");
  const {
    value: turn,
    error: turnError,
    handleChange: handleTurnChange,
    setValue: setTurn,
  } = useNumberInput("");
  const {
    value: rooms,
    error: roomsError,
    handleChange: handleRoomsChange,
    setValue: setRooms,
  } = useNumberInput("");
  const {
    value: bathRooms,
    error: bathRoomsError,
    handleChange: handleBathRoomsChange,
    setValue: setBathrooms,
  } = useNumberInput("");
  const {
    value: service,
    error: serviceError,
    handleChange: handleServiceChange,
    setValue: setService,
  } = useNumberInput("");
  const {
    value: price,
    error: priceError,
    handleChange: handlePriceChange,
    setValue: setPrice,
  } = useNumberInput("");
  const [selectedSuck, setSelectedSuck] = useState(null);
  const [suckPreview, setSuckPreview] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const { data: global } = useGlobalContext();
  const selectedCategory = global?.categories?.find(
    (item) => item?.id === categoryId
  );
  const authToken = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  const [uploadProgress, setUploadProgress] = useState(0);
  const params = useParams();
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();
  const { isLoading, data } = useQuery(
    ["realstate-details", params.id],
    () => getRealStateDetails(params.id),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          setPreveiwsPhotos(data?.data?.data?.images);
          setCategoryId(data?.data?.data?.category?.id);
          setSubCategoryId(data?.data?.data?.sub_category?.id);
          setName(data?.data?.data?.name);
          setCity(data?.data?.data?.city?.id);
          setDistrict(data?.data?.data?.region);
          setAddress(data?.data?.data?.address);
          setNotes(data?.data?.data?.notes);
          setCoordinates({
            lat: Number.parseFloat(data?.data?.data?.lat),
            lng: Number.parseFloat(data?.data?.data?.lng),
          });
          setAge(data?.data?.data?.year_of_construction);
          setArea(data?.data?.data?.area);
          setTurn(data?.data?.data?.floor_number);
          setRooms(data?.data?.data?.rooms_count);
          setBathrooms(data?.data?.data?.bathrooms_count);
          setService(data?.data?.data?.service_room);
          setElevator(data?.data?.data?.elevator);
          setPrice(data?.data?.data?.price);
          setSuckNum(data?.data?.data?.instrument_number);
          setPaymentId(data?.data?.data?.payment_type_id?.id);
          setSuckPreview(data?.data?.data?.instrument_file[0]);
          setVideoPreview(data?.data?.data?.video);
        }
      },
      staleTime: Infinity,
      // cacheTime: Infinity,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
  console.log("services room", data?.data?.data?.service_room);

  const { isLoading: loadingEdit, mutate } = useMutation(
    async (formData) => {
      const response = await axios.post(
        `https://api.ejark.sa/api/v1/realties/${params.id}?_method=patch`,
        formData, // formData should be the second parameter
        {
          headers: {
            "Content-Type": "multipart/form-data",
            lang: i18n.language,
            "Accept-Language": i18n.language,
            "Access-Control-Allow-Credentials": true,
            "x-api-key": "0FcBOe75FIFkBkNkA",
            Authorization: authToken ? `Bearer ${authToken}` : null,
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total;
            const current = progressEvent.loaded;
            setUploadProgress(Math.round((current / total) * 100));
          },
        }
      );
      return response;
    },
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries(["realstate-details", params.id]);
          queryClient.invalidateQueries("my-realstates");
          setSelectedPhotos([]);
          navigate(`/website/realstate/${data?.data?.data?.id}`);
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
      onError: (data) => {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      },
    }
  );

  const handleCategoryChange = (opt) => {
    setCategoryId(opt?.id);
    setSubCategoryId("");
  };
  const handleSubCategoryChange = (opt) => setSubCategoryId(opt?.id);
  const handleNameChnage = (e) => setName(e.target.value);
  const handleCityChange = (opt) => setCity(opt.id);
  const handleDistrictChange = (e) => setDistrict(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleNotesChange = (e) => setNotes(e.target.value);
  const handleElevatorChange = (opt) => setElevator(opt.id);
  const handleSuckNumChange = (e) => setSuckNum(e.target.value);
  const handlePaymentChange = (opt) => setPaymentId(opt.id);

  const handleSubmit = (e) => {
    const formData = new FormData();
    e.preventDefault();
    if (previewsPhotos.length < 4) {
      Swal.fire({
        icon: "error",
        title: t("At least 4 photos must be uploaded"),
      });
      return false;
    } else if (categoryId && !subCategoryId) {
      Swal.fire({
        icon: "error",
        title: t("not valid unit"),
      });
      return;
    } else if (ageError) {
      Swal.fire({
        icon: "error",
        title: ageError,
      });
      return;
    } else if (areaError) {
      Swal.fire({
        icon: "error",
        title: areaError,
      });
      return;
    } else if (turnError) {
      Swal.fire({
        icon: "error",
        title: turnError,
      });
      return;
    } else if (roomsError) {
      Swal.fire({
        icon: "error",
        title: roomsError,
      });
      return;
    } else if (bathRoomsError) {
      Swal.fire({
        icon: "error",
        title: bathRoomsError,
      });
      return;
    } else if (serviceError) {
      Swal.fire({
        icon: "error",
        title: serviceError,
      });
      return;
    } else if (elevator === "") {
      Swal.fire({
        icon: "error",
        title: t("elevators field is required"),
      });
      return;
    } else if (priceError) {
      Swal.fire({
        icon: "error",
        title: priceError,
      });
      return;
    } else if (!suckPreview) {
      Swal.fire({
        icon: "error",
        title: t("instrument file field is required"),
      });
      return;
    } else if (!coordinates) {
      Swal.fire({
        icon: "error",
        title: t("wrong location !!"),
      });
      return;
    } else {
      if (selectedPhotos.length) {
        selectedPhotos.forEach((file) => formData.append("image[]", file));
      }
      formData.append("category_id", categoryId);
      formData.append("sub_category_id", subCategoryId);
      formData.append("name", name);
      formData.append("city_id", city);
      formData.append("region", district);
      formData.append("address", address);
      formData.append("notes", notes);
      formData.append("lat", coordinates.lat);
      formData.append("lng", coordinates.lng);
      formData.append("year_of_construction", age);
      formData.append("area", area);
      formData.append("floor_number", turn);
      formData.append("rooms_count", rooms);
      formData.append("bathrooms_count", bathRooms);
      formData.append("service_room", service);
      formData.append("elevator", elevator);
      formData.append("price", price);
      formData.append("instrument_number", suckNum);
      formData.append("payment_type_id", paymentId);
      if (selectedSuck) {
        formData.append("instrument_file", selectedSuck);
      }
      if (selectedVideo) {
        formData.append("video", selectedVideo);
      }
    }

    mutate(formData);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-4">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-md p-6 shadow-xl "
          >
            <div className="flex items-center mb-2 gap-1">
              <IoIosCheckmarkCircle size={20} className="text-maincolorgreen" />
              <p className="text-textColor">{t("realstate details")}</p>
            </div>
            <RealstateImages
              previewsPhotos={previewsPhotos}
              setPreveiwsPhotos={setPreveiwsPhotos}
              selectedPhotos={selectedPhotos}
              setSelectedPhotos={setSelectedPhotos}
              realstateId={params.id}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-6">
              <MainInput
                value={name || ""}
                type="text"
                onChange={handleNameChnage}
                label="adArabicTitle"
              />
              <MainSelect
                options={global?.categories || []}
                label="type"
                value={
                  global?.categories?.find((item) => item?.id === categoryId)
                    ?.name
                }
                onSelect={handleCategoryChange}
              />
              <MainSelect
                label="unit"
                options={selectedCategory?.categories || []}
                value={
                  subCategoryId !== ""
                    ? selectedCategory?.categories?.find(
                        (item) => item?.id === subCategoryId
                      )?.name
                    : ""
                }
                onSelect={handleSubCategoryChange}
              />
              <MainSelect
                label="city"
                options={global?.cities || []}
                value={
                  city !== ""
                    ? global?.cities?.find((item) => item?.id === city)?.name
                    : ""
                }
                onSelect={handleCityChange}
              />
              <MainInput
                value={district || ""}
                onChange={handleDistrictChange}
                label="district"
              />
              <MainInput
                value={address || ""}
                onChange={handleAddressChange}
                label="allDetails"
              />
              <MainInput
                value={notes || ""}
                onChange={handleNotesChange}
                label="notes"
              />
              <EditRealstateMapSearch
                label={t("mapSearc")}
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                searchAddress={searchAddress}
                setSearchAddress={setSearchAddress}
              />
              <div className="row-span-3">
                <EditRealstateMap coordinates={coordinates} />
              </div>
              <MainInput
                type="number"
                label="age"
                value={age || ""}
                onChange={handleAgeChange}
                error={ageError}
              />
              <MainInput
                type="number"
                label="area"
                value={area || ""}
                onChange={handleAreaChange}
                error={areaError}
              />
              <MainInput
                type="number"
                label="turn"
                value={turn || ""}
                onChange={handleTurnChange}
                error={turnError}
              />
              <MainInput
                type="number"
                label="roomNum"
                value={rooms || ""}
                onChange={handleRoomsChange}
                error={roomsError}
              />
              <MainInput
                type="number"
                label="bathRooms"
                value={bathRooms || ""}
                onChange={handleBathRoomsChange}
                error={bathRoomsError}
              />
              <MainInput
                type="number"
                label="service"
                value={service}
                onChange={handleServiceChange}
                error={serviceError}
              />
              <MainSelect
                label="elevators"
                onSelect={handleElevatorChange}
                options={i18n.language === "ar" ? elevatorsAr : elevatorsEn}
                value={
                  i18n.language === "ar"
                    ? elevatorsAr.find((item) => item?.id === elevator)?.name
                    : elevatorsEn.find((item) => item?.id === elevator)?.name
                }
              />
              <MainInput
                type="number"
                label="price"
                value={price || ""}
                onChange={handlePriceChange}
                error={priceError}
              />
              <MainInput
                type="text"
                label="suckNum"
                value={suckNum || ""}
                onChange={handleSuckNumChange}
              />
              <MainSelect
                label="methods"
                options={global?.paymentTypes || []}
                onSelect={handlePaymentChange}
                value={
                  global?.paymentTypes?.find((item) => item.id === paymentId)
                    ?.name || ""
                }
              />
            </div>
            <div className="my-8">
              <EditSuck
                suckPreview={suckPreview}
                setSuckPreview={setSuckPreview}
                selectedSuck={selectedSuck}
                setSelectedSuck={setSelectedSuck}
              />
            </div>
            <div className="my-8">
              <EditVideo
                setVideoPreview={setVideoPreview}
                videoPreview={videoPreview}
                selectedVideo={selectedVideo}
                setSelectedVideo={setSelectedVideo}
              />
            </div>
            <div className="w-full flex items-center gap-4 justify-end my-8">
              <div className=" w-[200px]">
                {loadingEdit ? (
                  <LoadingBtn />
                ) : (
                  <MainBtn type="submit" text="update" />
                )}
              </div>
              <button
                type="reset"
                className="bg-red-600 text-white p-3 flex items-center justify-center rounded-md"
              >
                {t("cancel")}
              </button>
            </div>
          </form>
          {loadingEdit && (
            <div className=" fixed top-0 left-0 bg-black bg-opacity-25 w-full h-full flex items-center">
              <div className="container mx-auto px-8">
                <div className="w-full bg-white shadow-2xl h-1/2 flex items-center p-4 md:w-[400px] lg:w-[650px] mx-auto rounded-lg">
                  <div className="w-full">
                    <p className="text-red-600 mb-2">{t("not refresh")}</p>
                    <p className="text-maincolorgreen mb-2">{t("uploading")}</p>
                    <div className="bg-slate-200 w-full h-[8px] rounded-md">
                      <div
                        className="progress bg-maincolorgreen h-[8px] rounded-md"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EditRealstate;
