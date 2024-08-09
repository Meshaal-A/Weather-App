"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { github } from "../utils/Icons";
import ThemeDropdown from "./ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="w-full py-4 flex items-center justify-between">
      Navbar
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog></SearchDialog>
        <div className="btn-group flex items-center gap-2">
          {" "}
          <div className="btn-group flex items-center gap-2 ">
            <ThemeDropdown />
            <Button
              className="source-code flex items-center gap-2"
              onClick={() => {
                router.push("https://github.com");
              }}
            >
              {github} Source Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
