import React, { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

type SellPageDefaultProps = {
  addNewPosition: any;
};

const SellPageDefault: React.FC<SellPageDefaultProps> = ({
  addNewPosition,
}) => {
  return (
    <div className="flex flex-col mx-auto mt-8 min-h-full">
      <main className="">
        <div className="flex flex-row mx-auto justify-between items-center lg:max-w-[737px] gap-8">
          <div className="text-dark-800 text-32 font-bold font-headings">
            My liquidity
          </div>
          <div className="flex flex-row justify-center items-center bg-dark-800 rounded-8 py-2 px-4 hover:cursor-pointer">
            <div
              className="text-white text-14 mr-2"
              onClick={() => addNewPosition()}
            >
              Add new position
            </div>
            <div className="text-white text-18 ml-2">+</div>
          </div>
        </div>
        <div className="flex flex-row mx-auto mt-8 lg:max-w-[736px] gap-8">
          <section
            aria-labelledby="timeline-title"
            className="bg-white sm:rounded-2xl p-14 w-full"
            style={{
              boxShadow: "0 6px 15px 2px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex flex-col items-center">
              <div
                style={{ backgroundImage: 'url("/view-grid-add.svg")' }}
                className="h-16 w-16"
              ></div>
              <div className="text-dark-500 text-16 font-normal font-paragraphs mt-6">
                Your active liquidity positions will be shown here.
              </div>
              <div className="flex flex-row gap-2 items-center justify-between mt-4">
                <div className="text-primary-500 text-16 font-bold font-paragraphs">
                  Learn More
                </div>
                <img src="external-link.svg" alt="" height={16} width={16} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SellPageDefault;
