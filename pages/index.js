import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";

import Nav from "../components/Nav";
import Tabs from "../components/Tabs";
import ETHBalance from "../components/ETHBalance";
import Buy from "../components/BuyWidget";
import usePersonalSign, { hexlify } from "../hooks/usePersonalSign";

export default function Home() {
  const { account, library } = useWeb3React();

  const sign = usePersonalSign();

  const handleSign = async () => {
    const msg = "Next Web3 Boilerplate Rules";
    const sig = await sign(msg);
    console.log(sig);
    console.log("isValid", verifyMessage(msg, sig) === account);
  };

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>Unipeer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className="py-10">
        {isConnected && (
          <section>
            <ETHBalance />
            <button onClick={handleSign}>Personal Sign</button>
          </section>
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
