import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="absolute bottom-0 right-0 left-0 bg-slate-700 border-t p-8">
      <footer className="flex justify-center items-center w-full">
        <p>Email: draufeisen1001@gmail.com</p>
        <a
          href="https://www.linkedin.com/in/derek-raufeisen-9b3664189/"
          target="_blank"
          rel="noreferrer"
          className="hover:scale-110"
        >
          <Image
            src="/linkedin.png"
            alt="linkedin"
            className=""
            width={50}
            height={50}
          />
        </a>
        <a
          href="https://github.com/Raufeder"
          target="_blank"
          rel="noreferrer"
          className="hover:scale-110"
        >
          <Image
            src="/github.png"
            alt="github"
            className=""
            width={50}
            height={50}
          />
        </a>
      </footer>
    </div>
  );
};

export default Footer;
