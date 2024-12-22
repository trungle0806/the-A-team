import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './LoginWithGoogle.css'

const LoginWithGoogle = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.google) {
      console.error("Google SDK chưa được tải.");
      return;
    }

    window.google.accounts.id.initialize({
      client_id:
        "1029470407015-aaqinqbadbk57cu50khjfl44ubmg08tv.apps.googleusercontent.com",
      callback: handleGoogleLogin,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleGoogleLogin = (response) => {
    console.log("Google Response:", response);

    if (response && response.credential) {
      onLoginSuccess(response.credential);

      // Chuyển hướng với thông báo
      navigate("/", {
        state: {
          message:
            "Chúc mừng bạn đã đăng nhập thành công!, Charity Navigator chúc bạn có một trải nghiệm thật nhiều thú vị.",
        },
      });
    } else {
      console.error("Google login failed: No credential received.");
    }
  };

  return <div id="google-login-btn"></div>;
};

export default LoginWithGoogle;