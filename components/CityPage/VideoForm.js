// components/VideoForm.js
import { useState } from "react";

const VideoForm = ({ onSubmit, setShowForm, city }) => {
  const [reviewData, setReviewData] = useState({
    videoId: "",
    city,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = { ...reviewData };
    onSubmit(newReview);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-2">
      <form
        className="bg-white p-8 rounded shadow-md max-w-md relative"
        onSubmit={handleSubmit}
      >
        <button
          onClick={() => setShowForm("")}
          className="right-12 top-2 text-red-600 absolute border-none"
        >
          Close
        </button>
        <label className="block mb-4">
          VideoId:
          <input
            type="text"
            name="videoId"
            value={reviewData.videoId}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </label>

        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-1 rounded-2xl hover:bg-purple-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
