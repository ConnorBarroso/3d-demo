"use client";

import React, { useState, useEffect } from "react";
import Graphs from "./components/Graphs/Graphs";
import NewCoinForm from "./components/NewCoinForm/NewCoinForm";
import usePrevious from "./hooks/usePrevious";

export interface GraphData {
  timestamps: string[];
  prices: number[];
  coinId: string;
}

export default function Home() {
  const [graphData, setGraphData] = useState<GraphData[] | null>(null);
  const [queryId, setQueryId] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");
  const prevCurrency = usePrevious(currency);
  const [isLine, setIsLine] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  let graffiti = "Change to Bar";
  if (!isLine) graffiti = "Change to Line";

  const handleQuery = (id: string, curr: string): void => {
    if (!graphData?.some((coin) => coin.coinId === id)) {
      setQueryId(id);
    }

    if (curr !== currency) {
      setCurrency(curr);
    }
  };

  const handleToggle = () => {
    setIsLine(!isLine);
  };

  const handleRequest = async (id: string, curr: string) => {
    const res = await fetch(`/api/getData?coinId=${id}&currency=${curr}`);
    const resData = await res.json();
    if (resData.status !== 200) {
      console.error(`ERROR CODE: ${resData.status}`);
      return null;
    }
    return {
      timestamps: resData.timestamps,
      prices: resData.prices,
      coinId: resData.coinId,
    };
  };

  useEffect(() => {
    if (!graphData || graphData.every((coin) => coin.coinId !== queryId)) {
      setLoading(true);
      handleRequest(queryId, currency).then(async (data) => {
        if (data) {
          setGraphData((prevData) => {
            if (prevData === null) {
              return [data];
            }
            if (prevData.length >= 3) {
              return [...prevData.slice(1), data];
            }
            return [...prevData, data];
          });
        }
        setLoading(false);
      });
    }
  }, [graphData, queryId]);

  useEffect(() => {
    if (!graphData) return;
    if (prevCurrency !== currency) {
      setLoading(true);
      // use Promise.all instead of async / await for faster loading
      Promise.all(
        graphData?.map((coin) => handleRequest(coin.coinId, currency)) || []
      ).then((newGraphData) => {
        setGraphData(
          newGraphData.filter((coin) => coin !== null) as GraphData[]
        );
        setLoading(false);
      });
    }
  }, [currency, prevCurrency]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex-column content-center bg-white rounded-[5%] p-[15px]">
        {loading ? (
          <div className="w-[550px] h-[400px] flex justify-center items-center">
            <h1 className="text-gray-500">Loading...</h1>
          </div>
        ) : (
          graphData && (
            <Graphs graphData={graphData} currency={currency} isLine={isLine} />
          )
        )}
        <div className="flex justify-between h-[60px] mt-[5px] bg-gray-500 ">
          <NewCoinForm handleQuery={handleQuery} />
          <button
            onClick={handleToggle}
            className="flex justify-center items-center text-[18px] w-[35%] h-[100%] pr-[4px] cursor-pointer"
          >
            {graffiti}
          </button>
        </div>
      </div>
    </main>
  );
}
