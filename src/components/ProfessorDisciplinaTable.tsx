import nookies from 'nookies';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { api } from '../service/api';
// import { Container } from './styles';

type DisciplinaType = {
    id?: number;
    descricao: string
}

type MinhasDisciplinasType = {

    disciplina: DisciplinaType[]
}

const MinhasDisciplinasTable: React.FC = () => {


    const [searchDisciplina, setSearchDisciplina] = useState("")

    //Buscar ID do professor logado no Cookie
    const { USER_LOGGED_CAD } = nookies.get(null)
    const user = JSON.parse(USER_LOGGED_CAD);

    const idDocente = user?.id;
    const getAllDisciplinesTeacher = async () => {

        try {

            const getDisciplines = await api.get(`/disciplina/docente/${idDocente}`)

            return getDisciplines.data as DisciplinaType[]

        } catch (error: any) {
            console.log(error.message);
        }

    }

    const { data, isLoading, error } = useQuery('fetchDisciplinaProfessor', getAllDisciplinesTeacher)

    const filteredDisciplina = searchDisciplina ? data?.filter((disciplina) => disciplina.descricao?.toLowerCase().includes(searchDisciplina.toLowerCase())) : []

    return (

        <section className="antialiased w-full lg:w-1/2">
            <div className="flex flex-col justify-center h-full">
                {/**   <!-- Table --> */}
                <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-300 shadow-lg 
                rounded-sm border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-100 w-full">
                        <div className="font-semibold text-gray-800 rounded-full 
                        bg-gray-50  flex items-center px-4 gap-4  w-full">
                            <label htmlFor="search">
                                <FaSearch className='h-6 w-6 text-gray-400' />
                            </label>
                            <input
                                onChange={(e) => setSearchDisciplina(e.target.value)}
                                type="search"
                                id='search'
                                className='bg-gray-50 dark:bg-white w-full
                                border-none rounded-full text-gray-400 focus:border-none focus:ring-0' />
                        </div>
                    </header>

                    <div className="overflow-x-auto p-3">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 dark:bg-gray-200">

                                <tr>
                                    <th></th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Disciplina</div>
                                    </th>

                                    <th className="p-2 hidden">
                                        <div className="font-semibold text-center">Acção</div>
                                    </th>
                                </tr>


                            </thead>

                            <tbody className="text-sm divide-y divide-gray-100">
                                {/**               <!-- record 1 --> */}
                                {
                                    isLoading ? (
                                        <p className='text-center font-bold'>Processando os dados...</p>
                                    ) : (
                                        !filteredDisciplina?.length ?
                                            (
                                                data?.map((discipline, index) => (
                                                    <tr
                                                        key={index}
                                                        className=''>
                                                        <td className="p-2">
                                                            <input type="checkbox" className="w-5 h-5" value={discipline.id}
                                                            />
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="font-medium text-gray-800">
                                                                {discipline.descricao}
                                                            </div>
                                                        </td>
                                                        <td className="p-2 hidden">
                                                            <div className="flex justify-center ">
                                                                <button>
                                                                    <svg className="w-8 h-8 hover:text-blue-600 rounded-full 
                                                 hover:bg-gray-100 p-1"
                                                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                                        </path>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                ))
                                            ) : (
                                                filteredDisciplina?.map((discipline, index) => (
                                                    <tr
                                                        key={index}
                                                        className=''>
                                                        <td className="p-2">
                                                            <input type="checkbox" className="w-5 h-5" value={discipline.id}
                                                            />
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="font-medium text-gray-800">
                                                                {discipline.descricao}
                                                            </div>
                                                        </td>
                                                        <td className="p-2 hidden">
                                                            <div className="flex justify-center ">
                                                                <button>
                                                                    <svg className="w-8 h-8 hover:text-blue-600 rounded-full 
                                                 hover:bg-gray-100 p-1"
                                                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                                        </path>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                ))
                                            )
                                    )
                                }

                            </tbody>
                        </table>
                    </div>

                    {/**  <!-- total amount --> */}
                    <div className="flex justify-end font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4">
                        <div>Total</div>
                        <div className="text-blue-600"> <span x-text="total.toFixed(2)">{data?.length}</span></div>
                    </div>

                    <div className="flex justify-end">
                        {/**  <!-- send this data to backend (note: use className 'hidden' to hide this input) --> */}
                        <input type="hidden" className="border border-black bg-gray-50" x-model="selected" />
                    </div>
                </div>
            </div >
        </section >


    );
}

export default MinhasDisciplinasTable;