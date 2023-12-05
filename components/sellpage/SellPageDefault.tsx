import React, { useState, useEffect } from "react";
import MyLiquidityPagination from "./MyLiquidityPagination";
import mockData from "./myliquiditymockdata";

import { useDispatch, useSelector } from "react-redux";
import {
  useAccount,
  useContract,
  useContractRead,
  useNetwork,
  useProvider,
} from "wagmi";
import { type Unipeer } from "../../contracts/types";
import UNIPEER_ABI from "../../contracts/Unipeer.json";
import { addresses, formatEtherscanLink } from "../../util";
import { constants } from "../../util";
import { myLiquidityItemslist } from "redux-api/actions/my-liquidity-actions";
import { BuyOrder } from "components/shared/types";
import { AppState } from "redux-api/reducers/root-reducer";

type SellPageDefaultProps = {
  addNewPosition: any;
};

const myLiquidityMockData = mockData;

// const myLiquidityMockData = [
//   {
//     id: 1,
//     from: "xDai",
//     to: "PayPal",
//     balance: 70,
//   },
//   {
//     id: 2,
//     from: "xDai",
//     to: "Venmo",
//     balance: 500000,
//   },
//   {
//     id: 3,
//     from: "USDC",
//     to: "PayPal",
//     balance: 250,
//   },
//   {
//     id: 4,
//     from: "USDT",
//     to: "Venmo",
//     balance: 1000,
//   },
//   {
//     id: 5,
//     from: "xDai",
//     to: "PayPal",
//     balance: 790,
//   },
// ];

const SellPageDefault: React.FC<SellPageDefaultProps> = ({
  addNewPosition,
}) => {
  const [myLiquidityArr, setMyLiquidityArr] = useState([]);
  const loading = useSelector(
    (state: AppState) => state.myLiquidityList.loading,
  );
  const success = useSelector(
    (state: AppState) => state.myLiquidityList.success,
  );
  const error = useSelector((state: AppState) => state.myLiquidityList.error);
  const responseData = useSelector(
    (state: AppState) => state.myLiquidityList.responseData,
  );

  const dispatch = useDispatch<any>();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const chainId = chain?.id || constants.defaultChainId;

  const Unipeer: Unipeer = useContract({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    dispatch(myLiquidityItemslist(address, chainId, Unipeer));
  }, [dispatch, address, chainId, Unipeer]);

  useEffect(() => {
    // console.log(responseData);
    if (responseData.length > 0) {
      setMyLiquidityArr(responseData);
    }
  }, [responseData]);

  return (
    <>
      <div className="flex flex-col mx-auto mt-8 min-h-full">
        <main className="">
          <div className="flex flex-row mx-auto justify-between items-center lg:max-w-[737px] gap-8">
            <div className="text-dark-800 text-32 font-bold font-headings">
              My liquidity
            </div>
            <div
              className="flex flex-row justify-center items-center bg-dark-800 rounded-8 py-2 px-4 hover:cursor-pointer"
              onClick={() => addNewPosition()}
            >
              <div className="text-white text-14 mr-2">Add new position</div>
              <div className="text-white text-18 ml-2">+</div>
            </div>
          </div>
          <div className="flex flex-row mx-auto mt-8 lg:max-w-[736px] gap-8">
            {myLiquidityArr.length > 0 ? (
              <MyLiquidityPagination cardData={myLiquidityArr} />
            ) : (
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
                    <img
                      src="external-link.svg"
                      alt=""
                      height={16}
                      width={16}
                    />
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default SellPageDefault;
