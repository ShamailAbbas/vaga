// components/ArticleForm.js
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
// import "tailwindcss/tailwind.css";

const ArticleForm = ({ onTextChange, onTitleChange, onSubmit }) => {
  const [formTitle, setFormTitle] = useState("");

  const handleTextChange = (value) => {
    onTextChange(value);
  };

  const handleTitleChange = (e) => {
    setFormTitle(e.target.value);
    onTitleChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    onSubmit();
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  return (
    <form
      className="w-[90%] mx-auto mt-8 p-8 bg-white rounded shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formTitle}
          onChange={handleTitleChange}
          className="w-full border rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2"></label>
        <ReactQuill
          onChange={handleTextChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              [
                {
                  font: [
                    "Arial",
                    "Times New Roman",
                    "Courier New",
                    "Georgia",
                    "Verdana",
                  ],
                },
              ], // Font options
              ["blockquote", "code-block"],
              ["link", "image", "video"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ align: ["center", "left", "right"] }],
              ["clean"],
            ],
          }}
          formats={formats}
          theme="snow"
          placeholder="compose an article ..."
          className="quill-editor"
          style={{ height: "auto" }}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default ArticleForm;
