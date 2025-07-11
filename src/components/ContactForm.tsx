// src/pages/ContactForm.tsx
import { useEffect, useState } from "react";
import api from "../api";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [result, setResult] = useState<any>(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedId = sessionStorage.getItem("userId");
    if (storedId) setUserId(storedId);
    else window.location.href = "/login";
  }, []);

  const search = async () => {
    try {
      const res = await api.get("/contacts/search", {
        params: { email, userId },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const create = async () => {
    try {
      const res = await api.post(`/contacts/create?userId=${userId}`, {
        email,
        firstName: first,
        lastName: last,
        create_source: "Contact",
      });
      setResult(res.data);
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Contact</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        placeholder="First Name"
        value={first}
        onChange={(e) => setFirst(e.target.value)}
      />
      <br />
      <input
        placeholder="Last Name"
        value={last}
        onChange={(e) => setLast(e.target.value)}
      />
      <br />
      <button onClick={search}>Search</button>
      <button onClick={create}>Create</button>
      <pre>{result && JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default ContactForm;
