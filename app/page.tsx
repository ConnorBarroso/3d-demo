import Image from "next/image";

export default function Home() {
  const graffiti = "it's ya boy Cannah ;)";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-[30px] bg-gray-500 border border-white rounded-[50px] p-4 cursor-help">
          {graffiti}
        </h1>
      </div>
    </main>
  );
}
