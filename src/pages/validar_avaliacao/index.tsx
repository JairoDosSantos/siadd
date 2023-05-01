import { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import nookies from 'nookies';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from 'react-query';
import Header from '../../components/Header';
import { api } from '../../service/api';

type DocenteType = {
    id?: number,
    nome_docente: string,
    numero_mecanografico: string,
}

type validarAvaliacaoType = {
    docente: DocenteType
}

const ValidarAvaliacao: NextPage = () => {

    const [searchDocente, setSearchDocente] = useState("")


    const getAllMeusAvaliados = async () => {
        //Buscar ID do professor logado no Cookie
        const { USER_LOGGED_CAD } = nookies.get(null)
        const user = JSON.parse(USER_LOGGED_CAD);

        const idDocente = user?.id;

        try {

            const getTurmaDocente = await api.get(`/avaliador/docente/${idDocente}`)
            return getTurmaDocente.data as validarAvaliacaoType[]

        } catch (error: any) {
            console.log(error.message)
        }

    }


    const { data, isLoading, error } = useQuery('fetchMeuAvaliados', getAllMeusAvaliados)
    const filteredDocente = searchDocente ? data?.filter(({ docente }) => docente.nome_docente?.toLowerCase().includes(searchDocente.toLowerCase())) : []


    return (
        <>
            <Head>
                <title>Valide os seus avaliados | Sistema de avaliação de docentes</title>
            </Head>
            <Header />
            <main className='px-8 flex flex-wrap gap-4 justify-center mt-4 pb-4'>
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
                                        onChange={(e) => setSearchDocente(e.target.value)}
                                        type="search"
                                        id='search'
                                        className='bg-gray-50 dark:bg-white w-full
                                border-none rounded-full text-gray-400 focus:border-none focus:ring-0' />
                                </div>
                            </header>

                            < >
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 dark:bg-gray-200">

                                        <tr>
                                            <th></th>
                                            <th className="p-2 text-left">
                                                <span className="font-semibold ">Docente</span>
                                            </th>

                                            <th className="p-2 text-left">
                                                <span className="font-semibold ">Nº MEC</span>
                                            </th>
                                            <th className="p-2 hidden">
                                                <span className="font-semibold text-center">Acção</span>
                                            </th>
                                        </tr>


                                    </thead>

                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {/**               <!-- record 1 --> */}
                                        {
                                            isLoading ? (
                                                <tr
                                                    className=''>
                                                    <td className="p-2">
                                                        Processando os dados..
                                                    </td>
                                                </tr>
                                            ) : (
                                                !filteredDocente?.length ?
                                                    (
                                                        data?.map((docente, index) => (
                                                            <tr
                                                                onClick={() => Router.push(`/validar_avaliacao/${docente.docente.id}`)}
                                                                key={index}
                                                                className=''>
                                                                <td className="p-2">
                                                                    <input type="checkbox" className="w-5 h-5" value={docente.docente.id}
                                                                    />
                                                                </td>
                                                                <td className="p-2 text-left">
                                                                    <span className="font-medium text-gray-800 cursor-pointer">
                                                                        {docente.docente.nome_docente}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 text-left">
                                                                    <span className="font-medium text-gray-800">
                                                                        {docente.docente.numero_mecanografico}
                                                                    </span>
                                                                </td>

                                                            </tr>

                                                        ))
                                                    ) : (
                                                        filteredDocente?.map((docente, index) => (
                                                            <tr
                                                                onClick={() => Router.push(`/validar_avaliacao/${docente.docente.id}`)}
                                                                key={index}
                                                                className=''>
                                                                <td className="p-2">
                                                                    <input type="checkbox" className="w-5 h-5" value={docente.docente.id}
                                                                    />
                                                                </td>
                                                                <td className="p-2">
                                                                    <span className="font-medium text-gray-800 cursor-pointer">
                                                                        {docente.docente.nome_docente}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2">
                                                                    <span className="font-medium text-gray-800">
                                                                        {docente.docente.numero_mecanografico}
                                                                    </span>
                                                                </td>

                                                            </tr>

                                                        ))
                                                    )
                                            )
                                        }

                                    </tbody>
                                </table>
                            </>

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
            </main>
        </>
    );
}

export default ValidarAvaliacao;