import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const sendOtp = async () => {
    await axios.post("https://raja-fashion-clothing.onrender.com/api/auth/send-otp", { email });
    setStep(2);
  };

  const verifyOtp = async () => {
    await axios.post("https://raja-fashion-clothing.onrender.com/api/auth/verify-otp", {
      email,
      otp,
      newPassword: password
    });
    alert("Password reset successful");
    navigate("/login");
  };

  return (
    <div style={{ padding: 30 }} className="forgot-page">
      <div className="forgot-card">
        <h2>Forgot Password</h2>

      {step === 1 && (
        <>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input placeholder="OTP" onChange={e => setOtp(e.target.value)} />
          <input
            type="password"
            placeholder="New Password"
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={verifyOtp}>Reset Password</button>
        </>
      )}
      </div>
     
    </div>
    
  );
}
