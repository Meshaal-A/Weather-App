import Image from "next/image";
import Navbar from "./Components/Navbar";

export default function Home() {
  return (
    <main className="mx-[rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
    </main>
  );
}
