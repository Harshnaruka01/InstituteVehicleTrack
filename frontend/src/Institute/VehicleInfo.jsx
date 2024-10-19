import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SearchBox from "../Components/SearchBox";
import Maps from "../Components/Maps";
import Button from '@mui/material/Button';

const AddVehicleInfo = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [routePoints, setRoutePoints] = useState([]);
    const [formData, setFormData] = useState({
        vehicleName: "", // Updated to match schema
        vehicleType: "Bus", // Updated to match schema expectation (lowercase 'bus')
        vehicleNumber: "",
        driverName: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNumber: ""
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const combinedData = {
            ...formData,
            routes: routePoints
        };

        console.log("Submitting Data:", combinedData);

        try {
            const response = await fetch('http://localhost:5000/api/register/Driver', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(combinedData),
            });

            console.log("Form Data before submission:", formData);
            console.log("Route Points before submission:", routePoints);

            const result = await response.json();

            if (response.ok) {
                alert("Driver registered successfully!");
                navigate('/institute/interface'); // Navigate to the desired route
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <>
            <div className="add-vehicle-body">
                <div className="add-vehicle-container">
                    <h1 className="add-vehicle-title">Add Vehicle Information</h1>
                    <form className="add-vehicle-form" onSubmit={handleFormSubmit}>
                        <div className="add-vehicle-section">
                            <div className="add-vehicle-group">
                                <label htmlFor="vehicleName" className="add-vehicle-label">Vehicle Name</label>
                                <input
                                    type="text"
                                    id="vehicleName"
                                    name="vehicleName"
                                    className="add-vehicle-input"
                                    value={formData.vehicleName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="add-vehicle-group">
                                <label htmlFor="vehicleType" className="add-vehicle-label">Vehicle Type</label>
                                <select
                                    id="vehicleType"
                                    name="vehicleType"
                                    className="add-vehicle-input"
                                    value={formData.vehicleType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="bus">Bus</option>
                                    <option value="van">Van</option>
                                </select>
                            </div>
                            <div className="add-vehicle-group">
                                <label htmlFor="vehicleNumber" className="add-vehicle-label">Vehicle Number Plate No.</label>
                                <input
                                    type="text"
                                    id="vehicleNumber"
                                    name="vehicleNumber"
                                    className="add-vehicle-input"
                                    value={formData.vehicleNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="add-vehicle-section">
                            <div className="add-vehicle-group">
                                <label htmlFor="driverName" className="add-vehicle-label">Driver Name</label>
                                <input
                                    type="text"
                                    id="driverName"
                                    name="driverName"
                                    className="add-vehicle-input"
                                    value={formData.driverName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="add-vehicle-group">
                                <label htmlFor="email" className="add-vehicle-label">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="add-vehicle-input"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="add-vehicle-group">
                                <label htmlFor="password" className="add-vehicle-label">Enter Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="add-vehicle-input"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="add-vehicle-group">
                                <label htmlFor="confirmPassword" className="add-vehicle-label">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="add-vehicle-input"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="add-vehicle-group">
                                <label htmlFor="contactNumber" className="add-vehicle-label">Driver Contact No.</label>
                                <input
                                    type="tel"
                                    id="contactNumber"
                                    name="contactNumber"
                                    className="add-vehicle-input"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="submit-btn-container">
                            <Button variant="contained" type="submit" style={{position:'absolute',right:"40px", marginTop:"560px"}}>
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <div style={{}}>Vehicle Route</div>

            <div style={{ display: "flex", flexDirection: "row", width: "100vw", height: "100vh", marginTop: '70px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '70px', alignItems: 'center', width: "40vw", height: '590px', boxShadow: '0 1px 6px grey' }}>
                    <SearchBox setRoutePoints={setRoutePoints} />
                </div>
                <div style={{ width: "50vw", height: "100%" }}>
                    <Maps routePoints={routePoints} />
                </div>
            </div>
        </>
    );
};

export default AddVehicleInfo;
