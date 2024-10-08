import React, { Dispatch, SetStateAction } from "react";

const tabs = [{ name: "Active" }, { name: "History" }];

type ActiveInactiveTabProps = {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ActiveInactiveTab = ({
  selectedTab,
  setSelectedTab,
}: ActiveInactiveTabProps) => {
  return (
    <div>
      <div className="hidden sm:flex bg-white max-w-fit rounded-3xl">
        <div
          className="flex flex-row items-center border-dark-800 border-2 rounded-3xl"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <div
              key={tab.name}
              className={classNames(
                selectedTab === tab.name
                  ? "bg-dark-800 text-white"
                  : "bg-white text-dark-800",
                "cursor-pointer m-2 px-[27.5px] py-2 font-semibold font-paragraphs text-20 rounded-[20px]",
              )}
              onClick={() => setSelectedTab(tab!.name)}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveInactiveTab;
