import React, { useState, Dispatch, SetStateAction } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

type TokenDepositSuccessProps = {
  setCurrentCard: Dispatch<SetStateAction<string>>;
};

const TokenDepositSuccess: React.FC<TokenDepositSuccessProps> = ({
  setCurrentCard,
}) => {
  return (
    <div className="flex flex-col mx-auto mt-[2.75rem] min-h-full">
      <main className="">
        <div className="flex flex-row mx-auto lg:max-w-[480px] gap-8">
          <section
            aria-labelledby="timeline-title"
            className="bg-white sm:rounded-2xl p-8 w-full flex flex-col justify-between h-[683px]"
            style={{
              boxShadow: "0 6px 15px 2px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex flex-col gap-10 justify-start items-start">
              <div className="text-20 font-paragraphs font-semibold leading-8">
                Tokens deposited successfully!
              </div>
              <div className="flex justify-center items-center px-[158px] py-[32px] bg-dark-100">
                <img src="confetti-icon.svg" height={100} width={100} />
              </div>
              <div className="flex flex-col gap-4 border-solid border-2 border-dark-100 rounded-8 p-4 w-full">
                <div className="flex flex-row justify-start items-center gap-2">
                  <img src="check-green.svg" height={24} width={24} />
                  <div className="text-16 font-paragraphs tracking-[-0.5px] text-dark-500">
                    <span className="text-16 font-paragraphs font-semibold tracking-[-0.5px] text-dark-500">
                      500 xDAI
                    </span>{" "}
                    successfully deposited in escrow
                  </div>
                </div>
                <div className="h-[1px] bg-dark-100 self-stretch"></div>
                <div className="text-14 font-paragraphs tracking-[-0.5px] text-dark-500">
                  Go to{" "}
                  <span className="text-14 font-paragraphs font-semibold tracking-[-0.5px] text-primary-500 underline">
                    My Orders
                  </span>{" "}
                  to keep track of buyers for this order.
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex flex-row items-center justify-center w-full max-h-[56px] rounded-lg bg-accent-1 px-6 py-4 gap-[10px]"
              onClick={() => {
                setCurrentCard("A");
              }}
            >
              <div className="text-16 font-semibold font-paragraphs leading-6 text-white">
                Back to home
              </div>
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TokenDepositSuccess;
