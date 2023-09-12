import { Menu } from "@headlessui/react";
import { ConnectKitButton } from "connectkit";

import styled from "styled-components";
const StyledButtonHolo = styled.button`
  background: #fe5e44;
  border: 1px solid #fe5e44;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  &:hover {
    background-color: initial;
    background-position: 0 0;
    color: #fe5e44;
  }
  &:active {
    background-color: initial;
    background-position: 0 0;
    color: #fe5e44;
    opacity: 0.5;
  }
`;

const StyledButtonSolid = styled.button`
  background: #fe5e44;
  border: 1px solid #fe5e44;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  &:hover {
    background-color: #fe5e44;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }
  &:active {
    background-color: #fe5e44;
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }
`;

export const CustomConnectKitButton = ({ isNav }) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        if (isNav) {
          return (
            // <StyledButtonHolo onClick={show}>
            //   {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            // </StyledButtonHolo>
            isConnected ? (
              <Menu.Button className="flex bg-white text-sm flex-row items-center gap-2">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="font-paragraphs text-16 text-dark-black-500">
                  {truncatedAddress}
                </span>
                <div className="flex flex-row items-center justify-center">
                  <img
                    src="/chevron-down.svg"
                    // width="28"
                    // height="28"
                    alt="Down Arrow icon"
                  />
                </div>
              </Menu.Button>
            ) : (
              <StyledButtonHolo onClick={show}>
                {"Connect Wallet"}
              </StyledButtonHolo>
            )
          );
        } else {
          return (
            <StyledButtonSolid onClick={show}>
              {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </StyledButtonSolid>
          );
        }
      }}
    </ConnectKitButton.Custom>
  );
};
