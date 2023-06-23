import { WithdrawTokenObj } from "pages/my-orders";
import { Dispatch, SetStateAction } from "react";
import { WithdrawTokenModal } from "../withdraw_token";

type WithdrawTokenModalProps = {
  activeModalComponent: Dispatch<SetStateAction<string>>;
  activeWithdrawToken: Dispatch<SetStateAction<string>>;
  withdrawTokenObjList: ReadonlyArray<WithdrawTokenObj>;
};

export function WithdrawTokensModal({
  activeModalComponent,
  activeWithdrawToken,
  withdrawTokenObjList,
}): JSX.Element {
  return (
    <div className="text-20 text-dark-dark-800">
      Withdraw your tokens from the following pairs on the escrow contract
      <div className="flex flex-row mb-8" />
      {withdrawTokenObjList.map((token) => {
        return (
          <div className="flex flex-row mt-2 w-full h-[100px] rounded-lg bg-accent-2 py-2 px-4">
            <div className="flex flex-row flex-grow items-center justify-start">
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-center">
                  <div className="w-6 h-6 mr-1">
                    <img
                      src={token.convertFromLogo}
                      alt={token.convertFrom}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-row text-base font-semibold mr-2">
                    {token.convertFrom}
                  </div>{" "}
                  -{" "}
                  <div className="w-6 h-6 ml-1 mr-1">
                    <img
                      src={token.convertToLogo}
                      alt={token.convertTo}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-row text-base font-semibold items-center justify-start">
                    {token.convertTo}
                  </div>
                </div>
                <div className="flex flex-row text-base text-dark-dark-800 mt-2">
                  Balance: {token.balance} {token.convertFrom}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center flex-shrink-0">
              <button
                type="submit"
                className="flex flex-row items-center justify-center w-auto h-10 rounded-lg bg-accent-1 gap-0 focus:outline-none focus:ring-0"
                onClick={() => {
                  activeWithdrawToken(token);
                  activeModalComponent("tokenDetails");
                    // return <WithdrawTokenModal
                    //   activeModalComponent={activeModalComponent}
                    //   withdrawTokenObj={token}
                    // />;
                }}
              >
                <div className="ml-[16px] mr-[16px] text-16 font-semibold font-paragraphs leading-6 text-white">
                  Withdraw
                </div>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
