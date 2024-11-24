"use client"

import React, { useEffect, useState } from "react";
import styles from "./style.module.scss"; 

interface LadderViewProps {
  coinRoutes: {
    price: number;
    best_bid: number;
    best_ask: number;
  }[];
}

export const LadderView: React.FC<LadderViewProps> = ({ coinRoutes }) => {
// Local state to keep track of previous prices
  const [prevPrices, setPrevPrices] = useState<{ [key: number]: number }>({});

  useEffect(() => {
   // Update the previous state of prices
    const updatedPrices: { [key: number]: number } = {};
    coinRoutes.forEach((route, index) => {
      updatedPrices[index] = route.price;
    });
    setPrevPrices(updatedPrices);
  }, [coinRoutes]);

  // Function to determine the price change class
  const getPriceChangeClass = (price: number, prevPrice: number | undefined) => {
    if (prevPrice === undefined) return ""; // Если данных нет, возвращаем пустой класс
    if (price > prevPrice) return styles["price-up"]; // Зеленый, если цена растет
    if (price < prevPrice) return styles["price-down"]; // Красный, если цена падает
    return ""; // If the price has not changed
  };

  return (
    <div className={styles["ladder-view"]}>
      {/* Buy Orders */}
      <div className={`${styles["orders-container"]} ${styles["buy-orders"]}`}>
        <div className={styles["orders-header"]}>
          <span>Buy Orders</span>
        </div>
        <div className={styles["orders-table"]}>
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {coinRoutes.length > 0 ? (
                [...coinRoutes] // Create a copy of the array
                  .filter((route) => route.best_bid > 0) // Filter for Buy
                  .reverse() // Display the array in reverse order
                  .map((route, index) => {
                    const prevPrice = prevPrices[index]; // Previous price
                    return (
                      <tr
                        key={index}
                        className={`${styles["highlight"]} ${getPriceChangeClass(
                          route.price,
                          prevPrice
                        )}`} 
                      >
                        <td>{route.price}</td>
                        <td>{route.best_bid}</td>
                        <td>
                          {(
                            parseFloat(route.price.toString()) *
                            parseFloat(route.best_bid.toString())
                          ).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={3}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sell Orders */}
      <div className={`${styles["orders-container"]} ${styles["sell-orders"]}`}>
        <div className={styles["orders-header"]}>
          <span>Sell Orders</span>
        </div>
        <div className={styles["orders-table"]}>
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {coinRoutes.length > 0 ? (
                [...coinRoutes] // Create a copy of the array
                  .filter((route) => route.best_ask > 0) // Filter for Sell
                  .reverse() // Display the array in reverse order
                  .map((route, index) => {
                    const prevPrice = prevPrices[index]; // Previous price
                    return (
                      <tr
                        key={index}
                        className={`${styles["sell-highlight"]} ${getPriceChangeClass(
                          route.price,
                          prevPrice
                        )}`}
                      >
                        <td>{route.price}</td>
                        <td>{route.best_ask}</td>
                        <td>
                          {(
                            parseFloat(route.price.toString()) *
                            parseFloat(route.best_ask.toString())
                          ).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={3}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
