import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "48px 40px",
          borderRadius: "18px",
          boxShadow: "0 8px 32px rgba(31, 41, 55, 0.15)",
          minWidth: 340,
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: 32, color: "#1e293b", fontWeight: 700, letterSpacing: 1 }}>
          Welcome
        </h1>
        <Link href="/login" passHref>
          <button
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: "8px",
              background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 17,
              border: "none",
              cursor: "pointer",
              marginBottom: 18,
              boxShadow: "0 2px 8px rgba(99, 102, 241, 0.08)",
              transition: "background 0.2s",
            }}
          >
            Login
          </button>
        </Link>
        <Link href="/register" passHref>
          <button
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: "8px",
              background: "linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 17,
              border: "none",
              cursor: "pointer",
              marginBottom: 0,
              boxShadow: "0 2px 8px rgba(6, 182, 212, 0.08)",
              transition: "background 0.2s",
            }}
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}