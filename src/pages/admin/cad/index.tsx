import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import HeaderAdmin from '../../../components/Admin/HeaderAdmin';
import TableCad from '../../../components/Admin/TableCad';
import Pagination from '../../../components/Pagination';

import CadastrarCAD from '../../../components/Admin/ModalAddCAD';
import ModalCadastrarPeriodoAvaliacao from '../../../components/Admin/ModalPeriodoAvaliacao';
const membrosCad: NextPage = () => {
    const [showModal, setShowModal] = useState(false)

    const [showModalPeridoAvaliacao, setShowModalPeriodoAvaliacao] = useState(false)

    return (
        <>
            <HeaderAdmin />
            <main className='px-8 flex gap-8 -mt-10'>
                <Head>
                    <title>Dashboard | Sistema de avaliação de docentes</title>
                </Head>
                {showModal && (
                    <CadastrarCAD
                        isOpen={showModal}
                        setIsOpen={setShowModal}
                    />
                )}

                {
                    showModalPeridoAvaliacao && (
                        <ModalCadastrarPeriodoAvaliacao
                            isOpen={showModalPeridoAvaliacao}
                            setIsOpen={setShowModalPeriodoAvaliacao}
                        />
                    )
                }



                <div className='flex-1'>
                    <div className="container px-5 py-16 mx-auto">
                        <div className="flex items-center justify-center gap-4 max-w-fit mb-6 relative mx-auto">

                            <h2 className="font-bold text-center text-xl"> GERIR CAD</h2>

                            <button
                                onClick={() => setShowModal(true)}
                                title="Cadastrar novo CAD"
                                className="botao-icone animacao-link abasolute -top-2 rounded-full h-10 w-10">
                                <BiPlus className="h-4 w-4" />

                            </button>

                        </div>
                        <div className=' flex justify-end space-y-4 lg:max-w-3xl mx-auto'>

                            <button
                                onClick={() => setShowModalPeriodoAvaliacao(true)}
                                title="Cadastrar novo Período de Avaliação"
                                className="botao-icone animacao-link abasolute bg-dourado -top-2 ">
                                <BiPlus className="h-4 w-4" />
                                <span>Novo período de avaliação</span>
                            </button>
                        </div>
                        <div className="flex flex-wrap m-4 text-center">

                            <TableCad />
                        </div>
                        <Pagination />
                    </div>

                </div>
            </main>

        </>
    );
}

export default membrosCad;