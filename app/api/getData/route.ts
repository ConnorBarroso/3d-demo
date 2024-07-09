import { NextResponse } from "next/server";
import { format } from "date-fns";

export const GET = async () => {
  const params = {
    coinId: "bitcoin",
    currency: "usd",
    from: "1704150201",
    to: "1720476201",
    precision: "2",
  };
  const options = {
    method: "GET",
    headers: {
      "x-cg-demo-api-key": `${process.env.API_KEY}`,
      accept: "application/json",
    },
  };
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=${params.currency}&from=${params.from}&to=${params.to}&precision=${params.precision}`;
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    let timestamps: number[] = [];
    let prices: number[] = [];
    data.prices.forEach((x: number[]) => {
      timestamps.push(x[0]);
      prices.push(x[1]);
    });
    // takes every fifth date and formats it.
    const formatTimestamps = timestamps
      .filter((_, i) => (i + 1) % 7 === 0)
      .map((timestamp) => format(new Date(timestamp), "dd/MM"));

    const formatPrices = prices.filter((_, i) => (i + 1) % 7 === 0);

    return NextResponse.json({
      timestamps: formatTimestamps,
      prices: formatPrices,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};
