import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import MainBtn from "../../components/common/buttons/MainBtn";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import { useMutation, useQueryClient } from "react-query";
import { submitReview } from "../../services/post/submitReview";
import Swal from "sweetalert2";
const SubmitReview = ({ data, id }) => {
  const { t, i18n } = useTranslation();
  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => setComment(e.target.value);
  const [rating, setRating] = useState(0);
  const ratingChanged = (newRating) => setRating(newRating);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation((v) => submitReview(data.id, v), {
    onSuccess: async (data) => {
      if (data?.data?.status) {
        console.log("data from review", data);

        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        setRating(0);
        setComment("");
        await queryClient.invalidateQueries(["revs"]);
        await queryClient.invalidateQueries(["realstate-details", id]);
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const handleSubmitReview = () => {
    if (!comment && !rating) {
      Swal.fire({
        icon: "error",
        title: t("please fill all the fields"),
      });
      return;
    } else {
      const data = {
        comment,
        rating,
      };
      mutate(data);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
      <input
        type="text"
        placeholder={t("write a description or comment")}
        className="w-full border-2  focus:outline-none h-[150px] rounded-lg p-3"
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="w-full border-2 h-[150px] rounded-lg p-3 flex items-center">
        <div>
          <p className="mb-2 text-textColor">{t("post a comment")}</p>
          <div className="flex items-center gap-2 mb-3">
            <p className=" text-secondcolorgreen font-bold">( {rating} )</p>
            <div style={{ direction: "ltr" }}>
              <ReactStars
                key={rating}
                value={rating}
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#007D56"
              />
            </div>
          </div>
          <div className="w-full flex justify-start">
            {isLoading ? (
              <LoadingBtn />
            ) : (
              <MainBtn text="done" action={handleSubmitReview} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitReview;
