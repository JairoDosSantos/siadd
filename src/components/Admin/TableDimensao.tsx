import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { api } from '../../service/api';
import ModalEditDimensao from './ModalEditDimensao';

type DimensaoType = {
    id?: number;
    peso: number;
    descricao: string
}

const TableDimensao: React.FC = () => {

    let [showModalToEditDimensao, setShowModalToEditDimensao] = useState(false)
    let [dimensaoData, setDimensaoData] = useState({} as DimensaoType)
    let [searchDimensao, setSearchDimensao] = useState("")

    const getAllDimensao = async () => {
        try {
            const getDimensao = await api.get('/dimensao')
            return getDimensao.data as DimensaoType[]
        } catch (error) {

        }
    }

    const { data, isLoading } = useQuery('fetchDimensao', getAllDimensao)
    const dimensaoFiltrada = searchDimensao ? data?.filter((dimensao) => dimensao.descricao.toLowerCase().includes(searchDimensao.toLowerCase())) : []
    return (

        <section className="antialiased ">
            {
                showModalToEditDimensao && (
                    <ModalEditDimensao
                        dimensao={dimensaoData}
                        isOpen={showModalToEditDimensao}
                        setIsOpen={setShowModalToEditDimensao}
                    />
                )
            }
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
                                onChange={(event) => setSearchDimensao(event.target.value)}
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
                                    <th className="p-2 text-left">
                                        <span className="font-semibold text-left">Dimensão</span>
                                    </th>
                                    <th className="p-2 text-left">
                                        <span className="font-semibold text-left">Peso</span>
                                    </th>

                                    <th className="p-2 text-center">
                                        <span className="font-semibold text-center">Acção</span>
                                    </th>
                                </tr>


                            </thead>

                            <tbody className="text-sm divide-y divide-gray-100">
                                {/**               <!-- record 1 --> */}
                                {
                                    isLoading ? (
                                        <p className='text-center font-bold'>Processando as dimensões... ⏳</p>
                                    ) : !searchDimensao ? (
                                        data?.map((dimensao, index) => (
                                            <tr
                                                key={index}
                                                className=''>
                                                <td className="p-2">
                                                    <input type="checkbox" className="w-5 h-5" value={dimensao.id}
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <span
                                                        onClick={() => { setShowModalToEditDimensao(true); setDimensaoData(dimensao) }}
                                                        title='Clique aquí para editar'
                                                        className="font-bold underline underline-offset-4 text-blue-600 cursor-pointer">
                                                        {dimensao.descricao}
                                                    </span>
                                                </td>
                                                <td className="p-2">
                                                    <span
                                                        className="font-medium text-gray-800">
                                                        {dimensao.peso}
                                                    </span>
                                                </td>
                                                <td className="p-2 ">
                                                    <span className="flex justify-center ">
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
                                                    </span>
                                                </td>
                                            </tr>

                                        ))) : dimensaoFiltrada?.map((dimensao, index) => (
                                            <tr
                                                key={index}
                                                className=''>
                                                <td className="p-2">
                                                    <input type="checkbox" className="w-5 h-5" value={dimensao.id}
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <span
                                                        onClick={() => { setShowModalToEditDimensao(true); setDimensaoData(dimensao) }}
                                                        title='Clique aquí para editar'
                                                        className="font-bold underline underline-offset-4 text-blue-600 cursor-pointer">
                                                        {dimensao.descricao}
                                                    </span>
                                                </td>
                                                <td className="p-2">
                                                    <span
                                                        className="font-medium text-gray-800">
                                                        {dimensao.peso}
                                                    </span>
                                                </td>
                                                <td className="p-2 ">
                                                    <span className="flex justify-center ">
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
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
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

export default TableDimensao;