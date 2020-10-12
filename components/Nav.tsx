import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";

import Account from "./Account";
import useEagerConnect from "../hooks/useEagerConnect";

export default function Nav() {
  const triedToEagerConnect = useEagerConnect();

  return (
    <header>
      <nav>
        <ul className="flex justify-between items-center p-8">
          <li>
            <Link href="/">
              <a className="text-black-500 no-underline">Home</a>
            </Link>
          </li>
          <li>
            <Account triedToEagerConnect={triedToEagerConnect} />
          </li>
        </ul>
      </nav>
    </header>
  )
}
