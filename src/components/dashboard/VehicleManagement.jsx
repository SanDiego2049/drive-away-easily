import { useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import carImage1 from "../../assets/carImage1.jpg";
import carImage2 from "../../assets/carImage2.jpg";
import carImage3 from "../../assets/carImage3.jpg";
import carImage4 from "../../assets/carImage4.jpg";

const initialVehicles = [
  {
    id: 1,
    name: "Toyota Camry 2022",
    category: "Sedan",
    transmission: "Auto",
    rating: 4.8,
    price: 45000,
    image: carImage1,
    fuelType: "Gasoline",
    doors: 4,
    seats: 5,
  },
  {
    id: 2,
    name: "Honda CR-V 2023",
    category: "SUV",
    transmission: "Manual",
    rating: 4.9,
    price: 65000,
    image: carImage2,
    fuelType: "Hybrid",
    doors: 4,
    seats: 5,
  },
];

const imageOptions = {
  carImage1,
  carImage2,
  carImage3,
  carImage4,
};

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    transmission: "",
    rating: "",
    price: "",
    image: "carImage1",
    fuelType: "",
    doors: "",
    seats: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);
    setForm({
      name: vehicle.name,
      category: vehicle.category,
      transmission: vehicle.transmission,
      rating: vehicle.rating,
      price: vehicle.price,
      image:
        Object.keys(imageOptions).find(
          (key) => imageOptions[key] === vehicle.image
        ) || "carImage1",
      fuelType: vehicle.fuelType,
      doors: vehicle.doors,
      seats: vehicle.seats,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      transmission: "",
      rating: "",
      price: "",
      image: "carImage1",
      fuelType: "",
      doors: "",
      seats: "",
    });
  };

  const handleSave = () => {
    if (
      !form.name ||
      !form.category ||
      !form.transmission ||
      !form.rating ||
      !form.price ||
      !form.fuelType ||
      !form.doors ||
      !form.seats
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editingId) {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === editingId
            ? {
                ...v,
                ...form,
                rating: parseFloat(form.rating),
                price: parseFloat(form.price),
                doors: parseInt(form.doors),
                seats: parseInt(form.seats),
                image: imageOptions[form.image],
              }
            : v
        )
      );
      toast.success("Vehicle updated successfully");
      setEditingId(null);
    } else {
      const newVehicle = {
        id: Date.now(),
        ...form,
        rating: parseFloat(form.rating),
        price: parseFloat(form.price),
        doors: parseInt(form.doors),
        seats: parseInt(form.seats),
        image: imageOptions[form.image],
      };
      setVehicles((prev) => [newVehicle, ...prev]);
      toast.success("Vehicle added successfully");
    }

    resetForm();
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete this vehicle?</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setVehicles((prev) => prev.filter((v) => v.id !== id));
                if (editingId === id) handleCancelEdit();
                toast.dismiss(t.id);
                toast.success("Vehicle deleted");
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto bg-gray-50">
      <h2 className="text-2xl sm:text-3xl mb-6">Vehicle Management</h2>

      {/* Form for Add/Edit */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h3 className="text-xl mb-4 flex items-center gap-2">
          {editingId ? (
            <>
              <Edit className="w-5 h-5" /> Edit Vehicle
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" /> Add New Vehicle
            </>
          )}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ...inputs unchanged */}
          <input
            type="text"
            name="name"
            placeholder="Name (e.g. Toyota Camry 2022)"
            value={form.name}
            onChange={handleChange}
            className="input-field"
          />
          {/* rest inputs... */}
          {/* The rest of your input fields here remain the same */}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded"
          >
            {editingId ? "Save Changes" : "Add Vehicle"}
          </button>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List of Vehicles */}
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white p-4 rounded-lg shadow flex items-center gap-6"
          >
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-28 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="text-lg font-semibold">{vehicle.name}</h4>
              <p className="text-sm text-gray-600">
                {vehicle.category} • {vehicle.transmission} • {vehicle.fuelType}
              </p>
              <p className="text-sm text-gray-600">
                Rating: {vehicle.rating} • Doors: {vehicle.doors} • Seats:{" "}
                {vehicle.seats}
              </p>
              <p className="text-sm font-semibold">₦{vehicle.price}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(vehicle)}
                className="text-orange-500 hover:text-orange-700"
                title="Edit Vehicle"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(vehicle.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete Vehicle"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleManagement;
