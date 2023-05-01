
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import nookies from 'nookies';
import { AiOutlineTrophy } from 'react-icons/ai';
import { FaTags } from 'react-icons/fa';
import { VscVmActive } from 'react-icons/vsc';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { api } from '../service/api';
import { wrapper } from '../store/store';
const ChartDinamyc = dynamic(() => import('react-apexcharts'), { ssr: false })
type pontuacoesType = {
    id?: number;
    Periodo: number;
    Pontuacao: number
}

type DashBoardProps = {
    dashboard: pontuacoesType[]
}

const Dashboard = ({ dashboard }: DashBoardProps) => {

    let pontuacao: number[] = []
    let periodo: number[] = []


    dashboard?.sort((dashA, dashB) => {
        if (dashA.Periodo < dashB.Periodo) {
            return -1
        } else {
            return 1
        }
    })

    dashboard?.forEach((dash) => {
        pontuacao.push(dash.Pontuacao);
        periodo.push(dash.Periodo)

    })


    const options = {
        options: {
            chart: {
                id: "basic-bar",
                stacked: true
            },
            xaxis: {
                categories: periodo
            }

        },

        series: [
            {
                name: "series-1",
                data: pontuacao
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

    const notasPositivas = dashboard?.filter((dash) => dash.Pontuacao > 10);
    const totalNotasPositivas = notasPositivas?.length || 0;
    const totalAvaliacaoFeitas = dashboard?.length || 0;
    const ultimaPontuacao = dashboard ? dashboard[totalAvaliacaoFeitas - 1]?.Pontuacao : 0;
    return (
        <>
            <Header />
            <main className='px-8 flex gap-8 -mt-10'>
                <Head>
                    <title>Dashboard | Sistema de avaliação de docentes</title>
                </Head>

                <Sidebar />
                <div className='flex-1'>
                    <div className='flex flex-col gap-4 bg-white dark:bg-gray-300 rounded-3xl' >
                        <div className='rounded-xl px-6 py-6 shadow  bg-white dark:bg-gray-200 grid md:grid-cols-3 gap-2 '>
                            <div className='bg-entrada-card text-white p-4 shadow rounded mx-auto flex items-center gap-2'>
                                <div>
                                    <div>
                                        <AiOutlineTrophy className='h-20 w-20 text-gray-200' />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 items-center'>
                                    <span className='text-right font-bold text-xl'>
                                        Total Aval. feitas
                                    </span>
                                    <span className='text-lg font-extrabold'>
                                        {
                                            totalAvaliacaoFeitas
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className='bg-saida-card text-white p-4 shadow rounded mx-auto flex items-center gap-4'>
                                <div>
                                    <VscVmActive className='h-20 w-20 text-gray-200' />
                                </div>
                                <div className='flex flex-col gap-2 items-center'>
                                    <span className='text-right font-bold text-xl'>
                                        Nº de Positivas
                                    </span>
                                    <span className='text-lg font-extrabold'>
                                        {
                                            totalNotasPositivas
                                        }
                                    </span>
                                </div>
                            </div>
                            <div
                                className={`
                            ${ultimaPontuacao < 50 ? 'bg-red-700 animate-pulse text-white'
                                        : (ultimaPontuacao >= 50 && ultimaPontuacao < 80) ? 'bg-gray-300 animate-none text-black' : 'bg-blue-300 animate-none text-black'
                                    } p-4 shadow rounded mx-auto flex items-center gap-4`
                                }>
                                <div>

                                    <FaTags className='h-20 w-20' />

                                </div>
                                <div className='flex flex-col gap-2 items-center'>
                                    <span className='text-right font-bold text-xl'>
                                        Pontuação
                                    </span>
                                    <span className='text-lg font-extrabold'>
                                        {
                                            ultimaPontuacao
                                        }
                                    </span>
                                </div>


                            </div>
                        </div>

                        <div className='rounded-3xl px-6 py-4 shadow bg-white dark:bg-gray-200 '>
                            <ChartDinamyc
                                options={options.options}
                                series={options.series}
                                type="area"
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

            const cookie = nookies.get(context);

            if (!cookie.USER_LOGGED_CAD)
                return { props: {}, redirect: { destination: '/', permanent: false } }

            const user = JSON.parse(cookie.USER_LOGGED_CAD.trim())
            const idDocente = user?.id;

            try {

                const dashboard = await api.get(`/dashboard/${idDocente}`)

                return {
                    props: {
                        dashboard: dashboard.data,
                    },
                };
            } catch (error) {

                return {
                    props: {
                        dashboard: null
                    },
                };
            }

        }
);
export default Dashboard;