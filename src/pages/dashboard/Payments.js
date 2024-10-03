import React, { useState } from "react";
import Spinner from "../../components/common/Spinner";
import { useQuery } from "react-query";
import MainSelect from "../../components/common/inputs/MainSelect";
import AddPaymentBtn from "../../components/dashboard/payments/AddPaymentBtn";
import EditPaymentBtn from "../../components/dashboard/payments/EditPaymentBtn";
import RmovePaymentBtn from "../../components/dashboard/payments/RmovePaymentBtn";
import PaymentForm from "../../components/dashboard/payments/PaymentForm";
import EditPaymentForm from "../../components/dashboard/payments/EditPaymentForm";
import { getPayments } from "../../services/get/dashboard/getPayments";
const Payments = () => {
  const { isLoading, data } = useQuery("payments", getPayments);
  const [paymentId, setPaymentId] = useState("");
  const handleCategoryChnage = (opt) => setPaymentId(opt.id);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEditPaymentForm, setShowEditPaymentForm] = useState(false);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-8 mt-8">
          <div className="flex items-center gap-4 md:gap-8 lg:gap-12 flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <MainSelect
                onSelect={handleCategoryChnage}
                label="payment types"
                options={data?.data?.data}
                value={
                  paymentId
                    ? data?.data?.data?.find((item) => item.id === +paymentId)
                        .name
                    : paymentId
                }
              />
            </div>
            <div className="md:w-1/2 flex items-center gap-3 flex-wrap md:mt-8">
              <AddPaymentBtn setShowPaymentForm={setShowPaymentForm} />

              <EditPaymentBtn
                setShowEditPaymentForm={setShowEditPaymentForm}
                id={paymentId}
              />
              <RmovePaymentBtn id={paymentId} setCategoryId={setPaymentId} />
            </div>
          </div>
        </div>
      )}
      <PaymentForm
        showPaymentForm={showPaymentForm}
        setShowPaymentForm={setShowPaymentForm}
      />

      <EditPaymentForm
        showEditPaymentForm={showEditPaymentForm}
        setShowEditPaymentForm={setShowEditPaymentForm}
        id={paymentId}
      />
    </>
  );
};

export default Payments;
