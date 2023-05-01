import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import HeaderAdmin from '../../../components/Admin/HeaderAdmin';
import ModalAddDisciplina from '../../../components/Admin/ModalAddDisciplina';
import TableDisciplina from '../../../components/Admin/TableDisciplina';
import Pagination from '../../../components/Pagination';
// import { Container } from './styles';

const Disciplinas: NextPage = () => {


    let [isOpen, setIsOpen] = useState(false)

    return <>
        <HeaderAdmin />
        <main className='px-8 flex gap-8 -mt-10'>
            <Head>
                <title>Disciplina | Sistema de avaliação de docentes</title>
            </Head>
            <ModalAddDisciplina isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className='flex-1'>
                <div className="container px-5 py-16 mx-auto">
                    <div className="flex items-center justify-center gap-4 max-w-fit mb-6 relative mx-auto">

                        <h2 className="font-bold text-center text-xl">Lista de disciplinas</h2>


                        <button
                            onClick={() => setIsOpen(true)}
                            title="Cadastrar nova Disciplina"
                            className="botao-icone animacao-link abasolute -top-2 rounded-full h-10 w-10">
                            <BiPlus className="h-4 w-4" />

                        </button>
                    </div>


                    <TableDisciplina />

                    <Pagination />
                </div>

            </div>
        </main>

    </>
}

export default Disciplinas;