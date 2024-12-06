import Image from "next/image";
import {Poppins} from "next/font/google";

const font = Poppins(
  {
    subsets: ["latin"],
    weight:["600"]
  }
)

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
     <div className="space-y-6 text-center">
      <h1></h1>
     </div>
    </div>
  );
}
