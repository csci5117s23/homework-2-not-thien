import React from "react";
import Image from "next/image";
import photo from "./404.png";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <div className="center">
        <h1>Oh no! i think we're lost</h1>
      </div>
      <div className="center">
        <h2>
          <Link className="hover" href="/todos">
            Go Back Home
          </Link>
        </h2>
      </div>
      <div className="center">
        <Image src={photo} width={300} height={300} />
      </div>
    </>
  );
}
