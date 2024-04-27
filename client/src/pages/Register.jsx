import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const interests = ["Web Dev", "CP", "App Dev", "AIML", "BlockChain"];
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [username, setUsername] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const darkMode = true;

    const nextPage = () => {
        if (currentPage === 1 && validatePage1()) {
            setCurrentPage(currentPage + 1);
        } else if (currentPage === 2 && selectedInterests.length >= 3) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const validatePage1 = () => {
        return (
            formData.firstName.trim() !== "" &&
            formData.lastName.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.password.trim() !== ""
        );
    };

    const handleInterestClick = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        try {
            const response = axios.post("http://localhost:3000/register", {
                username: username,
                name: formData.firstName + " " + formData.lastName,
                email: formData.email,
                interests: selectedInterests,
                password: formData.password
            });
            console.log("Form submitted successfully:", response.data);
            navigate("/login")
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">
            <div
                className={`xl:max-w-3xl ${darkMode ? "bg-black" : "bg-white"
                    }  w-full p-5 sm:p-10 rounded-md`}
            >
                {currentPage === 1 && (
                    <>
                        <h1
                            className={`text-center text-xl sm:text-3xl font-semibold ${darkMode ? "text-white" : "text-black"
                                }`}
                        >
                            Register for a free account
                        </h1>
                        <div className="w-full mt-8">
                            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        name="firstName"
                                        className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                            ? "bg-[#302E30] text-white focus:border-white"
                                            : "bg-gray-100 text-black focus:border-black"
                                            }`}
                                        type="text"
                                        placeholder="Your first name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        name="lastName"
                                        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                            ? "bg-[#302E30] text-white focus:border-white"
                                            : "bg-gray-100 text-black focus:border-black"
                                            }`}
                                        type="text"
                                        placeholder="Your last name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <input
                                    name="email"
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />

                                <div className="relative">
                                    <input
                                        name="password"
                                        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                            ? "bg-[#302E30] text-white focus:border-white"
                                            : "bg-gray-100 text-black focus:border-black"
                                            }`}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent border-none p-0 cursor-pointer focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <span>Hide</span>

                                        ) : (
                                            <span>Show</span>
                                        )}
                                    </button>
                                </div>
                                <button className={`mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${!validatePage1() ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={nextPage} disabled={!validatePage1()}>
                                    <span className="ml-3">Next</span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    Already have an account?{" "}
                                    <a href="">
                                        <span className="text-[#E9522C] font-semibold">Login</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </>
                )}
                {currentPage === 2 && (
                    <>
                        <h1
                            className={`text-center text-xl sm:text-3xl font-semibold ${darkMode ? "text-white" : "text-black"
                                }`}
                        >
                            Choose your interests (Select 3)
                        </h1>
                        <div className="w-full mt-8">
                            {/* Interests tiles go here */}
                            {/* Assume interests are stored in an array */}
                            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-wrap gap-4">
                                {interests.map((interest, index) => (
                                    <div
                                        key={index}
                                        className={`px-4 py-2 rounded-md border-2 border-transparent cursor-pointer ${selectedInterests.includes(interest) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                                        onClick={() => handleInterestClick(interest)}
                                    >
                                        {interest}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={prevPage}
                            className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        >
                            <span className="ml-3">Back</span>
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={selectedInterests.length < 3}
                            className={`mt-3 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${selectedInterests.length < 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span className="ml-3">Next</span>
                        </button>
                    </>
                )}
                {currentPage === 3 && (
                    <>
                        <h1
                            className={`text-center text-xl sm:text-3xl font-semibold ${darkMode ? "text-white" : "text-black"
                                }`}
                        >
                            Choose a unique username
                        </h1>
                        <div className="w-full mt-8">
                            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                                <input
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <button
                                    onClick={prevPage}
                                    className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <span className="ml-3">Back</span>
                                </button>
                                <button
                                    onClick={handleFormSubmit}
                                    className="mt-3 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <span className="ml-3">Register</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Register;
