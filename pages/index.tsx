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

      <CustomNavBar />

      <main className="py-5">
        {isConnected && chain?.id !== 100 && chain?.id !== 10200 ? (
          <div className="flex flex-col items-center">
            <div>Unsupported Network</div>
            <button
              className="btn-blue"
              onClick={() => network.switchNetwork?.()}
            >
              Switch to Gnosis Chiado Testnet
            </button>
          </div>
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
