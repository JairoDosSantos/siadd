import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import HeaderAdmin from '../../../components/Admin/HeaderAdmin';
import ModalCadastrarDimensao from '../../../components/Admin/ModalAddDimensao';
import TableDimensao from '../../../components/Admin/TableDimensao';
import Pagination from '../../../components/Pagination';
// import { Container } from './styles';

const Disciplinas: NextPage = () => {


    let [isOpen, setIsOpen] = useState(false)

    return <>
        <HeaderAdmin />
        <main className='px-8 flex gap-8 -mt-10'>
            <Head>
                <title>Dashboard | Sistema de avaliação de docentes</title>
            </Head>
            <ModalCadastrarDimensao isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className='flex-1'>
                <div className="container px-5 py-16 mx-auto">
                    <div className="flex items-center justify-center gap-4 max-w-fit mb-6 relative mx-auto">

                        <h2 className="font-bold text-center text-xl">Lista de dimensões</h2>


                        <button
                            onClick={() => setIsOpen(true)}
                            title="Cadastrar nova Dimensão"
                            className="botao-icone animacao-link abasolute -top-2 rounded-full h-10 w-10">
                            <BiPlus className="h-4 w-4" />

                        </button>
                    </div>


                    <TableDimensao />

                    <Pagination />
                </div>

            </div>
        </main>

    </>
}

export default Disciplinas;