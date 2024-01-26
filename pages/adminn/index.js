// pages/admin/index.js
import { useState } from "react";
import ArticleForm from "../../components/ArticleForm";

const AdminPanel = () => {
  const [articleData, setArticleData] = useState({ title: "", text: "" });

  const handleTextChange = (text) => {
    setArticleData((prevData) => ({ ...prevData, text }));
  };

  const handleTitleChange = (title) => {
    setArticleData((prevData) => ({ ...prevData, title }));
  };

  const handleSubmit = async () => {
    console.log({ articleData });
    try {
      // Send the articleData to the Node.js backend
      const response = await fetch("http://localhost:3001/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        console.log("Article submitted successfully!");
        // Optionally, reset the form or perform other actions
      } else {
        console.error("Failed to submit article.");
      }
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };

  return (
    <div>
      <h2>Add Article</h2>
      <ArticleForm
        onTextChange={handleTextChange}
        onTitleChange={handleTitleChange}
        onSubmit={handleSubmit}
      />
      {/* Other admin functionalities */}
    </div>
  );
};

export default AdminPanel;
