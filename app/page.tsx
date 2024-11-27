"use client";

import React, { useEffect, useState } from "react";
import { subscribeToOrderBook } from "@/service/websocket";
import { LineChart, Navbar } from "@/src/components";

interface OrderBookData {
  type: string;
  price: string;
}

const HomePage: React.FC = () => {
  const [currencyPair, setCurrencyPair] = useState("BTC-USD"); 
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const handlePairChange = (pair: string) => {
    setCurrencyPair(pair);
  };

  useEffect(() => {
    const unsubscribe = subscribeToOrderBook(currencyPair, (data: OrderBookData) => {
      if (data.type === 'ticker') {
        const price = parseFloat(data.price);
        setCurrentPrice(price);
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, [currencyPair]);

  return (
    <div className="container">
      <Navbar onPairChange={handlePairChange} />
      <h2 className="hidden">Current Price: {currentPrice ? `$${currentPrice.toFixed(2)}` : "Loading..."}</h2>
      <LineChart currencyPair={currencyPair} />
    </div>
  );
};

export default HomePage;