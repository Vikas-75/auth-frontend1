import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <Login
          onLogin={(user) => {
            console.log("Logged in:", user);
            // redirect to dashboard later
          }}
          onSignup={() => setIsLogin(false)} // 👈 THIS FIXES IT
        />
      ) : (
        <Signup
          onSignupSuccess={() => setIsLogin(true)}
          onLogin={() => setIsLogin(true)} // 👈 THIS FIXES IT
        />
      )}
    </>
  );
};

export default AuthPage;
