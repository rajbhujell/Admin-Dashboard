"use client";

import { useState } from "react";
import styles from "@app/ui/login/login.module.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = {
      username: process.env.NEXT_PUBLIC_LOGIN_USERNAME,
      password: process.env.NEXT_PUBLIC_LOGIN_PASSWORD,
    };

    if (
      credentials.username === login.username &&
      credentials.password === login.password
    ) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
      setCredentials({
        username: "",
        password: "",
      });
    } else {
      setError("Invalid username or password*");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const res = await signIn("google", { callbackUrl: "/dashboard" });
      if (!res?.ok) {
        setError("Google login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          className={styles.input}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle size={20} /> Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
