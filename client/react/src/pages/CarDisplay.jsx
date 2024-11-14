import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CarDisplay = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { carId } = useParams();

  useEffect(() => {
    console.log("Car ID from URL:", carId); // Debugging the carId value

    const fetchCarData = async () => {
      try {
        const response = await fetch(`https://api.example.com/cars/${carId}`);
        console.log("Response Status:", response.status); // Debugging the response status

        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }

        const data = await response.json();
        console.log("Fetched car data:", data); // Log the fetched data

        setCar(data);  // Set the car state
      } catch (error) {
        console.error("Error fetching car data:", error);
        toast.error("Failed to load car data");
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      fetchCarData();  // Only fetch if carId exists
    }
  }, [carId]);

  if (loading) {
    return <div>Loading car data...</div>;
  }

  if (!car) {
    return <div>No car data available</div>;
  }

  return (
    <div className="car-details">
      <h1 className="text-xl font-bold">{car?.name || "Car name not available"}</h1>
      <div className="details">
        <p className="text-sm text-gray-500">
          Car Type: {car?.car_type ? JSON.stringify(car.car_type) : "Not available"}
        </p>
        <p className="text-sm text-gray-500">
          Company: {car?.company ? JSON.stringify(car.company) : "Not available"}
        </p>
        <p className="text-sm text-gray-500">
          Dealer: {car?.dealer ? JSON.stringify(car.dealer) : "Not available"}
        </p>
      </div>
    </div>
  );
};

export default CarDisplay;
