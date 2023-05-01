import Router from 'next/router';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { api } from '../../service/api';

// import { Container } from './styles';

type CadType = {
    id?: number;
    descricao: string;
    ativo: number;
    docente_cad: DocenteType[]
}

type DocenteType = {
    id?: number,
    nome_docente: string,
    numero_mecanografico: string,
}

const TableCad: React.FC = () => {


    let [searchCad, setSearchCad] = useState("")

    const getAlLCAD = async () => {
        try {

            const getCAD = await api.get('/cad')
            return getCAD.data as CadType[]

        } catch (error) {

        }
    }

    const { data, isLoading, error } = useQuery('fetchCAD', getAlLCAD)

    const filteredCAD = searchCad ? data?.filter((cad) => cad.descricao.toLowerCase().includes(searchCad.toLowerCase())) : []

    return (

        <section className="antialiased mx-auto w-3/4  ">
            <div className="flex flex-col justify-center h-full">
                {/**   <!-- Table --> */}
                <div className="w-full max-w-2xl lg:max-w-3xl mx-auto bg-gray-100 dark:bg-gray-300 shadow-lg 
                rounded-sm border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-200 w-full">
                        <div className="font-semibold text-gray-800 rounded-full 
                        bg-gray-50  flex items-center px-4 gap-4  w-full">
                            <label htmlFor="search">
                                <FaSearch className='h-6 w-6 text-gray-400' />
                            </label>
                            <input
                                onChange={(event) => setSearchCad(event.target.value)}
                                type="search"
                                id='search'
                                className='bg-gray-50 dark:bg-white w-full
                                border-none rounded-full text-gray-400 focus:border-none focus:ring-0' />
                        </div>
                    </header>

                    <div className="overflow-x-auto p-3 ">
                        <table className="table-auto w-full ">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 dark:bg-gray-200">

                                <tr>
                                    <th></th>
                                    <th className="p-2">
                                        <span className="font-semibold text-left">DESCRIÇÃO</span>
                                    </th>
                                    <th className="p-2">
                                        <span className="font-semibold text-left">Nº de elemento</span>
                                    </th>
                                    <th className="p-2">
                                        <span className="font-semibold text-left">activo</span>
                                    </th>
                                    <th className="p-2">
                                        <span className="font-semibold text-center">Acção</span>
                                    </th>
                                </tr>


                            </thead>

                            <tbody className="text-sm divide-y divide-gray-100">
                                {/**               <!-- record 1 --> */}
                                {
                                    !searchCad.length ? (
                                        data?.map((cad, index) => (
                                            <tr
                                                onClick={() => Router.push(`/admin/cad/${cad.id}`)}
                                                key={index}
                                                className='hover:brightness-75 cursor-pointer animacao-link'>
                                                <td className="p-2">

                                                </td>
                                                <td className="p-2">
                                                    <span className=" ">
                                                        {cad.descricao}
                                                    </span>
                                                </td>
                                                <td className="p-2">
                                                    <span className=" ">
                                                        {cad.docente_cad.length}
                                                    </span>
                                                </td>
                                                <td
                                                    title={cad.ativo === 1 ? "Activo" : "Inactivo"}
                                                    className="p-2">
                                                    <span className={`  px-3 py-1 rounded-full ${cad.ativo === 1 ? "bg-green-700" : "bg-red-700"}`}>

                                                    </span>
                                                </td>
                                                <td className="p-2 ">
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

                                        ))) : (
                                        filteredCAD?.map((cad, index) => (
                                            <tr
                                                onClick={() => Router.push(`/admin/cad/${cad.id}`)}
                                                key={index}
                                                className='hover:brightness-75 cursor-pointer animacao-link'>
                                                <td className="p-2">
                                                    <input type="checkbox" className="w-5 h-5" value={cad.id}
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <span className="font-medium text-gray-800">
                                                        {cad.descricao}
                                                    </span>
                                                </td>
                                                <td className="p-2">
                                                    <span className=" ">
                                                        {cad.docente_cad.length}
                                                    </span>
                                                </td>
                                                <td
                                                    title={cad.ativo === 1 ? "Activo" : "Inactivo"}
                                                    className="p-2">
                                                    <span className={`  px-3 py-1 rounded-full ${cad.ativo === 1 ? "bg-green-700" : "bg-red-700"}`}>

                                                    </span>
                                                </td>
                                                <td className="p-2 ">
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




export default TableCad;