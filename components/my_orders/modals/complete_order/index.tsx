import { MouseEventHandler, useState } from "react";

type CompleteOrderModalProp = {
  getAmount: string;
  getAmountCurrency: string;
  sellAmount: string;
  sellAmountCurrency: string;
  sellerAddress: string;
  confirmPaymentCallback: MouseEventHandler<any>;
};

export function CompleteOrderModal<CancelOrderModalProp>({
  getAmount,
  getAmountCurrency,
  sellAmount,
  sellAmountCurrency,
  sellerAddress,
  confirmPaymentCallback,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <div className="text-20 text-dark-dark-800">
      Please confirm whether you successfully received the amount.
      <div className="flex flex-col mt-10 items-center justify-start w-full h-auto rounded-lg bg-accent-2 py-6 px-4">
        <div className="flex flex-row items-center justify-start w-full">
          <div className="flex flex-col items-start justify-center w-auth mr-8">
            <div className="text-base text-dark-dark-400 font-semibold">
              You get
            </div>
            <div className="text-2xl text-dark-dark-500 font-bold">
              {getAmount} ${getAmountCurrency}
            </div>
          </div>
          <div className="border-l border-solid border-black h-[48px] w-[1px]"></div>
          <div className="flex flex-col items-start justify-center w-48 ml-8">
            <div className="text-base text-primary-color-500 font-semibold">
              You sell
            </div>
            <div className="text-2xl text-dark-dark-500 font-bold">
              {sellAmount} ${sellAmountCurrency}
            </div>
          </div>
        </div>
        <div className="flex flex-rowitems-start justify-center text-dark-dark-500 text-base mt-6">
          Tokens will be transferred to the buyer once you mark the order as
          completed.
        </div>
        <div className="flex flex-row items-center justify-start w-full mt-6">
          <input
            id="confirmedCheckbox"
            type="checkbox"
            className="form-checkbox h-6 w-6 rounded appearance-none border-primary-color-500 text-primary-color-500 focus:ring-0 focus:outline-none ..."
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="confirmedCheckbox"
            className="flex flex-row items-center justify-start text-dark-dark-500 text-base ml-2"
          >
            <div>
              I have successfully received the payment in my account{" "}
              <div className="text-dark-dark-500 text-base font-semibold ml-1 mr-1">
                {sellerAddress}
              </div>
            </div>
          </label>
        </div>
      </div>
      {isChecked ? (
        <button
          type="submit"
          className="flex flex-row mt-8 items-center justify-center w-auto max-h-[56px] rounded-lg bg-accent-1 py-8 gap-0"
          onClick={confirmPaymentCallback}
        >
          <div className="ml-[16px] text-16 font-semibold font-paragraphs leading-6 text-white">
            Complete order
          </div>
          <svg
            aria-hidden="true"
            className="inline w-6 h-6 ml-[16px] mr-[16px] animate-spin dark:fill-primary-color-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="primary-color-200"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="white"
            />
          </svg>
        </button>
      ) : (
        <button className="flex flex-row mt-8 items-center justify-center w-auto cursor-not-allowed max-h-[56px] rounded-lg bg-dark-300 py-8 gap-0 text-16 font-semibold font-paragraphs leading-6 text-white opacity-50">
          <div className="mx-[16px] text-16 font-semibold font-paragraphs leading-6 text-white">
            Complete order
          </div>
        </button>
      )}
    </div>
  );
}
