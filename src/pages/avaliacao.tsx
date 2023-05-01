import { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import Header from '../components/Header';
import Dimensao from '../components/avaliacao/Dimensao';
import { api } from '../service/api';

type DimensaoType = {
    id?: number;
    descricao: string
}
const Avaliacao: NextPage = () => {

    const getAllDimensao = async () => {

        try {

            const fetchDimensao = await api.get(`/dimensao/`)
            return fetchDimensao.data as DimensaoType[]

        } catch (error: any) {

            console.log(error.message)

        }

    }

    const { data, isLoading, error } = useQuery('fetchDimensoes', getAllDimensao)

    return (
        <>
            <Head>
                <title>Comece a sua avaliação | Sistema de avaliação de docentes</title>
            </Head>
            <Header />
            <main className='px-8 flex flex-wrap gap-4 justify-center -mt-10 pb-4'>
                {
                    isLoading ? (
                        <p className='text-center font-bold text-white'>Processando as dimensões ⏳...</p>
                    ) :
                        !error ? (
                            data?.length ? data?.map((dimensao, index) => (
                                <Dimensao
                                    key={index}
                                    description={`Selecione esta dimensão para começar a responder as questões da vertente ${dimensao.descricao}`}
                                    DimensaoType={dimensao.descricao}
                                    estado='Não'
                                    url={`avaliacao/${dimensao.descricao.toLowerCase().trim()}/${dimensao.id}`}
                                />
                            )) : (
                                <p className='text-center font-bold text-white'>Não existem dimensões cadastradas no sistema! 💾</p>
                            )
                        ) : (
                            <p className='text-center font-bold text-white'>Erro na busca das dimensões! 😥</p>
                        )
                }

            </main>
        </>
    );
}

export default Avaliacao;