"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
  Transition,
} from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Fragment, useState } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  options: string[];
};

export default function GroupCombobox({ value, onChange, options }: Props) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? options
      : options.filter((g) => g.toLowerCase().includes(query.toLowerCase()));

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded border border-gray-300 bg-white text-left shadow-sm focus-within:ring-1 focus-within:ring-blue-500">
          <ComboboxInput
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-0"
            displayValue={(val: string) => val}
            onChange={(e) => {
              setQuery(e.target.value);
              onChange(e.target.value);
            }}
            placeholder="그룹 입력 또는 선택"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown className="h-4 w-4 text-gray-400" />
          </ComboboxButton>
        </div>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded bg-white py-1 text-sm shadow-lg ring-1 ring-black/5">
            {filtered.length === 0 ? (
              <div className="cursor-default select-none px-4 py-2 text-gray-500">
                결과 없음
              </div>
            ) : (
              filtered.map((g) => (
                <ComboboxOption
                  key={g}
                  value={g}
                  className={({ active }) =>
                    `relative cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-blue-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : ""
                        }`}
                      >
                        {g}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 right-3 flex items-center">
                          <Check className="w-4 h-4" />
                        </span>
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Transition>
      </div>
    </Combobox>
  );
}
