import { useReducer, useState } from "react";

import Tab from "./Tab";

interface IProps {
  children: any[];
}

export default function Tabs(props: IProps) {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="flex border-b">
        {props.children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {props.children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}
