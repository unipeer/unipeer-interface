import Head from "next/head";
import React, { useEffect, useState } from "react";
// import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import CustomNavBar from "components/CustomNavBar";
import SellPageDefault from "components/sellpage/SellPageDefault";
import AddLiquidityDefault from "components/sellpage/AddLiquidityDefault";
import TokenDepositSuccess from "components/sellpage/TokenDepositSuccess";

const Demo = () => {
  const [currentCard, setCurrentCard] = useState("A");

  useEffect(() => {
    console.log(currentCard);
  }, [currentCard, setCurrentCard]);

  function addNewPosition() {
    setCurrentCard("B");
  }

  function addLiquidityBackButton() {
    setCurrentCard("A");
  }

  function sellComponent() {
    switch (currentCard) {
      case "A":
        return <SellPageDefault addNewPosition={addNewPosition} />;
      case "B":
        return (
          <AddLiquidityDefault
            addLiquidityBackButton={addLiquidityBackButton}
            setCurrentCard={setCurrentCard}
          />
        );
      case "C":
        return <TokenDepositSuccess setCurrentCard={setCurrentCard} />;
      //   return ;
    }
  }

  return (
    <>
      <Head>
        <title>Unipeer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomNavBar />

      <main
        className="py-5 min-h-[100vh]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255, 244, 242, 0.4) 0%, #fff0ee 100%)",
        }}
      >
        {sellComponent()}
      </main>
    </>
  );
};

export default Demo;
