import React from "react";
import styles from './style.module.scss'

interface TopOfBookProps {
  bestBid: number | null;
  bestAsk: number | null;
}

export const TopOfBook: React.FC<TopOfBookProps> = ({ bestBid, bestAsk }) => {
  const formattedBestBid = (bestBid ?? 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedBestAsk = (bestAsk ?? 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <div className={styles.prices}>
      {bestBid !== null && <div className={styles.prices__bestBid}>Best Bid: {formattedBestBid}</div>}
      {bestAsk !== null && <div className={styles.prices__bestAsk}>Best Ask: {formattedBestAsk}</div>}
    </div>
  );
};
