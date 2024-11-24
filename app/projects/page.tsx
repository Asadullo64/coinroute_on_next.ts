import Link from "next/link";
import React from "react";

const Projectpage = () => {
  return (
    <div className="container">
      <Link href={"/"}>
        <button>Back</button>
      </Link>
      <br />
      <h1>More Information about my other projects</h1>
      <div className="project">
        <h3>Links site:</h3>
        <a href="https://project-on-nextjs-b823.vercel.app/">
          https://project-on-nextjs-b823.vercel.app/
        </a>
        <h3>Links GitHub:</h3>
        <a href="https://github.com/Asadullo64/project_on_nextjs">
         Asadullo64/project_on_nextjs
        </a>
      </div>
    </div>
  );
};

export default Projectpage;
