import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { type Unipeer, ERC20 } from "../../../contracts/types";
import UNIPEER_ABI from "../../../contracts/Unipeer.json";
import { addresses, constants, formatEtherscanLink } from "../../../util";

import {
  useAccount,
  useContract,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
  useProvider,
} from "wagmi";
import { useDispatch } from "react-redux";
import { getAvailablePaymentMethords } from "redux-api/actions/active-buy-order-actions";

const paymentMethods = [
  {
    id: 1,
    name: "Paypal",
    icon: "ic_paypal.svg",
  },
  {
    id: 2,
    name: "Venmo",
    icon: "ic_venmo.svg",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type PaymentMethodModalProps = {
  activeModalComponent: string;
  setActiveModalComponent: Dispatch<SetStateAction<string>>;
};

export default function PaymentMethodModal<PaymentMethodModalProps>({
  activeModalComponent,
  setActiveModalComponent,
}) {
  const [selected, setSelected] = useState(paymentMethods[0]);
  const [paypalAddress, setPaypalAddress] = useState("");
  const [venmoAddress, setVenmoAddress] = useState("");

  const { chain } = useNetwork();
  const provider = useProvider();

  const chainId = chain?.id || constants.defaultChainId;

  const UnipeerAddr = addresses.UNIPEER[chainId];
  const Dai = addresses.DAI[chainId];

  const Unipeer: Unipeer = useContract({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    signerOrProvider: provider,
  });
  const { address, isConnected } = useAccount();
  console.log("addres123s", address);
  const fetchPaymentMethods = async () => {
    // Read list of payment method IDs, name and list of enabled tokens
    // const events = useEventListener(Unipeer, "Unipeer", "PaymentMethodUpdate", library, 100);
    // let pm = await Unipeer.paymentMethods(0);
    const filter = Unipeer.filters.PaymentMethodUpdate();
    const result = await Unipeer.queryFilter(filter, constants.block[chainId]);

    const event = new Map();
    result.forEach(async (log) => {
      // const filterPaymentMethodAddress =
      //   Unipeer.filters.PaymentMethodTokenEnabled(log.args.paymentID, null);
      // const resultAddress = Unipeer.queryFilter(
      //   filterPaymentMethodAddress,
      //   constants.block[chainId],
      // );
      // const test  = await resultAddress.then(result => result.data);

      // TODO: remove hard coded token value and fetch from event
      event.set(log.args[0], {
        tokens: [Dai],
        paymentName: log.args.paymentName,
        icon: "ic_" + log.args.paymentName.toLowerCase() + ".svg",
        // resultAddress: resultAddress,
      });
    });

    // We assume that the PaymentMethodUpdate will
    // have contiguous Payment IDs
    // setPayMethods(Array.from(event.values()));
    // setSelected(0);
    // setToken(0);
    console.log("Array.from(event.values())", Array.from(event.values()));
  };
  fetchPaymentMethods();
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getAvailablePaymentMethords(address, chainId, Unipeer));
  }, [dispatch]);
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only"> Payment Method </RadioGroup.Label>
      <div className="rounded-2 bg-white flex flex-col gap-4">
        {paymentMethods.map((paymentMethod, settingIdx) => (
          <RadioGroup.Option
            key={paymentMethod.name}
            value={paymentMethod.name}
            className={({ checked }) =>
              classNames(
                checked ? "z-10 border-accent-1 border-2" : "",
                "relative bg-accent-2 rounded-2 px-4 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 cursor-pointer focus:outline-none justify-center sm:justify-between",
              )
            }
          >
            {({ active, checked }) => (
              <>
                <div className="flex flex-row items-center gap-4">
                  <span
                    className={classNames(
                      checked
                        ? "bg-accent-1 border-transparent ring-2 ring-offset-2 ring-accent-1"
                        : "bg-white ring-2 ring-dark-blue-400",
                      "h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center",
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className={classNames("flex flex-row items-center gap-1")}
                    >
                      <div className="w-6 h-6">
                        <img
                          src={paymentMethod.icon}
                          alt={`${paymentMethod.name} Logo`}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="text-20 font-normal font-paragraphs tracking-[-0.5px] text-dark-black-500">
                        {paymentMethod.name}
                      </div>
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={classNames(
                        "text-dark-black-500 flex text-14 font-paragraphs",
                      )}
                    >
                      {"No address added"}
                    </RadioGroup.Description>
                  </span>
                </div>
                <div
                  className={`hidden sm:flex flex-col items-center justify-center`}
                  onClick={() => setActiveModalComponent("address")}
                >
                  <img src="pencil-icon.svg" alt="Pencil icon" />
                </div>
                <div
                  className={`flex sm:hidden flex-col items-center justify-center self-end underline underline-offset-2 text-accent-1`}
                  onClick={() => setActiveModalComponent("address")}
                >
                  Edit
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
