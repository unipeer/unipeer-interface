import Head from "next/head";

import Nav from "../components/Nav";
import Tabs from "../components/Tabs";
import Buy from "../components/BuyWidget";

export default function Home() {

  return (
    <div>
      <Head>
        <title>Unipeer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className="py-10">
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
