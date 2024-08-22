import { WithdrawTokenObj } from "pages/my-orders";
import { Dispatch, SetStateAction } from "react";

type WithdrawTokenSuccessModalProps = {
  activeModalComponent: Dispatch<SetStateAction<string>>;
  withdrawTokenObj: WithdrawTokenObj;
};

export function WithdrawTokenSuccessModal({
  activeModalComponent,
  withdrawTokenObj,
}): JSX.Element {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center w-full h-auto rounded-lg bg-accent-2 py-2 px-4">
        <div className="flex flex-col flex-grow items-center justify-center">
          <div className="h-auto w-auto mt-4">
            <img
              src="confetti-icon.svg"
              alt="Check icon"
              className="object-cover"
              width={80}
              height={80}
            />
          </div>
          <div className="font-paragraphs font-normal text-dark-600 text-20 mt-4">
            Tokens withdrawn successfully!
          </div>
          <div className="flex flex-row mt-4">
            <div className="flex flex-row text-base font-semibold mr-2">
              {withdrawTokenObj.withdrawnAmount} {withdrawTokenObj.convertFrom}
            </div>
            <div className="w-6 h-6 mr-1 items-center justify-start">
              <img
                src={withdrawTokenObj.convertFromLogo}
                alt={withdrawTokenObj.convertFrom}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-16 font-semibold font-paragraphs leading-6 text-white mt-2">
        <button
          type="submit"
          className="flex flex-row mt-8 items-center justify-center w-full max-h-[56px] rounded-lg bg-accent-1 py-4 px-4 gap-0"
          onClick={() => {
            activeModalComponent("");
          }}
        >
          Back to my orders
        </button>
      </div>
    </div>
  );
}
