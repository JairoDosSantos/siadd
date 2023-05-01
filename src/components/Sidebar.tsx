
import Image from 'next/image'
import User from '../assets/man.svg'

import Link from 'next/link'
import nookies from 'nookies'
import { useEffect, useState } from 'react'
import { AiOutlineTrophy } from 'react-icons/ai'
import { FaTags } from 'react-icons/fa'
import { GiGraduateCap } from 'react-icons/gi'
import { TbUsers } from 'react-icons/tb'
import { VscDashboard, VscVmActive } from 'react-icons/vsc'


function Sidebar() {
    let [user, setUser] = useState<any>()
    useEffect(() => {
        const { USER_LOGGED_CAD } = nookies.get(null)

        const user = JSON.parse(USER_LOGGED_CAD);
        setUser(user)
    }, [])

    return (
        <div className='hidden lg:flex lg:flex-col h-min w-80  border border-gray-200 shadow bg-white dark:bg-gray-200
         px-4 py-6 rounded-3xl -mt-16 space-y-6 transition-all duration-300 mb-4'>
            <div className='flex flex-col items-center space-y-3 border-b border-gray-300 pb-4'>
                <Image src={User} height={100} width={100} objectFit={'contain'} />
                <div className='space-y-2 text-center'>
                    <h2 className='font-bold text-base'>Sr. {user?.name}</h2>
                    <span className='text-gray-500'>{user?.email}</span>
                </div>
            </div>
            <div className=' flex flex-col justify-center items-center'>
                <ul className='flex gap-8 justify-center items-center flex-wrap w-full  text-base' >
                    <li className='sideBar-link activo'>
                        <VscDashboard className='h-8 w-8' />
                        <Link href={'/'}>Dashboard</Link>
                    </li>
                    <li className={`sideBar-link relative ${user?.nivel_acesso_id === 3 ? 'flex' : 'hidden'}`}>
                        <AiOutlineTrophy className='h-8 w-8' />
                        <Link href={'/avaliacao'}>Avaliação</Link>
                        <div className='rounded-full h-2 w-2 bg-red-200 absolute top-[10px] right-9' />
                        <div className='rounded-full h-2 w-2 bg-red-700 absolute top-[10px] right-9 animate-pulse' />
                    </li>
                    <li className={`sideBar-link ${user?.nivel_acesso_id === 2 ? 'flex' : 'hidden'}`}>
                        <VscVmActive className='h-8 w-8' />
                        <Link href={'/validar_avaliacao'} className='truncate'>Validar</Link>
                    </li>
                    <li className='sideBar-link'>
                        <GiGraduateCap className='h-8 w-8' />
                        <Link href={'/minhas_disciplinas'}>Disciplinas</Link>
                    </li>
                    <li className='sideBar-link'>
                        <TbUsers className='h-8 w-8' />
                        <Link href={'/minhas_turmas'}>Turmas</Link>
                    </li>
                    <li className='sideBar-link'>
                        <FaTags className='h-8 w-8' />
                        <Link href={'/minhas_pontuacoes'}>Pontuações</Link>
                    </li>

                    {/**
                    *  <li className='sideBar-link'>
                        <AiOutlineCalendar className='h-8 w-8' />
                        <Link href={'/'}>Validar Avaliação</Link>
                    </li>
                    <li className='sideBar-link'>
                        <BiMessageRounded className='h-8 w-8' />
                        <Link href={'/'}>Messages</Link>
                    </li>
                    <li className='sideBar-link '>
                        <VscSettings className='h-8 w-8' />
                        <Link href={'/'}>Definições</Link>
                    </li>
                    <li className='sideBar-link'>
                        <IoHelpBuoyOutline className='h-8 w-8' />
                        <Link href={'/'}>Ajuda</Link>
                    </li>
                    */}

                </ul>
            </div>
        </div>
    )
}

export default Sidebar
