import { Popover, Transition } from "@headlessui/react";
import { WithdrawTokenObj } from "pages/my-orders";
import { Dispatch, Fragment, SetStateAction, useState } from "react";

type WithdrawTokenModalProps = {
  activeModalComponent: Dispatch<SetStateAction<string>>;
  activeWithdrawToken: Dispatch<SetStateAction<string>>;
  withdrawTokenObj: WithdrawTokenObj;
};

export function WithdrawTokenModal({
  activeModalComponent,
  activeWithdrawToken,
  withdrawTokenObj,
}): JSX.Element {
  let allFieldsAreFilled = withdrawTokenObj?.balance.trim();
  const inputClassNormal =
    "items-center max-h-12 w-full rounded-lg bg-white py-3 text-left text-dark-black-500 font-paragraphs text-16 border-[1px] border-primary-500";
  const inputClassError =
    "items-center max-h-12 w-full rounded-lg bg-white py-3 text-left text-dark-black-500 font-paragraphs text-16 border-[1px] border-state-alert";
  const inputFieldHint = "Tokens will be withdrawn directly to your wallet";
  const inputFieldHintError = "Amount exceeds the available balance";
  const [inputValue, setInputValue] = useState("");
  const [inputFieldValid, setInputFieldValid] = useState(true);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-start gap-[0.5rem] cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <img src="arrow-narrow-left.svg" alt="Arrow icon left" />
        </div>
        <div
          className="flex font-paragraphs text-16 text-accent-1 font-semibold"
          onClick={() => activeModalComponent("tokenList")}
        >
          Back to all tokens
        </div>
      </div>
      <div className="flex flex-row mt-8 w-full h-[82px] rounded-lg bg-accent-2 py-2 px-4">
        <div className="flex flex-row flex-grow items-center justify-center">
          <div className="flex-grow flex-col items-start justify-center">
            <div className="flex flex-row text-[12px] text-dark-dark-400 font-semibold mb-2">
              Token
            </div>
            <div className="flex flex-row">
              <div className="flex flex-row text-base text-dark-dark-500 font-semibold">
                {withdrawTokenObj.convertFrom}
              </div>
              <div className="w-6 h-6 ml-1">
                <img
                  src={withdrawTokenObj.convertFromLogo}
                  alt={withdrawTokenObj.convertFrom}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex-grow flex-col items-start justify-center">
            <div className="flex flex-row text-[12px] text-dark-dark-400 font-semibold mb-2">
              Available to withdraw
            </div>
            <div className="flex flex-row text-base text-dark-dark-500 font-semibold">
              {withdrawTokenObj.balance} {withdrawTokenObj.convertFrom}
            </div>
          </div>
          <div className="flex-grow flex-col items-start justify-center">
            <Popover className="">
              {({ open }) => (
                <>
                  <Popover.Button className={"ring-0 outline-none"}>
                    <div className="flex flex-row cursor-pointer w-fit gap-1">
                      <div className="flex flex-row text-[12px] text-dark-dark-400 font-semibold mb-2">
                        Tokens locked
                      </div>
                      <div className="w-4 h-4">
                        <img
                          src="exclamation-circle.svg"
                          alt="Details icon"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute -end-[0px] -top-[0px] right-0 z-1 w-44">
                      <div className="absolute h-3 w-3 bottom-0 left-2 origin-bottom-left rotate-45 transform border-[1px] border-l-0 border-t-0 border-b-dark-200 border-r-dark-200 bg-dark-100"></div>
                      <div className="px-4 py-6 bg-dark-100 border-[1px] border-dark-200 rounded-8 flex flex-col gap-4">
                        <div className="flex flex-col justify-center gap-1">
                          <div className="font-paragraphs font-semibold text-12 text-dark-600">
                            A part of your balance that's locked in existing
                            orders.
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <div className="flex flex-row text-base text-dark-dark-500 font-semibold">
              {withdrawTokenObj.lockedAmount} {withdrawTokenObj.convertFrom}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-8 w-full items-center">
        <div className="flex flex-grow justify-between">
          <label
            htmlFor="rate-percent"
            className="flex text-14 font-semibold text-dark-black-500 font-paragraphs"
          >
            Withdraw amount
          </label>
        </div>
        <div className="flex flex-shrink-0 justify-between">
          <label
            htmlFor="rate-percent"
            className="flex text-14 font-semibold text-primary-500 font-paragraphs cursor-pointer"
            onClick={() => {
              setInputValue(
                (
                  withdrawTokenObj.balance - withdrawTokenObj.lockedAmount
                ).toString(),
              );
            }}
          >
            Max amount
          </label>
        </div>
      </div>
      <div className="mt-[0.125rem] flex flex-row items-center max-h-12 w-full rounded-lg bg-white py-3 text-left sm:text-sm">
        <input
          type="text"
          name="withdrawAmountInput"
          placeholder="0.0"
          id="rate-percent"
          value={inputValue}
          className={inputFieldValid ? inputClassNormal : inputClassError}
          onChange={(e) => {
            setInputFieldValid(true);
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div className="mt-[0.25rem] flex text-12 font-normal text-dark-black-500 font-paragraphs">
        {inputFieldValid ? inputFieldHint : inputFieldHintError}
      </div>
      {!allFieldsAreFilled ? (
        <div>
          <button
            disabled
            className="flex flex-col mt-8 items-center justify-center cursor-not-allowed w-full max-h-[56px] rounded-lg bg-dark-300 py-4 text-16 font-semibold font-paragraphs leading-6 text-white opacity-50"
          >
            Withdraw tokens
          </button>
        </div>
      ) : (
        <div>
          <button
            type="submit"
            className="flex flex-row mt-8 items-center justify-center w-full max-h-[56px] rounded-lg bg-accent-1 py-4 gap-0"
            onClick={() => {
              if (
                parseFloat(inputValue) >
                withdrawTokenObj.balance - withdrawTokenObj.lockedAmount
              ) {
                setInputFieldValid(false);
              } else {
                withdrawTokenObj.withdrawnAmount = inputValue;
                console.log(`withdraw token input value ${inputValue}`);
                console.log(
                  `withdraw token obj value ${withdrawTokenObj.withdrawnAmount}`,
                );
                activeWithdrawToken(withdrawTokenObj);
                activeModalComponent("tokenWithdrawn");
              }
            }}
          >
            <div className="text-16 font-semibold font-paragraphs leading-6 text-white">
              Withdraw tokens
            </div>
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 ml-[10px] text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="primary-100"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="white"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
