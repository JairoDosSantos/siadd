
import Image from 'next/image'
//import nookies from 'nookies'
import Link from 'next/link'
import nookies from 'nookies'
import { useEffect, useState } from 'react'
import { GiGraduateCap } from 'react-icons/gi'
import { IoHelpBuoyOutline } from 'react-icons/io5'
import { TbUsers } from 'react-icons/tb'
import { VscDashboard, VscSettings, VscSymbolParameter } from 'react-icons/vsc'
import User from '../../assets/man.svg'


function SidebarAdmin() {

    const [user, setUser] = useState({ name: "", email: "" })

    useEffect(() => {
        const { USER_LOGGED_CAD } = nookies.get(null)
        const { name, email } = JSON.parse(USER_LOGGED_CAD.trim())
        setUser({ name, email });
    }, [])

    return (
        <div className='hidden lg:flex lg:flex-col h-min w-80  border border-gray-200 shadow bg-white dark:bg-gray-200
         px-4 py-6 rounded-3xl -mt-16 space-y-6 transition-all duration-300 mb-4'>
            <div className='flex flex-col items-center space-y-3 border-b border-gray-300 pb-4'>
                <Image src={User} height={100} width={100} objectFit={'contain'} />
                <div className='space-y-2 text-center'>
                    <h2 className='font-bold text-base'>Sr. {user.name}</h2>
                    <span className='text-gray-500'> {user.email}</span>
                </div>
            </div>
            <div className=' flex flex-col justify-center items-center'>
                <ul className='flex gap-8 justify-center items-center flex-wrap w-full  text-base' >
                    <li className='sideBar-link activo'>
                        <VscDashboard className='h-8 w-8' />
                        <Link href={'/'}>Dashboard</Link>
                    </li>
                    <li className='sideBar-link'>
                        <TbUsers className='h-8 w-8' />
                        <Link href={'/admin/professores'}>Docentes</Link>
                    </li>
                    <li className='sideBar-link truncate' title='Membro CAD'>
                        <TbUsers className='h-8 w-8' />
                        <Link href={'/admin/cad/'}>Gerir CAD</Link>
                    </li>
                    <li className='sideBar-link truncate' title='Membro CAD'>
                        <TbUsers className='h-8 w-8' />
                        <Link href={'/admin/estudante/'}>Estudantes</Link>
                    </li>
                    <li className='sideBar-link'>
                        <GiGraduateCap className='h-8 w-8' />
                        <Link href={'/admin/disciplinas'}>Disciplinas</Link>
                    </li>
                    <li className='sideBar-link'>
                        <VscSymbolParameter className='h-8 w-8' />
                        <Link href={'/admin/parametro'}>Parâmetros</Link>
                    </li>
                    <li className='sideBar-link '>
                        <VscSettings className='h-8 w-8' />
                        <Link href={'/admin/dimensao'}>Dimensões</Link>
                    </li>
                    <li className='sideBar-link'>
                        <IoHelpBuoyOutline className='h-8 w-8' />
                        <Link href={'/admin/indicador'}>Indicadores</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SidebarAdmin
