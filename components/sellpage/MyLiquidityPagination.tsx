import React, { useState, useEffect } from "react";
import MyLiquidityBreadcrumbs from "./MyLiquidityBreadcrumbs";
import WithdrawTokensModal from "./WithdrawTokensModal";

type MyLiquidityPaginationProps = {
  cardData: any;
};

const MyLiquidityPagination: React.FC<MyLiquidityPaginationProps> = ({
  cardData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalItems = cardData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = cardData.slice(startIndex, endIndex);

  const [openWithdrawTokensModal, setOpenWithdrawTokensModal] = useState("");

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleLoadNext() {
    setCurrentPage(currentPage + 1);
  }

  function handleLoadPrev() {
    setCurrentPage(currentPage - 1);
  }

  function returnImage(serviceType: string) {
    if (serviceType === "xDai") {
      return "xdai-logo.png";
    } else if (serviceType === "PayPal") {
      return "ic_paypal.svg";
    } else if (serviceType === "Venmo") {
      return "ic_venmo.svg";
    } else if (serviceType === "USDC") {
      return "usdc-logo.svg";
    } else if (serviceType === "USDT") {
      return "usdt-logo.svg";
    } else {
      return "xdai-logo.png";
    }
  }

  return (
    <>
      <WithdrawTokensModal
        activeModalComponent={openWithdrawTokensModal}
        setActiveModalComponent={setOpenWithdrawTokensModal}
      />
      <div className="flex flex-col w-full items-center">
        <div className="min-h-[475px] w-full">
          {currentItems.map((card) => {
            return (
              <div
                key={card.id}
                className="flex flex-row justify-between items-center p-6 bg-white w-full rounded-8 shadow-md border border-solid border-dark-dark-100 group relative mb-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-1">
                    <div className="flex gap-1">
                      <img
                        src={returnImage(card.from)}
                        height={24}
                        width={24}
                      />
                      <div className="text-16 font-paragraphs font-semibold text-dark-500 leading-6 tracking-[-0.5px]">
                        {card.from}
                      </div>
                    </div>
                    <div className="text-16 font-paragraphs font-semibold text-dark-500 leading-6 tracking-[-0.5px]">
                      -
                    </div>
                    <div className="flex gap-1">
                      <img src={returnImage(card.to)} height={24} width={24} />
                      <div className="text-16 font-paragraphs font-semibold text-dark-500 leading-6 tracking-[-0.5px]">
                        {card.to}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="text-14 font-paragraphs text-dark-500 leading-[21px] tracking-[-0.5px]">
                      Balance : {card.balance.toLocaleString("en-US")}{" "}
                      {card.from}
                    </div>
                    <div className="h-1.5 w-1.5 bg-dark-200 rounded-[100%]"></div>
                    <div className="text-14 font-paragraphs text-dark-500 leading-[21px] tracking-[-0.5px]">
                      paypal.me/unipeer
                    </div>
                  </div>
                </div>
                <div className="hidden group-hover:block">
                  <div className="flex flex-row gap-4">
                    <div className="py-2 px-4 bg-primary-500 rounded-8 gap-[10px] cursor-pointer">
                      <div className="text-14 font-paragraphs text-white font-semibold leading-5 tracking-[-0.5px]">
                        Add more
                      </div>
                    </div>
                    <div
                      className="py-2 px-4 bg-primary-500 rounded-8 gap-[10px] cursor-pointer"
                      onClick={() =>
                        setOpenWithdrawTokensModal("WithdrawTokensModal")
                      }
                    >
                      <div className="text-14 font-paragraphs text-white font-semibold leading-5 tracking-[-0.5px]">
                        Withdraw
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-dark-500 h-[1px] opacity-[15%] mt-6 mb-10"></div>
        <MyLiquidityBreadcrumbs
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onFetchNext={handleLoadNext}
          onFetchPrev={handleLoadPrev}
        />
      </div>
    </>
  );
};

export default MyLiquidityPagination;
