
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthPage from "../auth/page"; 

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/"); 
  }

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 border border-gray-400">
        <div className="flex h-20 w-full items-end rounded-lg bg-teal-300 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            {/* logo */}
          </div>
        </div>
        <AuthPage /> 
      </div>
    </main>
  );
}