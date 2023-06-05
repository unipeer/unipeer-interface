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
            <StyledButtonHolo onClick={show}>
              {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </StyledButtonHolo>
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
