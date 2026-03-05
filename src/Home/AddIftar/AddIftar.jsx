import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

const AddIftar = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const navigation = useNavigate();

  // Fetch districts from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/divisionData`)
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  // Update upazilas when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const districtsObj = districts.find(
        (singleDistrict) => singleDistrict.district === selectedDistrict,
      );
      setUpazilas(districtsObj?.upazilas || []);
      setSelectedUpazila("");
    } else {
      setUpazilas([]);
      setSelectedUpazila("");
    }
  }, [selectedDistrict, districts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // added data in mongodb
    fetch(`${import.meta.env.VITE_API_URL}/iftarData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigation("/")
  };

  return (
    <div>
      <section className="min-h-[calc(100vh-68px)] p-6 dark:bg-gray-100 dark:text-gray-900">
        <form
          onSubmit={handleSubmit}
          className="container mx-auto flex flex-col"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
            {/* Info */}
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Personal Information</p>
              <p className="text-xs">
                Fill out the form to add Iftar details. Select District and
                Upazila from the list.
              </p>
            </div>

            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              {/* District */}
              <div className="col-span-full sm:col-span-3">
                <label className="block text-sm mb-1">District</label>
                <select
                  name="district"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                >
                  <option>Select District</option>

                  {districts.map((d) => (
                    <option key={d._id} value={d.district}>
                      {d.district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div className="col-span-full sm:col-span-3">
                <label className="block text-sm mb-1">Upazila</label>
                <select
                  name="upazila"
                  value={selectedUpazila}
                  className="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  disabled={!upazilas.length}
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mosque */}
              <div className="col-span-full sm:col-span-3">
                <label className="block text-sm mb-1">Mosque</label>
                <input
                  name="mosque"
                  type="text"
                  placeholder="Enter Mosque name"
                  className="w-full p-2 rounded-md border-2 border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              {/* Iftar */}
              <div className="col-span-full sm:col-span-3">
                <label className="block text-sm mb-1">Iftar</label>
                <select
                  name="iftar"
                  type="text"
                  placeholder="Enter Iftar details"
                  className="w-full p-2 rounded-md border-2 border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                >
                  <option>Select Iftar</option>
                  <option>Biryani with beef</option>
                  <option>Biryani with goat meat</option>
                  <option>Biryani with hen meat</option>
                  <option>Muri Makha</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-span-full sm:col-span-6">
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Write description..."
                  className="w-full p-2 rounded-md border-2 border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddIftar;
