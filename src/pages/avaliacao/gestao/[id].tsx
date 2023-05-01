import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import Header from '../../../components/Header';
import DimensaoModal from '../../../components/avaliacao/AvaliacaoModal';
// import { Container } from './styles';

const DimensaoGestao: NextPage = () => {

    let [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Head>
                <title>Dimensão Gestão | Sistema de avaliação de docentes</title>
            </Head>

            <Header />

            <main className='px-8 flex flex-wrap gap-4 justify-center -mt-10 pb-4'>
                <div className='flex-1'>
                    <div className="container px-5 py-16 mx-auto">
                        <div className="flex items-center justify-center gap-4 max-w-fit mb-6 relative mx-auto">

                            <h2 className="font-bold text-center text-xl">Dimensão Gestão - Respostas</h2>

                            <button
                                onClick={() => setIsOpen(true)}
                                title="Iniciar avaliação"
                                className="botao-icone animacao-link abasolute -top-2 rounded-full h-10 w-10">
                                <BiPlus className="h-4 w-4" />

                            </button>

                        </div>

                        {isOpen && (
                            <DimensaoModal
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}

                            />
                        )}

                    </div>
                </div>
            </main>
        </>);
}

export default DimensaoGestao;