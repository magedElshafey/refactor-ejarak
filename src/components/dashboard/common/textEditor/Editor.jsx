import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTranslation } from "react-i18next";
const Editor = ({
  placeholder,
  onEditorChange,
  field,
  value,
  language,
  label,
}) => {
  const quillRef = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    const editor = quillRef.current.editor;
    if (editor) {
      editor.root.style.direction = language === "ar" ? "rtl" : "ltr";
      editor.root.style.textAlign = language === "ar" ? "right" : "left";
    }
  }, [language]);
  const handleChange = (content) => {
    onEditorChange(content, field);
  };
  return (
    <div>
      <p className="text-textColor font-semibold mb-2 text-md md:text-lg lg:text-xl">
        {t(label)}
      </p>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        onChange={handleChange}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={".app"}
        placeholder={placeholder}
        value={value}
        style={{ height: "140px" }}
      />
    </div>
  );
};
Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "link",
];

Editor.propTypes = {
  placeholder: PropTypes.string,
  onEditorChange: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  value: PropTypes.string,
  language: PropTypes.string.isRequired,
};
export default Editor;
