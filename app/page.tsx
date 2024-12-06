import Image from "next/image";
import {Poppins} from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const font = Poppins(
  {
    subsets: ["latin"],
    weight:["600"]
  }
)

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
     <div className="space-y-6 text-center">
      <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>
        🔐SecureLah
      </h1>
      <p className="text-white text-lg font-bold">
        Your Most Trustworthy AI-Driven Anti-Phish and Security Protection Guardian
      </p>
      <div className="mt-3">
        <Link href = "/auth/login">
          <Button size={"lg"}>
              Sign In
          </Button>
        </Link>
      </div>
     </div>
    </div>
  );
}
