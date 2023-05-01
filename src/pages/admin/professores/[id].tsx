import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from "react";
import { FaUserEdit } from 'react-icons/fa';
import { MdCardMembership } from 'react-icons/md';
import { useQuery } from 'react-query';
import UserLogo from '../../../assets/image.png';
import HeaderAdmin from '../../../components/Admin/HeaderAdmin';
import ModalEditarDocente from '../../../components/Admin/ModalEditDocente';
import ModalElegerMembroCad from '../../../components/Admin/ModalElegerMembroCad';
import { api } from '../../../service/api';
const PontuacaoRelatorio = dynamic(() => import('../../../components/relatorios/PontuacaoDocente'), { ssr: false })
interface IDocente {

    id?: number;
    nome_docente: string;
    numero_mecanografico: string;
    cargo: generalType;
    grau_academico: generalType;
    percentagem: generalType;
    unidade_organica: generalType;
    categoria: generalType;
    createad_at: string;
    updated_at: string;
    departamento: generalType

}

type DocenteType = {
    docente: IDocente;
    estado: string;
    valor: number
}

type generalType = {
    descricao: string;
    id?: number
}

const Professor: NextPage = () => {

    let [showModalElegerMembroCAD, setShowModalElegerMembroCAD] = useState(false)
    let [showModalEditarDocente, setShowModalEditarDocente] = useState(false)

    const route = useRouter();
    const parametroId = route.query

    const id = Number(parametroId?.id)

    const getDocenteProfile = async () => {

        try {

            const response = await api.get(`/docente/classificacao/${id}`)

            return response.data as DocenteType

        } catch (error: any) {
            console.log(error.message)
        }

    }

    const { isLoading, error, data } = useQuery('fetchDocente', getDocenteProfile)

    const idDocente = Number(data?.docente?.id)

    return (
        <>
            <Head>
                <title>Info. docente | Sistema de avaliação de docentes</title>
            </Head>
            {
                showModalElegerMembroCAD && (
                    <ModalElegerMembroCad
                        idDocente={idDocente}
                        isOpen={showModalElegerMembroCAD}
                        setIsOpen={setShowModalElegerMembroCAD}
                    />)
            }
            {
                showModalEditarDocente && (
                    <ModalEditarDocente
                        data={data?.docente ? data.docente : {} as IDocente}
                        isOpen={showModalEditarDocente}
                        setIsOpen={setShowModalEditarDocente} />
                )
            }
            <HeaderAdmin />
            <main className='px-8 flex flex-col -mt-10 shadow bg-white rounded w-5/6 mx-auto pb-4'>

                <div className='flex flex-col lg:flex-row items-center justify-between w-full py-4'>

                    <div className='lg:-mt-20 -mt-14'>
                        <Image src={UserLogo} className='rounded-full bg-white ' height={150} width={150} />
                        {
                            data ?
                                (<PontuacaoRelatorio docente={data.docente} estado={data.estado} valor={data.valor} />) : ""
                        }
                    </div>
                    <div className='flex gap-4 items-center text-base text-center'>
                        <div className='flex flex-col gap-3 items-center'>
                            <span className='text-gray-400 font-bold'>Pontuação</span>
                            <span className='text-gray-700 font-bold'>{data?.valor}</span>
                        </div>
                        <div className='flex flex-col gap-3 items-center'>
                            <span className='text-gray-400 font-bold'>Classificação</span>
                            <span className=' font-bold text-red-700'>{data?.estado}</span>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row mt-4 lg:mt-0 items-center gap-5'>
                        <button
                            onClick={() => setShowModalEditarDocente(true)}
                            title='Click aquí para actualizar os dados do Docente'
                            className='flex items-center gap-2 bg-azul animacao-link 
                         text-white px-4 py-2 rounded font-bold hover:brightness-75 cursor-pointer'>
                            <FaUserEdit />
                            <span>
                                Actualizar os dados do Docente
                            </span>
                        </button>
                        <button
                            onClick={() => setShowModalElegerMembroCAD(true)}
                            title='Pretende eleger este docente como membro do CAD?'
                            className='flex items-center gap-2 px-4 py-2 animacao-link 
                         rounded bg-dourado text-white font-bold hover:brightness-75 cursor-pointer'>
                            <MdCardMembership />
                            <span> Eleger como membro do CAD</span>
                        </button>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center w-full py-4 mt-6'>
                    <h3 className='text-2xl font-bold'>{data?.docente?.nome_docente}</h3>

                </div>

                <div className='flex flex-col gap-8 lg:flex-row w-full justify-center items-center'>
                    <div className='flex flex-col gap-4 lg:items-end justify-end w-full lg:w-1/2 order-2 lg:order-1'>
                        <div className='text-xl flex'>
                            <span>Cargo</span>: <span className='text-gray-500'>{data?.docente?.cargo?.descricao}</span>
                        </div>
                        <div className='text-xl'>
                            <span>Departamento</span>: <span className='text-gray-500'>{data?.docente?.departamento?.descricao}</span>
                        </div>
                        <div className='text-xl'>
                            <span>Percentagem de contratação</span>: <span className='text-gray-500'>{data?.docente?.percentagem?.descricao}</span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 items-start justify-end w-full lg:w-1/2 order-1 lg:order-2'>
                        <div className='text-xl'>Número MEC : <span className='text-gray-500'>{data?.docente?.numero_mecanografico}</span></div>
                        <div className='text-xl'>
                            <span>Categoria</span>: <span className='text-gray-500'>{data?.docente?.categoria?.descricao}</span>
                        </div>
                        <div className='text-xl'>
                            <span>Grau acadêmico</span>: <span className='text-gray-500'>{data?.docente?.grau_academico?.descricao}</span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Professor;