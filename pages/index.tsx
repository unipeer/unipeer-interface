import Head from "next/head";
import { useWeb3React } from "@web3-react/core";

import Nav from "../components/Nav";
import Tabs from "../components/Tabs";
import Div from "../components/Div";
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

      {active && chainId != 42 && (
        <div
          className="w-2/4 mx-auto mb-3 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 p-1 shadow-md"
          role="alert"
        >
          <div className="flex py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
            <p>Only Kovan Network is supported.</p>
          </div>
        </div>
      )}
      <main className="py-5">
        <div className="w-full max-w-sm m-auto">
          <Tabs>
            <Div label="Buy">
              <Buy/>
            </Div>
            <Div label="Sell">
              After 'while, <em>Crocodile</em>!
            </Div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
