import { Dispatch, Fragment, MouseEventHandler, SetStateAction, useState } from "react";
import BasicDialogV2 from "components/BasicDialogV2";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import CurrencyList from './CurrencyList.json'
import Flag from 'react-world-flags'

type CurrencyAndTokenModalProps = {
    openModal: boolean;
    setOpenModal: any;
};

const CurrencyAndTokenModal: React.FC<CurrencyAndTokenModalProps> = ({
    openModal,
    setOpenModal
  }) => {
    console.log('CurrencyList', CurrencyList);
    const people = [
        { id: 1, name: 'Wade Cooper' },
        { id: 2, name: 'Arlene Mccoy' },
        { id: 3, name: 'Devon Webb' },
        { id: 4, name: 'Tom Cook' },
        { id: 5, name: 'Tanya Fox' },
        { id: 6, name: 'Hellen Schmidt' },
      ]
      const [selected, setSelected] = useState(CurrencyList[0])
      const [query, setQuery] = useState('')
    
      const filteredPeople =
        query === ''
          ? CurrencyList
          : CurrencyList.filter((currency) =>
              currency.currencies[0].name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
            )
  return (
    <>
      <BasicDialogV2
      dialogTitle="Select fiat currency"
      isCancellable={true}
      dialogChild={
        <div className="flex w-full justify-center h-[325px] items-start">
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <div className="relative w-[371px] cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 h-12"
                displayValue={(currency: any) => currency.currencies[0].name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute h-[325px] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((currency) => (
                    <Combobox.Option
                      key={currency.numericCode}
                      className={({ active }) =>
                        `relative cursor-default select-none p-3 border-y-[#eff1ff] border-b border-solid border-t ${
                          active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={currency}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          ><div className="flex items-center justify-start gap-3"><div><Flag code={currency.numericCode} className="h-6 w-8" /></div>
                           <div>
                           <div className="text-base font-semibold not-italic leading-normal tracking-[-0.5px] text-left">{currency.currencies[0].code}</div>
                            <div className="text-xs not-italic leading-normal tracking-[-0.5px] text-left">{currency.currencies[0].name}</div>
                            </div> 
                            </div>
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 left-[299px] ${
                                active ? 'text-white' : 'text-teal-600'
                              }`}
                            >
                              <CheckIcon className="h-5 w-5  text-[#fe5e44]" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
      }
      openModal= {openModal}
      setOpenModal={setOpenModal}
    />
    </>
  );
}

export default CurrencyAndTokenModal;
