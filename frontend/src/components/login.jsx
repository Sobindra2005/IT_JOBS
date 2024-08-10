import { useState } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../portConfig";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginhandle = async (e) => {
    e.preventDefault();
    try {
      const loginData = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      console.log(loginData);
      console.log(loginData);

      if (loginData.status === 200) {
        
        const token = await loginData.data;
        props.setshowSuccess(true);
        props.setpopupmessage("Login Successfully");
        props.setshowpopup(true);
        await localStorage.setItem("token", `${token}`);
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          props.setshowError(true);
          props.setpopupmessage("Invalid Email/Password");
          props.setshowpopup(true);
        } else {
          props.setshowError(true);
          props.setpopupmessage("An error occurred. Please try again later.");
          props.setshowpopup(true);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        props.setshowError(true);
        props.setpopupmessage(
          "No response from server. Please try again later."
        );
        props.setshowpopup(true);
      } else {
        console.error("Error message:", error.message);
        props.setshowError(true);
        props.setpopupmessage("An error occurred. Please try again later.");
        props.setshowpopup(true);
      }
    }
  };

  return (
    <>
      <div className="login-section z-8 m-auto mt-28">
        <h2 className="text-black text-lg pb-2 font-semibold text-center">
          ------- Login --------
        </h2>
        <form
          action="/login"
          method="post"
          onSubmit={loginhandle}
          className="login-form"
        >
          <div className="form-group">
            <label htmlFor="email" className="font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="lowercase "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
            <input
              className="normal "
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="example123"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
