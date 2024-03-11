import React from "react";

const WithdrawTokensModalForm: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col bg-dark-100 w-full gap-4 py-4 px-6 rounded-8 justify-start items-start mb-8">
            <div className="flex flex-col gap-2">
              <div className="text-12 font-paragraphs font-semibold text-dark-400 leading-[18px] tracking-[-0.5px]">
                Liquidity pair
              </div>
              <div className="flex flex-row justify-start items-center gap-1">
                <div className="flex flex-row gap-1">
                  <img src="xdai-logo.png" height={24} width={24} />
                  <div className="text-16 font-paragraphs font-semibold text-dark-500 leading-6 tracking-[-0.5px]">
                    xDai
                  </div>
                </div>
                <div className="text-16 font-paragraphs font-semibold text-dark-500 leading-6 tracking-[-0.5px]">
                  -
                </div>
                <div className="flex flex-row gap-1">
                  <img src="ic_paypal.svg" height={24} width={24} />
                  <div className="text-16 font-paragraphs font-semibold text-dark-500 leading-6 tracking-[-0.5px]">
                    PayPal
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-dark-500 h-[1px] opacity-[15%]"></div>
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-row justify-between items-center">
                <div className="text-12 font-paragraphs font-semibold text-dark-400 leading-[18px] tracking-[-0.5px]">
                  Available to withdraw
                </div>
                <div className="flex flex-row gap-1">
                  <div className="text-12 font-paragraphs font-semibold text-dark-400 leading-[18px] tracking-[-0.5px]">
                    Tokens locked
                  </div>
                  <img
                    src="information-circle-lined.svg"
                    height={16}
                    width={16}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-16 font-paragraphs font-semibold leading-6 tracking-[-0.5px]">
                  60 xDai
                </div>
                <div className="text-16 font-paragraphs font-semibold leading-6 tracking-[-0.5px]">
                  10 xDai
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-7">
            <div className="flex justify-between items-center mb-[2px]">
              <div className="text-12 font-paragraphs font-semibold text-dark-500 leading-[18px] tracking-[-0.5px]">
                Withdrawal amount
              </div>
              <div className="text-12 font-paragraphs font-semibold text-primary-500 leading-[18px] tracking-[-0.5px]">
                Max amount
              </div>
            </div>
            <input
              type="number"
              className="w-full h-12 rounded-8 bg-white border border-solid border-dark-dark-200 p-4 text-16 font-paragraphs font-semibold leading-6 tracking-[-0.5px] mb-1"
            ></input>
            <div className="text-12 font-paragraphs text-dark-400 leading-[18px] tracking-[-0.5px]">
              Tokens will be withdrawn directly to your wallet
            </div>
          </div>
          <div className="bg-primary-500 flex justify-center items-center gap-[10px] px-6 py-3 rounded-8 cursor-pointer h-14">
            <div className="text-16 font-paragraphs font-semibold leading-6 tracking-[-0.5px] text-white">
              Withdraw tokens
            </div>
            <img src="spinner-white.svg" height={24} width={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawTokensModalForm;
