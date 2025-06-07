"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "../../services/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { ok, data } = await registerUser(form);
      if (ok) {
        alert("Register successful!");
        router.push("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "40px 32px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(31, 41, 55, 0.15)",
          minWidth: 340,
        }}
      >
        <h2 style={{ marginBottom: 24, color: "#1e293b", fontWeight: 700, letterSpacing: 1 }}>
          Register
        </h2>
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#f8fafc",
              fontSize: 16,
              outline: "none",
              transition: "border 0.2s",
              boxSizing: "border-box",
              color: "#232526",
            }}
            onFocus={e => (e.target.style.border = "1.5px solid #6366f1")}
            onBlur={e => (e.target.style.border = "1px solid #cbd5e1")}
            className="gray-placeholder"
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#f8fafc",
              fontSize: 16,
              outline: "none",
              transition: "border 0.2s",
              boxSizing: "border-box",
              color: "#232526",
            }}
            onFocus={e => (e.target.style.border = "1.5px solid #6366f1")}
            onBlur={e => (e.target.style.border = "1px solid #cbd5e1")}
            className="gray-placeholder"
          />
        </div>
        <div style={{ marginBottom: 28 }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#f8fafc",
              fontSize: 16,
              outline: "none",
              transition: "border 0.2s",
              boxSizing: "border-box",
              color: "#232526",
            }}
            onFocus={e => (e.target.style.border = "1.5px solid #6366f1")}
            onBlur={e => (e.target.style.border = "1px solid #cbd5e1")}
            className="gray-placeholder"
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: "8px",
            background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(99, 102, 241, 0.08)",
            transition: "background 0.2s",
          }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div style={{ marginTop: 24, textAlign: "center", color: "#333" }}>
          Already have an account, go to{" "}
          <Link href="/login" style={{ color: "#6366f1", textDecoration: "underline" }}>
            login?
          </Link>
        </div>
      </form>
      <style jsx global>{`
        .gray-placeholder::placeholder {
          color: #888 !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}