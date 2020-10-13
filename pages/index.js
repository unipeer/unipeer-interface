import Head from "next/head";
import { useWeb3React } from "@web3-react/core";

import Nav from "../components/Nav";
import Tabs from "../components/Tabs";
import Buy from "../components/BuyWidget";

export default function Home() {
  const { active, chainId } = useWeb3React();

  return (
    <div>
      <Head>
        <title>Unipeer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className="py-10">
        {active && chainId != 42 && (
          <div className="w-2/4 mx-auto mb-4 bg-orange-200 border-l-4 border-orange-500 text-orange-700 p-1" role="alert">
            <p>Only Kovan Network is supported.</p>
          </div>
        )}
        <div className="w-full max-w-sm m-auto">
          <Tabs>
            <div label="Buy">
              <Buy />
            </div>
            <div label="Sell">
              After 'while, <em>Crocodile</em>!
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
