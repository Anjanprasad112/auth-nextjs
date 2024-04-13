"use client";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const ProfilePage = () => {
  const [data,Setdata] = useState("nothing");
  
  
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Successfully logged out');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getData = async ()=>{
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    Setdata(res.data.data._id);
  }
  return (
    <>
      <div className="flex items-center justify-center flex-col m-auto">
        <Toaster position="top-center" reverseOrder={false} />
        <div>Profile page</div>
        <div>
          {data === "nothing" ? "nothing is here" : <Link href={`/profile/${data}`}>{data}</Link>}
        </div>
        <div className="mt-3">
          <button onClick={logout} className="border-2 border-white p-2">
            Logout
          </button>
        </div>
        <div className="mt-3">
          <button onClick={getData} className="border-2 border-white p-2">
            Get Data
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
