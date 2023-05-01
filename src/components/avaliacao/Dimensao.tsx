import Link from 'next/link';
import React from 'react';
import { Fa500Px, FaArrowAltCircleRight, FaChalkboardTeacher } from 'react-icons/fa';


import { MdScreenSearchDesktop } from 'react-icons/md';
import { SiGitextensions, SiGoogletagmanager } from 'react-icons/si';

type DimensaoProps = {
    DimensaoType: string;
    description: string;
    estado: "Sim" | "Não" | "Parcial";
    url: string
}

const Dimensao: React.FC<DimensaoProps> = ({ DimensaoType, description, estado, url }: DimensaoProps) => {
    const dimensaoSemAcentuacao = DimensaoType.normalize("NFD")
    console.log(dimensaoSemAcentuacao);
    let estadoDimensao
    let dimensaoIcon = null
    switch (estado) {

        case "Não":
            estadoDimensao = "red"
            break

        default:

            break
    }

    switch (dimensaoSemAcentuacao.toLowerCase()) {
        case "ensino":
            dimensaoIcon = (<FaChalkboardTeacher className='text-6xl text-gray-500' />)
            break;
        case "extensao":
            dimensaoIcon = (<SiGitextensions className='text-6xl text-gray-500' />)
            break
        case "gestao":
            dimensaoIcon = (<SiGoogletagmanager className='text-6xl text-gray-500' />)
            break
        case "investigacao":
            dimensaoIcon = (<MdScreenSearchDesktop className='text-6xl text-gray-500' />)
            break
        default:
            dimensaoIcon = (<Fa500Px className='text-6xl text-gray-500' />)
            break;
    }

    return (

        <div className="max-w-sm px-6 py-5 bg-white border border-gray-200 rounded-lg 
        shadow dark:bg-gray-800 dark:border-gray-700 relative animacao-link">

            <div
                title='Não respondido'
                className={`absolute rounded-full h-4 w-4 bg-${estadoDimensao}-700  right-2 top-2`} />
            <div
                title='Não respondido'
                className={`absolute rounded-full h-4 w-4 bg-${estadoDimensao}-300 animate-pulse right-2 top-2`} />

            {dimensaoIcon}
            <a href="#">
                <h5
                    className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Dimensão {DimensaoType}</h5>
            </a>
            <p
                className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {description}
            </p>
            <Link
                href={url}
            >
                <div className="flex items-center justify-center text-blue-600 hover:underline hover:underline-offset-4 hover:cursor-pointer gap-2">
                    <span className=' animate-pulse text-base' >Começar</span>
                    <FaArrowAltCircleRight className='text-base' />
                </div>

            </Link>
        </div>

    );
}

export default Dimensao;