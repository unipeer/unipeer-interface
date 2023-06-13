import Head from "next/head";

import CustomNavBar from "components/CustomNavBar";
import Tabs from "components/Tabs";
import Div from "components/Div";
import Buy from "components/BuyWidget";
import Sell from "components/SellWidget";
import SellerList from "components/SellerList";
import OrdersList from "components/OrdersWidget";
import "bootstrap/dist/css/bootstrap.min.css";

import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import PaymentModeModal from "components/modals/payment";
import WrongNetworkDetected from "components/buy/modals/wrongnetwork";
import BasicDialog from "components/BasicDialog";
import { PayArbitrationFeeModal } from "components/buy/modals/payfee";

export default function Home() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const network = useSwitchNetwork({
    chainId: 10200,
  });

  return (
    <>
      <Head>
        <title>Unipeer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <PaymentModeModal /> */}
      {/* <BasicDialog
        dialogTitle="Pay arbitration fee"
        isCancellable={false}
        dialogChild={<PayArbitrationFeeModal arbitrationFee="(0.001 xDAI)" />}
      /> */}
      <CustomNavBar />

      <main className="py-5">
        {isConnected && chain?.id !== 100 && chain?.id !== 10200 ? (
          <BasicDialog
            dialogTitle="Wrong network detected!"
            isCancellable={false}
            dialogChild={
              <WrongNetworkDetected
                switchNetwork={() => network.switchNetwork?.()}
              />
            }
          />
        ) : (
          <>
            <div className="w-full max-w-sm m-auto">
              <Tabs>
                <Div label="Buy">
                  <Buy />
                </Div>
                <Div label="Sell">
                  <Sell />
                </Div>
                <Div label="My Orders">
                  <OrdersList />
                </Div>
              </Tabs>
            </div>
            <div className="py-5">
              <SellerList />
            </div>
          </>
        )}
      </main>
    </>
  );
}
