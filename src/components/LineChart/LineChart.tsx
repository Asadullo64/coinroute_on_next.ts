"use client";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { subscribeToOrderBook } from "@/service/websocket";
import { TopOfBook } from "../TopOfBook";
import { LadderView } from "../LadderView"; 

import styles from "./style.module.scss";

interface TickerMessage {
  type: string;
  price: string;
}

export const LineChart: React.FC<{ currencyPair: string }> = ({
  currencyPair,
}) => {
  const [priceData, setPriceData] = useState<{ price: number; time: number }[]>(
    []
  );
  const [bestBidData, setBestBidData] = useState<
    { price: number; time: number }[]
  >([]);
  const [bestAskData, setBestAskData] = useState<
    { price: number; time: number }[]
  >([]);

  useEffect(() => {
    let lastPrice = 0;

    const handleOrderBookMessage = (data: TickerMessage) => {
      if (data.type === "ticker") {
        const price = parseFloat(data.price);
        const timestamp = Date.now();

        //Update main price
        setPriceData((prevData) => [...prevData, { price, time: timestamp }]);

     
        if (price > lastPrice) {
          setBestBidData((prevData) => [
            ...prevData,
            { price: price - 0.5, time: timestamp },
          ]);
          setBestAskData((prevData) => [
            ...prevData,
            { price: price + 0.5, time: timestamp },
          ]);
        } else {
          setBestBidData((prevData) => [
            ...prevData,
            { price: price + 0.5, time: timestamp },
          ]);
          setBestAskData((prevData) => [
            ...prevData,
            { price: price - 0.5, time: timestamp },
          ]);
        }
        lastPrice = price;
      }
    };

    const unsubscribe = subscribeToOrderBook(
      currencyPair,
      handleOrderBookMessage
    );

    return () => {
      unsubscribe();
    };
  }, [currencyPair]);

  const options = {
    chart: {
      type: "line",
      zoomType: "x",
    },
    title: {
      text: `Price Chart for ${currencyPair}`,
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Time",
      },
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: [
      {
        name: "Best Bid",
        data: bestBidData.map((entry) => [entry.time, entry.price]),
        color: "green",
        marker: {
          enabled: true,
        },
      },
      {
        name: "Best Ask",
        data: bestAskData.map((entry) => [entry.time, entry.price]),
        color: "red",
        marker: {
          enabled: true,
        },
      },
    ],
  };

  return (
      <div className={styles["price-chart"]}>
        <div className={styles.prices}>
          <div>
            <TopOfBook
              bestBid={bestBidData[bestBidData.length - 1]?.price}
              bestAsk={bestAskData[bestAskData.length - 1]?.price}
            />
          </div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <LadderView
          coinRoutes={bestBidData.map((bid, index) => ({
            price: bid.price,
            best_bid: bid.price,
            best_ask: bestAskData[index]?.price || 0,
          }))}
        />
      </div>
  );
};
