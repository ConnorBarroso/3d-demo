"use client";

import React, { useState, useEffect } from "react";
import Graphs from "./components/Graphs/Graphs";
import { handleGet } from "./utils";
import Link from "next/link";
export interface GraphData {
  timestamps: string[];
  prices: number[];
}
export default function Home() {
  const [graphData, setGraphData] = useState<GraphData | null>();

  const [isLine, setIsLine] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  let graffiti = "Change to Bar";
  if (!isLine) graffiti = "Change to Line";

  const handleToggle = () => {
    setIsLine(!isLine);
  };
  //auto retrieves coinGecko data
  useEffect(() => {
    const handleRequest = async () => {
      setLoading(true);
      const res = await fetch("/api/getData");
      const data = await res.json();

      setGraphData(data);
      setLoading(false);
    };
    if (!graphData) {
      handleRequest();
    }
  }, [graphData, loading]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white p-[20px] rounded-[5%] ">
        {loading ? (
          <div className="w-[550px] h-[400px]">
            <h1 className="text-gray-500">Loading...</h1>
          </div>
        ) : (
          graphData && <Graphs graphData={graphData} isLine={isLine} />
        )}
        <h1
          onClick={handleToggle}
          className="flex justify-center text-[30px] bg-gray-500 border border-white rounded-[50px] p-4 cursor-pointer"
        >
          {graffiti}
        </h1>
      </div>
    </main>
  );
}
