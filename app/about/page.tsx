import Link from "next/link";
import React from "react";

const Aboutpage = () => {
  return (
    <div className="container">
      <Link href={"/"}>
        <button>Back</button>
      </Link>
      <h1>### About the CoinRoutes Project</h1>
      <p>
        The <strong>CoinRoutes Project</strong> is a demonstration of my skills
        in frontend development, focusing on real-time data processing and
        visualization using WebSockets. The main goal of this project was to
        showcase my ability to work with dynamic data streams and build an
        interactive user interface for a cryptocurrency order book system.
      </p>
      <ul>
        <h2>Key features of the project include:</h2>
        <li>
          <strong>Real-time Data Integration:</strong> Leveraging WebSocket
          APIs to fetch live market data, such as order books, price ladders,
          and top-of-book information for various cryptocurrency pairs.
        </li>
        <br />
        <li>
          <strong>Interactive Visualizations:</strong> Implementing widgets
          like price charts, currency pair selectors, and dynamic tables to
          represent market data effectively.
        </li>
        <br />
        <li>
          <strong>State Management:</strong> Using Redux to ensure smooth data
          flow and manage complex application states efficiently.
        </li>
        <br />
        <li>
          <strong>Adaptive Design:</strong> Ensuring the app is fully responsive
          and provides a seamless user experience across different devices.
        </li>
        <br />
      </ul>
      <p>
        This project challenged me to think critically and learn new tools,
        especially in the realm of WebSockets and real-time applications.
        Although I&apos;m not yet at the level of a seasoned professional, I am
        constantly improving my skills and striving to build more complex and
        robust applications.
      </p>
      <br />
      <p>
        The CoinRoutes Project reflects my dedication to learning,
        problem-solving, and applying my knowledge to practical scenarios. It&apos;s
        a significant step in my journey as a developer, and I look forward to
        taking on more advanced projects in the future.
      </p>
    </div>
  );
};

export default Aboutpage;
