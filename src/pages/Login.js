import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toast'
// import cryptoJs from 'crypto-js'
import CryptoJS from 'crypto-js';
import SHA256 from 'crypto-js/sha256';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import Loading from '../components/Loading'
import { UserContext } from '../context/UserContext'

export const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const { setUserdata } = useContext(UserContext);
  const {setRole}=useContext(UserContext)
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    gender: "",
  });
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
  const navigate = useNavigate();
  const handleLogout = () => {
    googleLogout();
  }
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const encryptKey = (data) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    return ciphertext;
  };

  const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText);
  };
  const sendOtp = async () => {
    try {
      setLoading(true);
      await axios.post("http://4.213.163.165:8090/user/send-otp-forget-password", { userName: forgotEmail }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      toast.success("OTP sent! Please check your email.");
      setOtpSent(true);
    } catch (error) {
      toast.error("Failed to send OTP: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      await axios.post("http://4.213.163.165:8090/user/verify-otp-forget-password", { userName: forgotEmail, providedOtp: otp }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      toast.success("Password credentials sent to your email!");
      setIsForgotPassword(false);
      setOtpSent(false);
      setForgotEmail("");
      setOtp("");
    } catch (error) {
      toast.error("OTP verification failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSignUp) {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://4.213.163.165:8090/user/register",
          signupData,
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        console.log("Signup Success:", response.data);
        toast.success("Sign up successful!");
        setIsSignUp(!isSignUp);
      } catch (error) {
        toast.error("Sign up failed: " + (error.response?.data?.message || error.message));
        console.error("Signup failed:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
      setLoading(true);
      const loginResponse = await axios.post(
        "http://4.213.163.165:8090/user/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login Success:", loginResponse.data);
      const encryptedToken = encryptKey(loginResponse.data.data);
      sessionStorage.setItem("jwt", encryptedToken);
      toast.success("Sign in successful!");
      const profileResponse = await axios.get(
        "http://4.213.163.165:8090/user/logged-in-user-profile",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + decryptData(sessionStorage.getItem("jwt")),
          },
        }
      );
      console.log("Profile fetched:", profileResponse.data);
      const userProfile = profileResponse.data.data;
      setUserdata(userProfile);

      const role = userProfile.role;
      // let role="ADMIN";
      // role="USER"
      setRole(role);
      sessionStorage.setItem("role", role);
      if (role === "ADMIN") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (error) {
      toast.error("Sign in failed: " + (error.response?.data?.message || error.message));
      console.error("Sign in failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
    }
  }
  return (
    <>
      {isLoading && <Loading />}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="bg-gray-800 py-10 px-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              {/* we will add logo here */}
              <span className="text-2xl text-blue-400 font-bold">ExamPortal</span>
            </div>
            <h2 className="text-white text-xl font-semibold mb-1">
              {isSignUp ? "Create Account" : "Welcome Back!"}
            </h2>
            <p className="text-gray-400 text-sm">
              {isSignUp ? "Sign up to start your learning journey." : "Sign in to continue your learning journey."}
            </p>
          </div>
          {isForgotPassword ? (
            <div>
              <label className="block text-gray-300 mb-2">Enter your email for OTP</label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full rounded px-3 py-2 mb-3 bg-gray-700 text-white focus:outline-none"
                placeholder="Your email"
              />
              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full py-2 mb-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <label className="block text-gray-300 mb-2">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full rounded px-3 py-2 mb-3 bg-gray-700 text-white focus:outline-none"
                    placeholder="OTP"
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="w-full py-2 mb-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Verify OTP
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setOtpSent(false);
                  setForgotEmail("");
                  setOtp("");
                }}
                className="text-sm text-blue-400 underline"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <><form onSubmit={handleSubmit}>
              {isSignUp ? (
                <><div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="name">Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter your full name"
                    value={signupData.fullName}
                    onChange={handleSignupChange} />
                </div><div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={handleSignupChange} />
                  </div><div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="password">Mobile number</label>
                    <input
                      name="mobileNumber"
                      type="number"
                      className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                      placeholder="Enter your number"
                      value={signupData.mobileNumber}
                      onChange={handleSignupChange} />
                  </div><div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">Gender</label>
                    <input
                      name="gender"
                      type="text"
                      className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                      placeholder="Enter your gender"
                      value={signupData.gender}
                      onChange={handleSignupChange} />
                  </div>
                </>
              ) : (<>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="name">Username</label>
                  <input
                    name="userName"
                    type="text"
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter your username/email"
                    value={loginData.userName}
                    onChange={handleLoginChange} />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange} />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <label className="flex items-center text-gray-300">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-400 hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsForgotPassword(true);
                    }}
                  >
                    Forgot Password?
                  </a>
                </div>
              </>
              )}
              <button
                type="submit"
                className={`w-full ${isSignUp ? "bg-green-600 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-600"} text-white py-2 rounded mb-3 transition`}
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>

              <button
                type="button"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded mb-3 mt-2 transition"
                onClick={toggleForm}
              >
                {isSignUp ? "Already have an account? Log in" : "New user? Create account"}
              </button>
            </form><div className="flex justify-center">
                <GoogleLogin
                  onSuccess={async (credentialRespons) => {
                    console.log(credentialRespons)
                    console.log(jwtDecode(credentialRespons.credential))
                    // await setToken()
                    try {
                      const response = await axios.post(
                        "http://4.213.163.165:8090/auth/oauth/google",
                        { tokenId: credentialRespons.credential },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          }
                        }
                      )
                      console.log("Signin Success:", response.data)
                      const encryptedToken = encryptKey(response.data.data)
                      sessionStorage.setItem("jwt", encryptedToken)
                      toast.success("Sign in successful!")
                      navigate("/home", { replace: true })
                    } catch (error) {
                      toast.error("Sign in failed: " + (error.response?.data?.message || error.message))
                      console.error("Sign in failed:", error.response?.data || error.message)
                    }
                  }}
                  onError={(error) => console.log(error)}
                  auto_select={true} />
              </div><p className="mt-4 text-center text-xs text-gray-400">
                By signing in, you agree to ExamPortal’s <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
              </p></>
          )}
        </div>
      </div>
    </>
  )
}

