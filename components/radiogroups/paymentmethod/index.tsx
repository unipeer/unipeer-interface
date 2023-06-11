import { Dispatch, SetStateAction, useState } from "react";
import { RadioGroup } from "@headlessui/react";

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
                "relative bg-accent-2 rounded-2 px-4 py-6 flex flex-row items-center cursor-pointer focus:outline-none justify-between",
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
                  className="flex flex-col items-center justify-center"
                  onClick={() => setActiveModalComponent("address")}
                >
                  <img src="pencil-icon.svg" alt="Pencil icon" />
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
