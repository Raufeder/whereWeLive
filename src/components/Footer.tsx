import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="absolute bottom-0 right-0 left-0 bg-slate-800 border-t p-8">
      <footer className="flex flex-col justify-center items-center w-full">
        <p>Email: draufeisen1001@gmail.com TODO: MAKE THIS A LINK</p>
        <div className="flex justify-center items-center w-full">
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
        </div>
      </footer>
    </div>
  );
};

export default Footer;
