import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Text from "../components/BubbleText/Text";

const SERVERURL = 'http://localhost:3000';

const Login = () => {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [password, setPassword] = useState(localStorage.getItem("password") || "");
    const [registerError, setRegisterError] = useState(false);
    const [message, setMessage] = useState("Enter Valid Details!");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Set loading state to true when form is submitted

        try {
            const response = await axios.post(`${SERVERURL}/login`, formData);
            if (response.data.username === formData.username) {
                console.log("Login successful");
                localStorage.clear();
                localStorage.setItem("userData", JSON.stringify(response.data));

                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Error login:", err);
            setRegisterError(true);
            setMessage(err.response.data.message);
            setTimeout(() => {
                setRegisterError(false);
            }, 2000);
            // console.log(error.response.data);
        } finally {
            setLoading(false); // Set loading state to false when request is completed
        }
    };

    return (
        <div className="bg-darkgrey w-full h-screen flex flex-col lg:flex-row lg:items-center">
            <div className="leftSide w-full lg:w-[40%]">
                {/* <img
                    src={LightLogo}
                    alt="krishiseva logo light mode"
                    width={299}
                    className="mx-auto"
                /> */}
            </div>
            <div className="rightSide flex flex-col">
                <div className="font-bold text-center mx-3 text-maingreen text-[19px] lg:text-3xl">
                    {/* <Text text={"Start enjoying studying with us "} /> */}

                    Hello there we are happy to see you again
                </div>
                <form
                    className="flex flex-col justify-center items-center mt-24"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        className="bg-[#D9D9D9] text-black p-5 rounded-xl m-3b lg:w-[800px]"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className=" text-black p-5 bg-[#D9D9D9] rounded-xl m-3 lg:w-[800px]"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-maingreen w-[150px] p-5 rounded-xl m-3 lg:w-[300px] lg:mt-5 text-[#0a210f] font-bold hover:bg-[#3ecf8e8e] focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-opacity-50"
                    // ref={loginButtonRef}
                    >
                        {loading ? "Logging in..." : "Get Started"}
                    </button>
                    {registerError && (<div className="text-red-500 text-lg font-semibold">{message}</div>)}
                </form>
                <div className="mt-14 mx-auto">
                    <div href="/" className="ml-2 text-maingreen opacity-70">
                        <Link to="/register"> Not our part yet ? Join Now</Link>
                    </div>
                    {/* {showSplash && (
                        <Splash
                            onComplete={() => setShowSplash(false)}
                            startPosition={splashStartPosition}
                        />
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Login;