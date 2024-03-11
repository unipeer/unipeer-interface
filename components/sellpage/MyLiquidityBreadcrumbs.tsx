import React from "react";

type MyLiquidityBreadcrumbsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: any;
  onFetchNext: any;
  onFetchPrev: any;
};

const MyLiquidityBreadcrumbs: React.FC<MyLiquidityBreadcrumbsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onFetchNext,
  onFetchPrev,
}) => {
  const maxDisplayedBreadcrumbs = 8;
  const startIndex = Math.max(
    currentPage - Math.floor(maxDisplayedBreadcrumbs / 2),
    1,
  );
  const endIndex = Math.min(
    startIndex + maxDisplayedBreadcrumbs - 1,
    totalPages,
  );

  const breadcrumbLinks = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, index) => startIndex + index,
  );

  return (
    <div className="flex gap-4 items-center">
      {startIndex > 1 && (
        <div onClick={onFetchPrev} className="cursor-pointer rotate-180">
          <img src="chevron-right.svg" />
        </div>
      )}
      {breadcrumbLinks.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-8 w-8 py-1 px-3 font-paragraphs font-semibold text-16 flex items-center justify-center ${
            currentPage === page
              ? "bg-dark-dark-800 text-white"
              : "bg-white text-dark-dark-600"
          } rounded-8 `}
        >
          {page}
        </button>
      ))}
      {endIndex < totalPages && (
        <div onClick={onFetchNext} className="cursor-pointer">
          <img src="chevron-right.svg" />
        </div>
      )}
    </div>
  );
};

export default MyLiquidityBreadcrumbs;
