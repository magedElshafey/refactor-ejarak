import React, { useState, useEffect } from "react";
import Editor from "../../components/dashboard/common/textEditor/Editor";
import Spinner from "../../components/common/Spinner";
import useFilteredSetting from "../../hooks/api/useFilterdSettings";
import MainBtn from "../../components/common/buttons/MainBtn";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import LoadingBtn from "../../components/common/buttons/LoadingBtn";
import { changeTerms } from "../../services/post/dashboard/changeTerms";
import Swal from "sweetalert2";
const key = "about_ejark";
const AboutEjarak = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleNavigate = () => navigate(-1);
  const { isLoading, data } = useFilteredSetting(key);
  const [terms, setTerms] = useState({
    ar: "",
    en: "",
  });
  useEffect(() => {
    if (data) {
      setTerms({
        ar: data?.translations?.value_translation?.ar || "",
        en: data?.translations?.value_translation?.en || "",
      });
    }
  }, [data]);

  const handleEditorChange = (content, field) => {
    setTerms((prevState) => ({
      ...prevState,
      [field]: content,
    }));
  };
  const { isLoading: loadingSubmit, mutate } = useMutation(changeTerms, {
    onSuccess: (data) => {
      if (data?.data?.status) {
        console.log("data", data);
        Swal.fire({
          icon: "success",
          title: data?.data?.message,
        });
        queryClient.invalidateQueries(["settings", key]);
      } else {
        Swal.fire({
          icon: "error",
          title: data?.response?.data?.message,
        });
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("value_translation[ar]", terms.ar);
    formData.append("value_translation[en]", terms.en);
    formData.append("key", key);
    mutate(formData);
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="container mx-auto px-6 mt-5">
          <Editor
            value={terms?.ar}
            field="ar"
            language="ar"
            onEditorChange={(content) => handleEditorChange(content, "ar")}
            label="about ejarak in arabic"
          />

          <div className="mt-16 mb-8">
            <Editor
              value={terms?.en}
              field="en"
              language="en"
              onEditorChange={(content) => handleEditorChange(content, "en")}
              label="about ejarak in english"
            />
          </div>
          <div className="flex items-center justify-center md:justify-end gap-5 mt-16">
            <div className="w-[180px]">
              {loadingSubmit ? (
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
      )}
    </>
  );
};

export default AboutEjarak;
