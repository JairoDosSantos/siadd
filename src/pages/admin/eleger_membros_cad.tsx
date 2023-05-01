import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';
import { useQuery } from 'react-query';
import LoadImage from '../../assets/load.gif';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';
import ModalElegerMembroCad from '../../components/Admin/ModalElegerMembroCad';
import Pagination from '../../components/Pagination';
import { api } from '../../service/api';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

export interface IDocente {

    id?: number;
    nome_docente: string;
    categoria: generalType;
    estado?: string;
    grau_academico?: generalType;
    cargo?: generalType

}



export type generalType = {
    descricao: string;
    id?: number
}

const Professores: NextPage = () => {

    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<IDocente>();
    let [load, setLoad] = useState(false)
    let [searchDocente, setSearchDocente] = useState("")

    let [idDocente, setIdDocente] = useState(0)
    const getAllDocents = async () => {

        try {

            const response = await api.get('elegerdocente/cad/')

            return response.data as IDocente[]

        } catch (error) {
            console.log(error);
        }

    }

    const onSubmit: SubmitHandler<IDocente> = async (data) => {
        try {

            setLoad(true)
            const submitAPI = await api.post("/cadDocente", {
                estado_cad_id: data.id,
                docente_id: data.id
            })

            if (submitAPI.status === 201)
                setShowSuccessAlert(true)
            setLoad(false)

        } catch (error) {

            setLoad(false)
            setShowErrorAlert(true)

        }
    }

    const { isLoading, error, data } = useQuery('fetchDocentesCLS', getAllDocents, { cacheTime: 100 })

    const filteredDocente = searchDocente ? data?.filter((docente) => docente.nome_docente?.toLowerCase().includes(searchDocente.toLowerCase())) : []

    const eleger = () => {
        setLoad(!load)
    }

    return (
        <>

            <HeaderAdmin />
            <main className='px-8 flex gap-8 -mt-10'>
                <SweetAlert2
                    backdrop={true}
                    show={showSuccessAlert}
                    title='Sucesso'
                    text='Novo membro adicionado com sucesso!'
                    onConfirm={() => { setShowSuccessAlert(false) }}
                    icon='success'
                    allowOutsideClick={true}
                    allowEnterKey={true}
                    allowEscapeKey={true}
                    showConfirmButton={true}
                    confirmButtonColor="#4051ef"
                />

                <SweetAlert2
                    backdrop={true}
                    show={showErrorAlert}
                    title='Erro'
                    text='Ocorreu um erro ao efectuar a operação. Por favor, verifique se o docente que está a tentar adicionar já não faz parte do CAD!'
                    icon='error'
                    onConfirm={() => setShowErrorAlert(false)}
                    didClose={() => setShowErrorAlert(false)}
                    didDestroy={() => setShowErrorAlert(false)}
                    allowOutsideClick={true}
                    allowEnterKey={true}
                    allowEscapeKey={true}
                    showConfirmButton={true}
                    confirmButtonColor="#4051ef"

                />
                <Head>
                    <title>Dashboard | Sistema de avaliação de desempenho de docentes</title>
                </Head>

                <ModalElegerMembroCad
                    setIsOpen={setShowModal}
                    isOpen={showModal}
                    idDocente={idDocente} />

                <div className='flex-1'>
                    <div className="container lg:px-5 py-16 mx-auto">
                        <div className="flex flex-col items-center justify-center gap-4 lg:max-w-fit mb-6 relative mx-auto">

                            <h2 className="font-bold text-center text-xl">Eleja Docentes para serem membros do CAD.</h2>

                            {
                                load ? (<>
                                    <Image src={LoadImage} height={25} width={20} />
                                    <span>Aguarde o processamento...</span>
                                </>) : (
                                    <>

                                    </>
                                )

                            }

                        </div>
                        <div className="flex lg:max-w-4xl w-full justify-center lg:mx-auto -m-4 text-center">
                            <div className='rounded px-6 py-4 shadow bg-white dark:bg-gray-200 w-full '>
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
                                                <th className="p-2 font-semibold text-left">
                                                    Docentes
                                                </th>
                                                <th className="p-2 font-semibold text-right">
                                                    Eleger
                                                </th>
                                            </tr>


                                        </thead>

                                        <tbody className="text-sm divide-y divide-gray-100">
                                            {/**               <!-- record 1 --> */}
                                            {

                                                !searchDocente?.length ?

                                                    data?.map((docente, index) => (
                                                        <tr

                                                            key={index}
                                                            className='hover:brightness-75'>
                                                            <td className="p-2">
                                                                <input type="checkbox" className="w-5 h-5" value={docente.id}
                                                                />
                                                            </td>
                                                            <td className="p-2 flex flex-col items-start">
                                                                <span className="font-medium text-gray-800">
                                                                    {docente.nome_docente}
                                                                </span>
                                                                <span className="font-xs text-gray-400">
                                                                    {docente.categoria.descricao}
                                                                </span>
                                                            </td>
                                                            <td className="p-2 text-right">

                                                                <button
                                                                    onClick={() => { docente.id && setIdDocente(docente?.id); setShowModal(true) }}
                                                                    type='button'
                                                                    title='Eleger docente'
                                                                    className=' rounded-full bg-blue-800  animacao-link over:brightness-75'>
                                                                    <RiAddLine className='text-4xl  font-bold h text-white ' />
                                                                </button>

                                                            </td>

                                                        </tr>

                                                    ))
                                                    : (
                                                        filteredDocente?.map((docente, index) => (
                                                            <tr
                                                                key={index}
                                                                className=''>
                                                                <td className="p-2">
                                                                    <input type="checkbox" className="w-5 h-5" value={docente.id}
                                                                    />
                                                                </td>
                                                                <td className="p-2 flex flex-col items-start">
                                                                    <span className="font-medium text-gray-800">
                                                                        {docente.nome_docente}
                                                                    </span>
                                                                    <span className="font-xs text-gray-400">
                                                                        {docente.categoria.descricao}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 ">
                                                                    <button
                                                                        onClick={() => { docente.id && setIdDocente(docente?.id); setShowModal(true) }}
                                                                        type='button'
                                                                        title='Eleger docente'
                                                                        className=' rounded-full bg-blue-800  animacao-link over:brightness-75'>
                                                                        <RiAddLine className='text-4xl  font-bold h text-white ' />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )
                                            }

                                        </tbody>
                                    </table>
                                </>
                            </div>



                        </div>
                        <Pagination />
                    </div>

                </div>
            </main>

        </>
    );
}

export default Professores;