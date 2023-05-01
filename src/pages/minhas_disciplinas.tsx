import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import MinhasDisciplinasTable from '../components/ProfessorDisciplinaTable';

// import { Container } from './styles';

const MinhasDisciplinas: NextPage = () => {
    return (
        <>
            <Head>
                <title>Comece a sua avaliação | Sistema de avaliação de docentes</title>
            </Head>
            <Header />
            <main className='px-8 flex flex-wrap gap-4 justify-center mt-4 pb-4'>
                {/**
              *    <Sidebar />
              */}
                <MinhasDisciplinasTable />
            </main>
        </>
    );
}

export default MinhasDisciplinas;