import { Dispatch, SetStateAction, useRef } from "react";
import PaymentSelectMenuStatic from "../subcomponents/paymentselectmenustatic";

type PaymentAddressFormProps = {
  paymentAddress?: string;
  setPaymentAddress?: Dispatch<SetStateAction<string>>;
  feeRatePercentage?: string;
  setFeeRatePercentage?: Dispatch<SetStateAction<string>>;
  activeModalComponent: string;
  setActiveModalComponent: Dispatch<SetStateAction<string>>;
};

export default function PaymentAddressForm<PaymentAddressFormProps>({
  paymentAddress,
  setPaymentAddress,
  feeRatePercentage,
  setFeeRatePercentage,
  activeModalComponent,
  setActiveModalComponent,
}) {
  let allFieldsAreFilled = paymentAddress?.trim() && feeRatePercentage?.trim();

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-start gap-[0.5rem] cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <img src="arrow-narrow-left.svg" alt="Arrow icon left" />
          </div>
          <div
            className="flex font-paragraphs text-16 text-accent-1 font-semibold"
            onClick={() => setActiveModalComponent("mode")}
          >
            Back to payment modes
          </div>
        </div>

        <div className="mt-[1.75rem]">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="payment-method"
                className="flex text-14 font-semibold text-dark-black-500 font-paragraphs"
              >
                Payment method
              </label>
              <div className="mt-[0.125rem]">
                <PaymentSelectMenuStatic id={0} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="payment-address"
                  className="flex text-14 font-semibold text-dark-black-500 font-paragraphs"
                >
                  Payment address
                </label>
              </div>
              <div className="mt-[0.125rem] flex flex-row items-center max-h-12 w-full rounded-lg bg-white py-3 text-left sm:text-sm">
                <span className="flex flex-row items-center h-12 rounded-l-lg pl-4 pr-2 text-dark-black-500 font-paragraphs text-16 border-l-[1px] border-y-[1px] border-dark-200">
                  paypal.me/
                </span>
                <input
                  type="text"
                  name={paymentAddress}
                  value={paymentAddress}
                  id="payment-address"
                  className="items-center max-h-12 w-full  rounded-r-lg bg-white py-3 text-left text-dark-black-500 font-paragraphs text-16 border-[1px] border-dark-200"
                  placeholder="username"
                  onChange={(e) => setPaymentAddress(e.target.value as string)}
                />
              </div>
              <div className="mt-[0.25rem] flex text-12 font-normal text-dark-black-500 font-paragraphs">
                Buyers will make payment here once matched to you
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="rate-percent"
                  className="flex text-14 font-semibold text-dark-black-500 font-paragraphs"
                >
                  Fee rate percentage (%)
                </label>
              </div>
              <div className="mt-[0.125rem] flex flex-row items-center max-h-12 w-full rounded-lg bg-white py-3 text-left sm:text-sm">
                <input
                  type="text"
                  name={feeRatePercentage}
                  value={feeRatePercentage}
                  id="rate-percent"
                  className="items-center max-h-12 w-full rounded-lg bg-white py-3 text-left text-dark-black-500 font-paragraphs text-16 border-[1px] border-dark-200"
                  placeholder="0"
                  onChange={(e) =>
                    setFeeRatePercentage(e.target.value as string)
                  }
                />
              </div>
              <div className="mt-[0.25rem] flex text-12 font-normal text-dark-black-500 font-paragraphs">
                Keep this low to get maximum orders. Average range (0% - 1%)
              </div>
            </div>

            {!allFieldsAreFilled ? (
              <div>
                <button
                  disabled
                  className="flex flex-col items-center justify-center cursor-not-allowed w-full max-h-[56px] rounded-lg bg-dark-300 py-4 text-16 font-semibold font-paragraphs leading-6 text-white opacity-50"
                >
                  Update payment address
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center w-full max-h-[56px] rounded-lg bg-accent-1 py-4 gap-0"
                >
                  <div className="text-16 font-semibold font-paragraphs leading-6 text-white">
                    Update payment address
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
          </form>
        </div>
      </div>
    </>
  );
}
