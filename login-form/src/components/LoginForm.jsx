import { useState } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordView() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <div>
        <input className="form-input" type="email" placeholder="Email" />
      </div>
      <div>
        <input
          className="form-input"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <button className="show-button" onClick={togglePasswordView}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button className="form-button">Login</button>
      <button className="form-button">Sign up</button>
    </>
  );
}

export default LoginForm;
