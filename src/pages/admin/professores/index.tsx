import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FiAlertOctagon } from 'react-icons/fi';
import { useQuery } from 'react-query';
import HeaderAdmin from '../../../components/Admin/HeaderAdmin';
import CadastrarProfessor from '../../../components/Admin/ModalAddProfessor';
import ProfessorCard from '../../../components/Admin/ProfessorCard';
import Pagination from '../../../components/Pagination';
import { api } from '../../../service/api';

export interface IDocente {

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

}

type ClassificacaoType = {
    docente: IDocente;
    estado: string;
    valor: number
}

type generalType = {
    descricao: string;
    id?: number
}

const Professores: NextPage = () => {

    let [isOpen, setIsOpen] = useState(false)

    const getAllDocents = async () => {

        try {

            const response = await api.get('docente/classificacao')

            return response.data as ClassificacaoType[]

        } catch (error) {
            console.log(error);
        }

    }

    const { isLoading, error, data } = useQuery('fetchDocentesCLS', getAllDocents)

    return (
        <>
            <HeaderAdmin />
            <main className='px-8 flex gap-8 -mt-10'>
                <Head>
                    <title>Dashboard | Sistema de avaliação de docentes</title>
                </Head>

                {
                    isOpen && (<CadastrarProfessor
                        isOpen={isOpen}
                        setIsOpen={setIsOpen} />)
                }
                <div className='flex-1'>
                    <div className="container px-5 py-16 mx-auto">
                        <div className="flex items-center justify-center gap-4 max-w-fit mb-6 relative mx-auto">

                            <h2 className="font-bold text-center text-xl">Lista de Docentes</h2>

                            <button
                                onClick={() => setIsOpen(true)}
                                title="Cadastrar novo Professor"
                                className="botao-icone animacao-link abasolute -top-2 rounded-full h-10 w-10">
                                <BiPlus className="h-4 w-4" />
                            </button>

                        </div>
                        <div className="flex flex-wrap -m-4 text-center">
                            {
                                isLoading ? (
                                    <div className='flex items-center justify-center w-full space-x-2'>
                                        <div className='w-4 h-4 rounded-full border-t-0 border-2 border-azul animate-spin' />
                                        <span>Fetching yours data, please wait!</span>
                                    </div>
                                ) :
                                    error ? (
                                        <div className='flex items-top justify-center w-80 py-4 px-2 my-10 mx-auto border-2 border-red-400 rounded'>
                                            <FiAlertOctagon className='text-red-400 h-4 w-8 ' />
                                            <span className='text-red-400 font-bold animate-pulse -ml-[2px]'>Error when we tried to fetch yours datas, please call your admin.!</span>
                                        </div>
                                    ) :
                                        data?.map((docente, index) => (

                                            <ProfessorCard
                                                id={docente.docente?.id || 0}
                                                key={index}
                                                cargo={docente.docente?.cargo?.descricao}
                                                classificacao={docente.estado}
                                                nome={docente.docente?.nome_docente} />
                                        ))
                            }

                        </div>
                        <Pagination />
                    </div>

                </div>
            </main>

        </>
    );
}

export default Professores;