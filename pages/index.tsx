import Head from "next/head";

import Nav from "../components/Nav";
import Tabs from "../components/Tabs";
import Div from "../components/Div";
import Buy from "../components/BuyWidget";
import Sell from "../components/SellWidget";
import SellerList from "../components/SellerList";
import OrdersList from "../components/OrdersWidget";

import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const network = useSwitchNetwork({
    chainId: 10200,
  })

  return (
    <div>
      <Head>
        <title>Unipeer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      <main className="py-5">
        {isConnected && chain?.id !== 100 && chain?.id !== 10200 ? (
          <div className="flex flex-col items-center">
            <div>Unsupported Network</div>
            <button className="btn-blue" onClick={() => network.switchNetwork?.()}>
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
    </div>
  );
}
