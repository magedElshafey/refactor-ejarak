import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import MainBtn from "../../common/buttons/MainBtn";
import LoadingBtn from "../../common/buttons/LoadingBtn";
import MainInput from "../../common/inputs/MainInput";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";
import useClickOutside from "../../../hooks/useClickOutside";
import { IoCloseSharp } from "react-icons/io5";
import { addCity } from "../../../services/post/dashboard/addCity";
const PaymentForm = () => {
  return <div>PaymentForm</div>;
};

export default PaymentForm;
