import { uploadImage } from "@/lib/uploadImage";
import { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import slugify from "@/utils/slugify";
import pubishedDate from "@/utils/pubishedDate";

const ArticleForm = ({ onSubmit, setShowForm, state, city }) => {
  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    imageUrl: null,
    state: state,
    city: city,
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArticleData((prevData) => ({ ...prevData, imageUrl: file }));
  };

  const handleContentChange = (value) => {
    setArticleData((prevData) => ({ ...prevData, description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Additional logic to upload the image to Cloudinary
    const imageUrl = await uploadImage(articleData.imageUrl);
    const newArticle = {
      ...articleData,
      imageUrl: imageUrl,
      slug: slugify(articleData.title),
      date: pubishedDate(),
    };
    onSubmit(newArticle);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        className="bg-white p-8 rounded shadow-md max-w-lg relative"
        onSubmit={handleSubmit}
      >
        <button
          onClick={() => setShowForm("")}
          className="right-12 top-2 text-red-600 absolute border-none"
        >
          Close
        </button>
        <label className="block mb-4">
          Article Title:
          <input
            type="text"
            name="title"
            value={articleData.title}
            placeholder="Enter Title Here"
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </label>
        <label className="block mb-4">
          Article Type:
          <input
            type="text"
            name="type"
            placeholder="Enter Type Here"
            value={articleData.type}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </label>
        <label className="block mb-4">
          Article Content:
          <ReactQuill
            value={articleData.description}
            onChange={handleContentChange}
            placeholder="Write Article Content Here"
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"], // toggled buttons
                ["blockquote"],

                // [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }], // superscript/subscript
                [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                // [{ direction: "rtl" }], // text direction

                // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                // [{ header: [1, 2, 3, 4, 5, 6, false] }],

                // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                // [{ font: [] }],
                // [{ align: [] }],

                // ["clean"], // remove formatting button
              ],
            }}
            className="quill-editor"
          />
        </label>
        <label className="block mb-4">
          Article Picture:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2"
          />
        </label>
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-1 rounded-2xl hover:bg-purple-700"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
