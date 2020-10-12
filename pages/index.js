import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";

import Nav from "../components/Nav";
import ETHBalance from "../components/ETHBalance";
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
        <title>Next Web3 Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav/>

      <main className="py-20">
        <h1 className="text-5xl text-center text-accent-1">
          Welcome
        </h1>

        {isConnected && (
          <section>
            <ETHBalance />
            <button onClick={handleSign}>Personal Sign</button>
          </section>
        )}
      </main>
    </div>
  );
}
