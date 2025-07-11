// src/pages/Login.tsx
import { useState } from "react";
import axios from "axios";

const clientId = "a861af35-d728-4e4b-8151-5b1f048db025";
const redirectUri = "http://localhost:5176/oauth/callback";

const Login = () => {
  const [userId, setUserId] = useState(() => sessionStorage.getItem("userId") || "");

  const login = () => {
    if (!userId) return alert("User ID is required");
    const state = Math.random().toString(36).substring(2);
    const url = `https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=contact_data%20offline_access&state=${state}&userId=${userId}`;
    sessionStorage.setItem("userId", userId);
    window.location.href = url;
  };

  const logout = async () => {
    try {
      await axios.post(`https://localhost:7272/api/auth/logout?userId=${userId}`);
      sessionStorage.removeItem("userId");
      alert("Logged out.");
      window.location.reload();
    } catch (err) {
      alert("Logout failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login to Constant Contact</h2>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <br />
      <button onClick={login}>Login</button>
      <br /><br />
      <button onClick={logout} disabled={!userId}>
        Logout
      </button>
    </div>
  );
};

export default Login;
