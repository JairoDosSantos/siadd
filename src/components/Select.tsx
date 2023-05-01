import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiCheck, HiChevronDown } from 'react-icons/hi'

const unidades = [
    { name: 'UN' },
    { name: 'VG' },
    { name: 'KG' },
    { name: 'L' },
    { name: 'MM' },
    { name: 'CM' },
    { name: 'M' },
    { name: 'Outra' },
]

type selectProps = {
    setUnidade: (value: { name: string }) => void;
    unidade: { name: string }
}

export default function Select({ setUnidade, unidade }: selectProps) {


    return (
        <div className="">
            <Listbox value={unidade} onChange={setUnidade}>
                <div className="relative mt-1">
                    <Listbox.Button className="cursor-pointer relative w-full rounded bg-white dark:bg-gray-100 py-2 pl-3 pr-10 text-left shadow border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{unidade.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiChevronDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {unidades.map((person, personIdx) => (
                                <Listbox.Option

                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>

                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <HiCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
