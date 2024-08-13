import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Editor from "../../components/dashboard/common/textEditor/Editor";
import { useMutation, useQueryClient, useQuery } from "react-query";
import MainBtn from "../../components/common/buttons/MainBtn";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import { getFaqDetails } from "../../services/get/dashboard/getFaqDetails";
import { editFaq } from "../../services/post/dashboard/editFaq";
const EditFaq = () => {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);
  const queryClient = useQueryClient();
  const [question, setQuestion] = useState({
    ar: "",
    en: "",
  });
  const [answer, setAnswer] = useState({
    ar: "",
    en: "",
  });
  const handleQuestionChange = (content, field) => {
    setQuestion((prevState) => ({
      ...prevState,
      [field]: content,
    }));
  };
  const handleAnswerChange = (content, field) => {
    setAnswer((prevState) => ({
      ...prevState,
      [field]: content,
    }));
  };
  const { isLoading, data } = useQuery(["faq-details", params.id], () =>
    getFaqDetails(params.id)
  );

  useEffect(() => {
    if (!isLoading && data) {
      setQuestion({
        ar: data?.data?.data?.translations?.question?.ar,
        en: data?.data?.data?.translations?.question?.en,
      });
      setAnswer({
        ar: data?.data?.data?.translations?.answer?.ar,
        en: data?.data?.data?.translations?.answer?.en,
      });
    } else {
      setQuestion({ ar: "", en: "" });
      setAnswer({ ar: "", en: "" });
    }
  }, [isLoading, data]);
  const { isLoading: loadingSubmut, mutate } = useMutation(
    (v) => editFaq(params.id, v),
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          Swal.fire({
            icon: "success",
            title: data?.data?.message,
          });
          queryClient.invalidateQueries("faqs");
          queryClient.invalidateQueries(["faq-details", params.id]);
        } else {
          Swal.fire({
            icon: "error",
            title: data?.response?.data?.message,
          });
        }
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("question[ar]", question.ar);
    formData.append("question[en]", question.en);
    formData.append("answer[ar]", answer.ar);
    formData.append("answer[en]", answer.en);
    mutate(formData);
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <p className="text-md md:text-lg lg:text-xl xl:text-2xl mb-3 font-bold text-maincolorgreen">
            {t("edit question")}
          </p>
          <form onSubmit={handleSubmit} className="w-full">
            <Editor
              value={question?.ar}
              field="ar"
              language="ar"
              onEditorChange={(content) => handleQuestionChange(content, "ar")}
              label="question in arabic"
            />

            <div className="my-24 md:my-16 ">
              <Editor
                value={question?.en}
                field="en"
                language="en"
                onEditorChange={(content) =>
                  handleQuestionChange(content, "en")
                }
                label="question in english"
              />
            </div>
            <Editor
              value={answer?.ar}
              field="ar"
              language="ar"
              onEditorChange={(content) => handleAnswerChange(content, "ar")}
              label="answer in arabic"
            />
            <div className="my-24 md:my-16 ">
              <Editor
                value={answer?.en}
                field="en"
                language="en"
                onEditorChange={(content) => handleAnswerChange(content, "en")}
                label="answer in english"
              />
            </div>
            <div className="flex items-center justify-center md:justify-end gap-5 mt-16">
              <div className="w-[180px]">
                {loadingSubmut ? (
                  <LoadingBtn />
                ) : (
                  <MainBtn text="save" type="submit" />
                )}
              </div>
              <button
                type="button"
                onClick={handleNavigate}
                className="flex items-center justify-center rounded-md bg-[#f6f5f5]"
              >
                {t("back")}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditFaq;
