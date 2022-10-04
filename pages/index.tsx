import Head from "next/head";
import { useWeb3React } from "@web3-react/core";

import Nav from "../components/Nav";
import Tabs from "../components/Tabs";
import Div from "../components/Div";
import Buy from "../components/BuyWidget";
import Sell from "../components/SellWidget";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Unipeer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      <main className="py-5">
        <div className="w-full max-w-sm m-auto">
          <Tabs>
            <Div label="Buy">
              <Buy/>
            </Div>
            <Div label="Sell">
              <Sell/>
            </Div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
