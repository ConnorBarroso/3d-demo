import { NextResponse, NextRequest } from "next/server";
import { format } from "date-fns";
const formatData = (array: number[], date: boolean) => {
  // takes every seventh date
  const filter = array.filter((_, i) => (i + 1) % 7 === 0);

  if (date) {
    return filter.map((timestamp) => format(new Date(timestamp), "dd/MM"));
  }
  return filter;
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const coinId = searchParams.get("coinId");
  const currency = searchParams.get("currency");
  const precision = searchParams.get("precision");

  if (!coinId || !currency || !precision) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  const options = {
    method: "GET",
    headers: {
      "x-cg-demo-api-key": `${process.env.API_KEY}`,
      accept: "application/json",
    },
  };
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=${currency}&from=1704142880&to=1720627294&precision=${precision}`;
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    let timestamps: number[] = [];
    let prices: number[] = [];
    data.prices.forEach((x: number[]) => {
      timestamps.push(x[0]);
      prices.push(x[1]);
    });

    const formatTimestamps = formatData(timestamps, true);
    const formatPrices = formatData(prices, false);

    return NextResponse.json({
      timestamps: formatTimestamps,
      prices: formatPrices,
      currency,
      coinId,
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch data", status: 500 });
  }
};
