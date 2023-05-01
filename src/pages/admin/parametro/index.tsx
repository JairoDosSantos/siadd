import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import HeaderAdmin from '../../../components/Admin/HeaderAdmin';
import ModalCadastrarParametro from '../../../components/Admin/ModalCadastrarParametro';
import TableParametro from '../../../components/Admin/TableParametro';
import Pagination from '../../../components/Pagination';


const Parametro: NextPage = () => {

    let [isOpen, setIsOpen] = useState(false)

    return <>
        <HeaderAdmin />
        <main className='px-8 flex gap-8 -mt-10'>
            <Head>
                <title>Dashboard | Sistema de avaliação de docentes</title>
            </Head>
            <ModalCadastrarParametro isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className='flex-1'>
                <div className="container px-5 py-16 mx-auto">
                    <div className="flex items-center justify-center gap-4 max-w-fit mb-6 relative mx-auto">

                        <h2 className="font-bold text-center text-xl">Lista de Parâmetro</h2>


                        <button
                            onClick={() => setIsOpen(true)}
                            title="Cadastrar novo Parâmetro"
                            className="botao-icone animacao-link abasolute -top-2 rounded-full h-10 w-10">
                            <BiPlus className="h-4 w-4" />

                        </button>
                    </div>


                    <TableParametro />

                    <Pagination />
                </div>

            </div>
        </main>

    </>
}

export default Parametro;