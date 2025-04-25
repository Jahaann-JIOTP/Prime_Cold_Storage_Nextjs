import React from "react";


const TopHeader = () => {
  



  return (
    <header className="h-12 flex items-center justify-between px-4">
      <div className="flex items-center">
        <img src="./Prime_logo.png" className="h-14" alt="Logo" />
      </div>
      <div className="header-right flex items-center space-x-4">
        
        <img
          src={"./jahaann.svg"}
          alt="User Image"
          className={`h-[30px]`}
        />
      </div>
    </header>
  );
};

export default TopHeader;
