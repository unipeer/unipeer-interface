import React from "react";

const WithdrawTokensModalSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center bg-dark-dark-100 rounded-8 py-8 px-6 w-full">
        <img
          src="confetti-icon.svg"
          height={80}
          width={80}
          className="mb-[40px]"
        />
        <div className="text-20 font-paragraphs leading-8 tracking-[-0.5px] text-dark-500 mb-2">
          Tokens withdrawn successfully!
        </div>
        <div className="flex flex-row gap-1 items-center">
          <div className="text-20 font-paragraphs font-semibold leading-8 tracking-[-0.5px] text-dark-500">
            25 xDAI
          </div>
          <img src="xdai-logo.png" className="h-[24px] w-[24px]" />
        </div>
      </div>
      <div className="bg-primary-500 flex justify-center items-center gap-[10px] px-6 py-3 rounded-8 cursor-pointer w-full mt-8 h-14">
        <div className="text-16 font-paragraphs font-semibold leading-6 tracking-[-0.5px] text-white">
          Back to my liquidity
        </div>
      </div>
    </div>
  );
};

export default WithdrawTokensModalSuccess;
