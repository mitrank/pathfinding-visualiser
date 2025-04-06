import React from "react";
import { Button } from "@/components/ui/button";

const Header = ({ setIsStartVisualise }) => {
  return (
    <div className="bg-[#003f5c] flex justify-center items-center p-4 gap-2">
      <h3 className="text-3xl text-white">Pathfinding Visualiser</h3>
      <Button
        className="ml-4 dark cursor-pointer"
        onClick={() => setIsStartVisualise(true)}
      >
        Visualise
      </Button>
    </div>
  );
};

export default Header;
