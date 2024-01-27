// AttorneyForm.js
import { useState } from "react";
import { uploadImage } from "@/lib/uploadImage";

const AttorneyForm = ({ onSubmit, setShowForm, city, state }) => {
  const [attorneyData, setAttorneyData] = useState({
    image: "",
    phone: "",
    name: "",
    city: city,
    state: state,
    description: "",
    firm: "",
    website: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttorneyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    let imageUrl;
    imageUrl = await uploadImage(file);

    setAttorneyData((prevData) => ({ ...prevData, image: imageUrl }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(attorneyData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center py-12">
      <form
        className="bg-white p-8 rounded shadow-md max-w-md relative  mt-24"
        onSubmit={handleSubmit}
      >
        <button
          onClick={() => setShowForm("")}
          className="right-12 top-2 text-red-600 absolute border-none"
        >
          Close
        </button>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={attorneyData.name}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </label>
        <label className="block mb-2">
          Phone:
          <input
            type="tel"
            name="phone"
            value={attorneyData.phone}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </label>

        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={attorneyData.description}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </label>
        <label className="block mb-2">
          Firm:
          <input
            type="text"
            name="firm"
            value={attorneyData.firm}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </label>
        <label className="block mb-2">
          Website:
          <input
            type="url"
            name="website"
            value={attorneyData.website}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </label>
        <label className="block mb-2">
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

export default AttorneyForm;
