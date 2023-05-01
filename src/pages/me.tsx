import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

// import { Container } from './styles';

const MeuPerfil: NextPage = () => {
    return (
        <>
            <Head>
                <title>Dimensão Ensino | Sistema de avaliação de docentes</title>
            </Head>
            <Header />

            <main className='px-8 flex flex-wrap gap-4 justify-center -mt-10 pb-4'>
                <div className='flex-1'>
                    <div className="container px-5 py-16 mx-auto">
                    </div>
                </div>
            </main>

        </>
    );
}

export default MeuPerfil;