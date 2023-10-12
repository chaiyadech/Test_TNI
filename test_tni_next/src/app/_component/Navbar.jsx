import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <Image
              src="/tni-logo.png"
              alt="Vercel Logo"
              width={200}
              height={50}
              priority
            />
          </a>
          <h1>TNI Test NextJs</h1>
        </div>
      </nav>
    </>
  );
}