"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast , { Toaster }from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log(res.data);
      if (res.status === 200) {
        toast.success("successfully signed up");
        setUser({
          email: "",
          password: "",
          username: "",
        });
        router.push("/login");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.error);
      // console.log(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
  <h1>SignUp</h1>
      
      <h2>{loading ? "processing" : " "}</h2>
      <hr />
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="usename"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="p-3 text-black"
      />
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

      <button onClick={onSignup} className="border-2 border-white p-1">Signup here</button>
      <br />
      <Link href="/login">Visit Login</Link>
    </div>
  );
};

export default SignupPage;
