"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log(res.data);
      if (res.status === 200) {
        toast.success("successfully logged in");
        setUser({
          email: "",
          password: "",
        });
        router.push("/profile");
      }
    } catch (err : any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <h2>{loading ? "processing" : ""}</h2>
      <hr />

      <br />
      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="p-3 text-black"
      />
      <br />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="p-3 text-black"
      />
      <br />

      <button onClick={onLogin} className="border-2 border-white p-1">Login here</button>
      <br />
      <Link href="/signup">Visit signup</Link>
    </div>
  );
};

export default LoginPage;
