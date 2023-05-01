import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { api } from '../../service/api';

// import { Container } from './styles';

type ParametroType = {
    id?: number;
    descricao: string;
    dimensao_id: number
}

type IndicadorType = {
    id?: number;
    descricao: string;
    pontuacao: number;
    parametro: ParametroType
}

const TableIndicator: React.FC = () => {

    let [searchIndicator, setSearchIndicator] = useState("");

    const fetchAllDicators = async () => {

        try {

            const getIndicators = await api.get('/indicador')
            return getIndicators.data as IndicadorType[]

        } catch (error) {

        }

    }

    const fetchDimension = async () => {

        try {

            const getIndicators = await api.get('/dimensao')
            return getIndicators.data as IndicadorType[]

        } catch (error) {

        }

    }

    const { data, isLoading } = useQuery('fetchAllDicators', fetchAllDicators)
    const { data: Dimensao } = useQuery('fetchDimensaoInd', fetchDimension)


    const filteredIndicators = searchIndicator ? data?.filter((indicador) => indicador.descricao.toLowerCase().includes(searchIndicator.toLocaleLowerCase())) : []

    const findDimensao = (id: number) => {
        const dimensao = Dimensao?.find((dim) => dim.id === id)

        return dimensao?.descricao
    }

    return (

        <section className="antialiased ">
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
                                onChange={(event) => setSearchIndicator(event.target.value)}
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
                                        <span className="font-semibold text-left">Indicador</span>
                                    </th>
                                    <th className="p-2 text-left">
                                        <span className="font-semibold text-left">Peso</span>
                                    </th>
                                    <th className="p-2 text-left">
                                        <span className="font-semibold text-left">Parâmetro</span>
                                    </th>
                                    <th className="p-2 text-left">
                                        <span className="font-semibold text-center">Acção</span>
                                    </th>
                                </tr>


                            </thead>

                            <tbody className="text-sm divide-y divide-gray-100">
                                {/**               <!-- record 1 --> */}
                                {
                                    isLoading ? (
                                        <p className='text-center font-bold'>Processando os parâmetros... ⏳</p>
                                    ) : (
                                        !searchIndicator ? data?.map((indicador, index) => (
                                            <tr
                                                key={index}
                                                className=''>
                                                <td className="p-2">
                                                    <input type="checkbox" className="w-5 h-5" value={indicador.id}
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <span className="font-medium text-gray-800">
                                                        {indicador.descricao}
                                                    </span>
                                                </td>
                                                <td className="p-2">
                                                    <span className="font-medium text-gray-800">
                                                        {indicador.pontuacao}
                                                    </span>
                                                </td>

                                                <td className="p-2 flex flex-col gap-2 justify-start items-start">
                                                    <span className="font-medium text-gray-800">
                                                        {indicador.parametro.descricao}
                                                    </span>
                                                    <span className='font-bold text-gray-500 text-sm'>
                                                        {findDimensao(indicador.parametro.dimensao_id)}
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

                                        )) : filteredIndicators?.map(
                                            (indicadorFiltrado) => (
                                                <tr
                                                    key={indicadorFiltrado.id}
                                                    className=''>
                                                    <td className="p-2">
                                                        <input type="checkbox" className="w-5 h-5" value={indicadorFiltrado.id}
                                                        />
                                                    </td>

                                                    <td className="p-2">
                                                        <span className="font-medium text-gray-800">
                                                            {indicadorFiltrado.descricao}
                                                        </span>
                                                    </td>
                                                    <td className="p-2">
                                                        <span className="font-medium text-gray-800">
                                                            {indicadorFiltrado.pontuacao}
                                                        </span>
                                                    </td>

                                                    <td className="p-2 flex flex-col gap-2 justify-start items-start">
                                                        <span className="font-medium text-gray-800">
                                                            {indicadorFiltrado.parametro.descricao}
                                                        </span>
                                                        <span className='font-bold text-gray-500 text-sm'>
                                                            {findDimensao(indicadorFiltrado.parametro.dimensao_id)}
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
                                            )
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

export default TableIndicator;