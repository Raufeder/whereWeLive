import React from "react";
import Tippy from "@tippyjs/react";
import Router from "next/router";
import { trpc } from "../../utils/trpc";
import CityPage from "../../components/CityPage";

const City: React.FC = ({}) => {
  return (
    <div className="md:flex min-h-screen items-center justify-center p-4 w-full text-gray-300">
      <CityPage />
    </div>
  );
};

export default City;
