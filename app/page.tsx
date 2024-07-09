"use client";

import React, { useState, useEffect } from "react";
import Graphs from "./components/Graphs/Graphs";
import { handleGet } from "./utils";
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

  const handleRequest = async () => {
    if (!loading) setLoading(true);
    const newData = await handleGet();
    setGraphData(newData);
    setLoading(false);
  };

  const handleToggle = () => {
    setIsLine(!isLine);
  };
  //auto retrieves coinGecko data
  useEffect(() => {
    if (!graphData) {
      handleRequest();
    }
  }, [graphData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1
        onClick={handleToggle}
        className="flex justify-center text-[30px] bg-gray-500 border border-white rounded-[50px] p-4 cursor-pointer"
      >
        {graffiti}
      </h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        graphData && <Graphs graphData={graphData} isLine={isLine} />
      )}
    </main>
  );
}
