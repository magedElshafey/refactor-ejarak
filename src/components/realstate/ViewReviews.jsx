import React from "react";
import { formatDateTime } from "../../utils/formateDateTime";
import { getRealstateReviews } from "../../services/get/getReviews";
import Spinner from "../common/Spinner";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
const ViewReviews = ({ id, rating }) => {
  const { t } = useTranslation();
  const { isLoading, data, isFetching } = useQuery(["revs", id], () =>
    getRealstateReviews(id)
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <p className="font-bold text-xl md:text-2xl text-center md:text-start mb-5">
            {t("rating and comments")}
          </p>
          {data?.data?.data?.length ? (
            <div>
              {data?.data?.data?.map((item, index) => (
                <div key={index} className="my-6 flex  gap-x-3">
                  <img
                    src={item?.user?.avatar?.thumb}
                    alt={item.user?.name}
                    className="rounded-full w-12 h-12"
                  />
                  <div className="">
                    <span className="font-bold">{item?.user?.name}</span>
                    <p className="text-sm">{item?.comment}</p>
                    {!item.rating ? null : (
                      <ReactStars
                        count={5}
                        value={+item?.rating}
                        edit={false}
                        activeColor="#ffd700"
                        isHalf={true}
                        key={`${isFetching} ${item.id}`}
                      />
                    )}
                  </div>
                  <div className="text-textColor text-xs">
                    {formatDateTime(item?.updated_at)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>{t("noCom")}</div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewReviews;
