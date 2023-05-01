import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { HiCheck, HiChevronDown } from 'react-icons/hi';

type ListBoxProps = {
    people: PeopleType[];
    setValue: (value: number) => void
}
type PeopleType = {
    descricao: string;
    id: number
}

export default function ListBoxData({ people, setValue }: ListBoxProps) {
    const [selected, setSelected] = useState(people[0])
    useEffect(() => {
        setValue(selected?.id)
    }, [selected])
    return (
        <>
            <Listbox
                value={selected}
                onChange={setSelected}>
                <div className="relative ">
                    <Listbox.Button
                        className="relative w-full cursor-default rounded-lg 
                    bg-white py-[10px] pl-3 pr-10 text-left shadow text-base border focus:outline-none focus-visible:border-indigo-500
                    focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2
                     focus-visible:ring-offset-blue-300 sm:text-sm">
                        <span
                            className="block truncate">{selected?.descricao}</span>
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
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md 
                        bg-white py-1 text-base shadow-lg border ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 
                                        ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
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
                                                {person?.descricao}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3
                                                 text-blue-600">
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
        </>
    )
}
