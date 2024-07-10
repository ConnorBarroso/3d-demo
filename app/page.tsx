"use client";

import React, { useState, useEffect } from "react";
import Graphs from "./components/Graphs/Graphs";
import Link from "next/link";
export interface GraphData {
  timestamps: string[];
  prices: number[];
  currency: string;
  coinId: string;
}
export default function Home() {
  const [graphData, setGraphData] = useState<GraphData | null>();
  const [queryParams, setQueryParams] = useState({
    coinId: "bitcoin",
    currency: "usd",
    from: "	1704142880",
    to: "1720627294",
    precision: "2",
  });
  const [isLine, setIsLine] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  let graffiti = "Change to Bar";
  if (!isLine) graffiti = "Change to Line";

  const handleToggle = () => {
    setIsLine(!isLine);
  };
  //auto retrieves api data
  useEffect(() => {
    const handleRequest = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/getData?coinId=${queryParams.coinId}&currency=${queryParams.currency}&from=${queryParams.from}&to=${queryParams.to}&precision=${queryParams.precision}`
      );
      const data = await res.json();
      setGraphData(data);
      setLoading(false);
      console.log(graphData);
    };
    if (!graphData || graphData.coinId !== queryParams.coinId) {
      handleRequest();
    }
  }, [graphData, loading, queryParams]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" flex-column content-center bg-white p-[20px] rounded-[5%] ">
        {loading ? (
          <div className="w-[550px] h-[400px]">
            <h1 className="text-gray-500">Loading...</h1>
          </div>
        ) : (
          graphData && <Graphs graphData={graphData} isLine={isLine} />
        )}
        <button
          onClick={handleToggle}
          className="flex justify-center text-[30px] w-[100%] mt-[5px] bg-gray-500 border border-white rounded-[50px] p-4 cursor-pointer"
        >
          {graffiti}
        </button>
      </div>
    </main>
  );
}
