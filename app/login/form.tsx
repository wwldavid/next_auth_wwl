'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react"


export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    console.log({response});
    if(!response?.error){
      router.push("/");
      router.refresh();
    }
    

  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto max-w-md mt-20">
        <input 
          name="email" 
          className="border border-teal-500 text-black py-2 px-4 rounded" 
          type="email" 
          placeholder="Email"
        />
        <input 
          name="password" 
          className="border border-teal-500 text-black py-2 px-4 rounded" 
          type="password" 
          placeholder="Password"
        />
        <button 
          type="submit" 
          className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition duration-200"
        >
          Login
        </button>
      </form>
      

       <div className="flex flex-col gap-2 mx-auto max-w-md">
       <button 
        onClick={() => signIn("google")} 
        className="bg-white text-black border border-teal-500 py-2 px-4 rounded hover:bg-teal-100 transition duration-200 mt-4"
      >
        Login with Google
      </button>
      <button 
        onClick={() => signIn("github")} 
        className="bg-white text-black border border-teal-500 py-2 px-4 rounded hover:bg-teal-100 transition duration-200 mt-2"
      >
        Login with GitHub
      </button>
       </div>
      
    </div>
  );
}