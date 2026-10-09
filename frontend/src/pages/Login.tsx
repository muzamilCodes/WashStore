import { useState } from "react";
import type { userForm } from "../types/Types";
import { handlLogin } from "../redux/Actions/UserActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleChange } from "../utils/utils";
import type { AppDispatch } from "../redux/Store";

const Login = () => {
  const [form, setForm] = useState<userForm>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "40px 32px",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              margin: "0 auto 14px",
              boxShadow: "0 6px 16px rgba(79, 70, 229, 0.3)",
            }}
          >
            🔐
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>Welcome Back</h2>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            Sign in to access your orders and wishlist
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Email Address
            </label>
            <input
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => { handleChange(e, setForm); }}
              name="email"
              type="email"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                backgroundColor: "#f8fafc",
                boxSizing: "border-box",
                transition: "border 0.2s",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155" }}>
                Password
              </label>
              <a href="#" style={{ fontSize: "12px", color: "#4f46e5", fontWeight: 600 }}>Forgot?</a>
            </div>
            <input
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => { handleChange(e, setForm); }}
              name="password"
              type="password"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                backgroundColor: "#f8fafc",
                boxSizing: "border-box",
                transition: "border 0.2s",
              }}
            />
          </div>

          <button
            type="submit"
            onClick={(e) => { dispatch(handlLogin(e, form)); }}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              boxShadow: "0 8px 20px rgba(79, 70, 229, 0.35)",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "#64748b" }}>
          Don't have an account?{" "}
          <Link to="/user/register" style={{ color: "#4f46e5", fontWeight: 700 }}>
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
