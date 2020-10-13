import { Component, useReducer, useState } from "react";

interface IProps {
  activeTab: string;
  label: string;
  onClick: any;
}

export default function Tab(props: IProps) {
  const { label, activeTab } = props;
  const onClick = () => {
    props.onClick(label);
  };

  let className = "-mb-px mr-1 bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold";

  if (activeTab === label) {
    className += " border-l border-t border-r rounded-t";
  }

  return (
    <li className={className} onClick={onClick}>
      {label}
    </li>
  );
}
