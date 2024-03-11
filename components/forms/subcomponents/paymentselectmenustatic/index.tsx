import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const paymentMethods = [
  {
    id: 0,
    name: "Paypal",
    icon: "ic_paypal.svg",
  },
  {
    id: 1,
    name: "Venmo",
    icon: "ic_venmo.svg",
  },
];

export default function PaymentSelectMenuStatic({ id }: { id: number }) {
  return (
    <div>
      <div className="relative mt-1">
        <button className="flex flex-row items-center max-h-12 w-full rounded-lg bg-white py-3 pl-4 text-left sm:text-sm border-[1px] border-dark-200">
          <span className="flex items-center">
            <img
              src={paymentMethods[id]?.icon}
              alt=""
              className="h-6 w-6 object-cover"
            />
            <span className="ml-3 font-paragraphs text-16">
              {paymentMethods[id].name}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
