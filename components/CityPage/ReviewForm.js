// components/ReviewForm.js
import { uploadImage } from "@/lib/uploadImage";
import { useState } from "react";

const ReviewForm = ({ onSubmit,setShowForm ,city}) => {
  const [reviewData, setReviewData] = useState({
    reviewer: "",
    stars: 0,
    review: "",
    picture: null,
    city
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReviewData((prevData) => ({ ...prevData, picture: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Additional logic to upload the image to Cloudinary
    const imageUrl = await uploadImage(reviewData.picture);
    const newReview = { ...reviewData, picture: imageUrl };
    onSubmit(newReview);
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      
      <form
        className="bg-white p-8 rounded shadow-md max-w-md relative"
        onSubmit={handleSubmit}
      >
        <button onClick={()=>setShowForm('')} className='right-12 top-2 text-red-600 absolute border-none'>Close</button>
        <label className="block mb-4">
          Reviewer:
          <input
            type="text"
            name="reviewer"
            value={reviewData.reviewer}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </label>
        <label className="block mb-4">
          Stars:
          <input
            type="number"
            name="stars"
            value={reviewData.stars}
            onChange={handleInputChange}
            className="w-full border p-2"
            min={0}
            max={5}
          />
        </label>
        <label className="block mb-4">
          Review:
          <textarea
            name="review"
            value={reviewData.review}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </label>
        <label className="block mb-4">
          Picture:
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
