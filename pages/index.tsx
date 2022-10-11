import Head from "next/head";

import Nav from "../components/Nav";
import Tabs from "../components/Tabs";
import Div from "../components/Div";
import Buy from "../components/BuyWidget";
import Sell from "../components/SellWidget";
import SellerList from "../components/SellerList";

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
              <Buy />
            </Div>
            <Div label="Sell">
              <Sell />
            </Div>
          </Tabs>
        </div>
        <div className="py-5">
          <SellerList />
        </div>
      </main>
    </div>
  );
}
