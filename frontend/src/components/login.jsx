import { useState } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginhandle = async (e) => {
    e.preventDefault();
    try {
      const loginData = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
  
      if (loginData.status === 200) {
        const token = await loginData.data;
        await localStorage.setItem("token", `${token}`);
        window.location.reload();
      }
     
    } catch (error) {
      console.error("Login failed:", error);
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
