import { useState, useEffect } from "react";
import type { userForm } from "../types/Types";
import { handlRegister } from "../redux/Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleChange } from "../utils/utils";
import type { AppDispatch, RootState } from "../redux/Store";

const Register = () => {
  const [form, setForm] = useState<userForm>({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.loggedInUser);

  useEffect(() => {
    if (user && user.userId) {
      navigate("/");
    }
  }, [user, navigate]);

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
          maxWidth: "440px",
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
            ✨
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>Create Account</h2>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            Join SwashStore for exclusive member deals
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Full Name
            </label>
            <input
              placeholder="e.g. Alex Johnson"
              value={form.username}
              onChange={(e) => { handleChange(e, setForm); }}
              name="username"
              type="text"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                backgroundColor: "#f8fafc",
                boxSizing: "border-box",
              }}
            />
          </div>

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
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Password
            </label>
            <input
              placeholder="Create a strong password"
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
              }}
            />
          </div>

          <button
            type="submit"
            onClick={(e) => { dispatch(handlRegister(e, form)); }}
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
            Create Free Account
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "#64748b" }}>
          Already have an account?{" "}
          <Link to="/user/login" style={{ color: "#4f46e5", fontWeight: 700 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;