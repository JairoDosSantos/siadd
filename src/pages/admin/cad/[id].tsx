import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from 'react-query';
import HeaderAdmin from '../../../components/Admin/HeaderAdmin';
import ModalElegerAvaliados from '../../../components/Admin/ModalElegerAvaliados';
import Pagination from '../../../components/Pagination';
import { api } from '../../../service/api';
import { IDocente, generalType } from '../eleger_membros_cad';

const MembrosCADRelatorio = dynamic(() => import('../../../components/relatorios/MembrosCAD'), { ssr: false })

type DocentesCADType = {
    cad: CadType
    Docentes: IDocente[]
}
type CadType = {
    descricao: string;
    estado_cad: generalType;
    ativo: number
}

const DocentesCAD: NextPage = () => {

    const [searchDocente, setSearchDocente] = useState("")
    let [showModal, setShowModal] = useState(false)
    let [docenteAvaliador, setDocenteAvaliador] = useState<IDocente>({} as IDocente)
    const route = useRouter();
    const { id } = route.query

    const fetchDocentesCAD = async () => {

        try {
            const { data } = await api.get(`docente/cad/${id}`)
            return data as DocentesCADType
        } catch (error) {

        }

    }

    const { data } = useQuery("listaDeDocentesDeUmCAD", fetchDocentesCAD, { cacheTime: 100 })

    const docenteFiltrado = searchDocente ? data?.Docentes.filter((docente) => docente.nome_docente.toLowerCase().includes(searchDocente.toLowerCase())) : []
    return (
        <>

            {
                docenteAvaliador.id && (
                    <ModalElegerAvaliados
                        idDocente={docenteAvaliador}
                        isOpen={showModal}
                        setIsOpen={setShowModal} />
                )
            }
            <HeaderAdmin />
            <main className='px-8 flex gap-8 -mt-10'>
                <Head>
                    <title>Membros do CAD | Sistema de avaliação de docentes</title>
                </Head>

                <div className='flex-1'>
                    <div className="container px-5 py-16 mx-auto">
                        <div className="flex flex-col items-center justify-center gap-4 max-w-fit mb-6 relative mx-auto">

                            <h2 className="font-bold text-center text-xl"> Lista de Docentes pertencentes ao {data?.cad?.descricao}</h2>
                        </div>

                        <div className="flex justify-end max-w-3xl mx-auto text-center">

                            {
                                data ?
                                    (<MembrosCADRelatorio membrosCAD={data} />) : ""
                            }
                        </div>
                        <div className="flex flex-wrap mt-4 text-center">
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
                                                    onChange={(event) => setSearchDocente(event.target.value)}
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
                                                        <th className="p-2  text-left">
                                                            <span className="font-semibold">DOCENTE</span>
                                                        </th>
                                                        <th className="p-2">
                                                            <span className="font-semibold text-left">CATEGORIA PROFISSIONAL</span>
                                                        </th>
                                                        <th className="p-2">
                                                            <span className="font-semibold text-left">MEMBRO</span>
                                                        </th>
                                                        <th className="p-2">
                                                            <span className="font-semibold text-center">Acção</span>
                                                        </th>
                                                    </tr>

                                                </thead>

                                                <tbody className="text-sm divide-y divide-gray-100">
                                                    {/**               <!-- record 1 --> */}
                                                    {
                                                        !searchDocente.length ? (
                                                            data?.Docentes.map((docente, index) => (
                                                                <tr
                                                                    onClick={() => { setDocenteAvaliador(docente); setShowModal(true) }}
                                                                    key={index}
                                                                    className='hover:brightness-75 cursor-pointer animacao-link'>
                                                                    <td className="p-2">

                                                                    </td>
                                                                    <td className="p-2 flex flex-col items-start gap-2">
                                                                        <span className=" ">
                                                                            {docente.nome_docente}
                                                                        </span>
                                                                        <span className=" text-gray-400 text-sm font-bold ">
                                                                            {docente.grau_academico?.descricao}
                                                                        </span>
                                                                    </td>
                                                                    <td className="p-2">

                                                                        {docente.categoria.descricao}

                                                                    </td>
                                                                    <td
                                                                        title={docente.estado}
                                                                        className="p-2">
                                                                        <span className="font-medium text-gray-800">
                                                                            {docente.estado}
                                                                        </span>
                                                                    </td>
                                                                    <td className="p-2 ">
                                                                        <div className="flex justify-center ">
                                                                            <button

                                                                                title='Remover docente'>
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
                                                            docenteFiltrado?.map((docente, index) => (
                                                                <tr

                                                                    key={index}
                                                                    className='hover:brightness-75 cursor-pointer animacao-link'>
                                                                    <td className="p-2">

                                                                        <input

                                                                            type="checkbox" className="w-5 h-5" value={docente.id}
                                                                        />
                                                                    </td>
                                                                    <td className="p-2 flex flex-col items-start gap-2">
                                                                        <span className=" ">
                                                                            {docente.nome_docente}
                                                                        </span>
                                                                        <span className=" text-gray-400 text-sm font-bold ">
                                                                            {docente.grau_academico?.descricao}
                                                                        </span>
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <span className="font-medium text-gray-800">
                                                                            {docente.categoria.descricao}
                                                                        </span>
                                                                    </td>
                                                                    <td
                                                                        title={docente.estado}
                                                                        className="p-2">
                                                                        <span className="font-medium text-gray-800">
                                                                            {docente.estado}
                                                                        </span>
                                                                    </td>
                                                                    <td className="p-2 ">
                                                                        <div className="flex justify-center ">
                                                                            <button
                                                                                title='Remover docente'>
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
                                            <div className="text-blue-600"> <span x-text="total.toFixed(2)">{data?.Docentes.length}</span></div>
                                        </div>

                                        <div className="flex justify-end">
                                            {/**  <!-- send this data to backend (note: use className 'hidden' to hide this input) --> */}
                                            <input type="hidden" className="border border-black bg-gray-50" x-model="selected" />
                                        </div>
                                    </div>
                                </div >
                            </section >
                        </div>
                        <Pagination />
                    </div>

                </div>
            </main>

        </>
    );
}

export default DocentesCAD;