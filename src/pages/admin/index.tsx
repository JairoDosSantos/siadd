
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import nookies from 'nookies';
import { FaChalkboardTeacher, FaUserTie } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';
import SidebarAdmin from '../../components/Admin/SideBarAdmin';
import { api } from '../../service/api';
import { wrapper } from '../../store/store';
import { generalType } from './eleger_membros_cad';

type DashTypeAdmin = {
    Integral: number;
    Parcial: number;
    resumoGrafico: HistoricoGrafico[]
}

type HistoricoGrafico = {
    periodo: generalType;
    Aprovados: number;
    Reprovados: number
}
const ChartDinamyc = dynamic(() => import('react-apexcharts'), { ssr: false })
const Dashboard = ({ Integral, Parcial, resumoGrafico }: DashTypeAdmin) => {

    const totalDocentes = Integral + Parcial;
    const totalDocenteParcial = Parcial;
    const totalDocenteEfectivo = Integral;


    const CategoriesArray = resumoGrafico?.map((resumo) => resumo.periodo.descricao) || []
    const Aprovados = resumoGrafico?.map((resumo) => resumo.Aprovados) || []
    const Reprovado = resumoGrafico?.map((resumo) => resumo.Reprovados) || []

    const options = {
        options: {
            chart: {
                id: "basic-bar",
                stacked: true
            },
            xaxis: {
                categories: CategoriesArray
            }

        },

        series: [

            {
                name: "Pontuação acima, ou igual a 50 pontos",
                data: Aprovados
            },
            {
                name: "Baixa Classificação",
                data: Reprovado
            }
        ],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        legend: {
            position: 'bottom',
            horizontalAlign: "center"
        }
    }

    return (
        <>
            <HeaderAdmin />
            <main className='px-8 flex gap-8 -mt-10'>
                <Head>
                    <title>Dashboard | Admin.</title>
                </Head>

                <SidebarAdmin />
                <div className='flex-1'>
                    <div className='flex flex-col gap-4 bg-white dark:bg-gray-300 rounded-3xl' >
                        <div className='rounded-xl px-6 py-6 shadow  bg-white dark:bg-gray-200 grid md:grid-cols-3 gap-2 '>
                            <div className='bg-entrada-card text-white p-4 shadow rounded mx-auto flex items-center gap-2'>
                                <div>
                                    <div>
                                        <FaChalkboardTeacher className='h-20 w-20 text-gray-200' />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 items-center'>
                                    <span className='text-right font-bold text-xl'>
                                        Total Docentes
                                    </span>
                                    <span className='text-lg font-extrabold'>
                                        {
                                            totalDocentes
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className='bg-saida-card text-white p-4 shadow rounded mx-auto flex items-center gap-4'>
                                <div>
                                    <GiTeacher className='h-20 w-20 text-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2 items-center'>
                                    <span className='text-right font-bold text-xl'>
                                        Total Parcial
                                    </span>
                                    <span className='text-lg font-extrabold'>
                                        {
                                            totalDocenteParcial
                                        }
                                    </span>
                                </div>
                            </div>
                            <div
                                className={`bg-gray-300 animate-none text-black p-4 shadow rounded mx-auto flex items-center 
                                gap-4`}>
                                <div>

                                    <FaUserTie className='h-20 w-20' />

                                </div>
                                <div className='flex flex-col gap-2 items-center'>
                                    <span className='text-right font-bold text-xl'>
                                        Total Efectivos
                                    </span>
                                    <span className='text-lg font-extrabold'>
                                        {
                                            totalDocenteEfectivo
                                        }
                                    </span>
                                </div>


                            </div>
                        </div>
                        <div className='rounded-3xl px-6 py-4 shadow bg-white dark:bg-gray-200 '>
                            <h2
                                className='text-gray-400 font-bold text-left text-base ml-4'>
                                Resumo gráfico dos resultados</h2>
                            <ChartDinamyc
                                options={options.options}
                                series={options.series}
                                type="bar"
                                height={250}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(

    (store) =>
        async (context: GetServerSidePropsContext) => {

            const { USER_LOGGED_CAD } = nookies.get(context)


            if (!USER_LOGGED_CAD) {
                // If no user, redirect to index.
                return { props: {}, redirect: { destination: '/', permanent: false } }
            }

            //const user = JSON.parse(USER_LOGGED_CAD.trim());

            try {

                const response = await api.get(`/docente/qtdcontratacao`)
                const historico = await api.get(`/periodo/historico`)
                const { Parcial, Integral } = response.data


                return {
                    props: {
                        Integral,
                        Parcial,
                        resumoGrafico: historico.data
                    },
                };
            } catch (error) {
                console.log(error);
                return {
                    props: {
                        Integral: 0, Parcial: 0, resumoGrafico: null
                    },
                };
            }

        }
);

export default Dashboard;