// src/pages/OAuthCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    const userId = sessionStorage.getItem("userId");

    if (!code || !userId) {
      navigate("/login");
      return;
    }

    const exchange = async () => {
      try {
        await api.post("/auth/exchange", { code, userId });
        navigate("/contacts");
      } catch {
        navigate("/login");
      }
    };

    exchange();
  }, []);

  return <div>Connecting to Constant Contact...</div>;
};

export default OAuthCallback;
