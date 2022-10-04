import Link from "next/link";
import { ConnectKitButton } from "connectkit";

export default function Nav() {
  return (
    <header>
      <nav>
        <ul className="flex justify-between items-center p-8">
          <li>
            <Link href="/">
              <a className="text-black-500 no-underline font-medium text-lg">
                Unipeer
              </a>
            </Link>
          </li>
          <li>
          </li>
          <li>
            <ConnectKitButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
