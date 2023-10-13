import React,{ useState } from 'react'
import { LogoutBtn, Logo, Container, ThemeButton } from '../index.js'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {

    const [show,setShow] = useState(false);
    const loginStatus = useSelector(state => state.auth.loginStatus);

    const navItems = [
        {
            name : "Home",
            slug : '/',
            active : true
        },
        {
            name : "Login",
            slug : '/login',
            active : !loginStatus
        },
        {
            name : "Signup",
            slug : '/signup',
            active : !loginStatus
        },
        {
            name : "My Posts",
            slug : '/all-posts',
            active : loginStatus
        },
        {
            name : "Add Post",
            slug : '/add-post',
            active : loginStatus
        }
    ]

    const navLinkStyles = ({ isActive }) => {
        return {
            
          color: '',
          fontWeight: isActive ? 'bolder' : 'normal',
          backgroundColor : isActive ? 'rgb(148, 163, 184) dark:rgb(16 185 129)' : '',
          borderRadius: '15px'
        };
    };

    const toggle = () => {
        setShow(prev => !prev);
    }


    return (
        <header className='w-full p-4 bg-slate-300 dark:bg-slate-700 dark:text-white shadow-md dark:shadow-2xl dark:shadow-zinc-400'>
            <Container>
                <nav className='flex justify-between pt-3 sm:pt-0 md:justify-between flex-wrap'>
                    <div className=' mx-2 my-1'>
                        <Link to='/' >
                            <Logo width='70px'   />
                        </Link>
                    </div>
                    <div className={`${loginStatus? 'md:pl-[15.1rem]' : 'md:pl-[3.3rem]'} hidden text-black dark:text-white sm:pl-[1.2rem] w-auto sm:flex justify-evenly flex-wrap`}>
                        {navItems.map((item) => 
                        item.active ? (
                        <NavLink key={item.name}
                        style={navLinkStyles}
                        to={`${item.slug}`}
                        >
                            <button

                            // onClick={() => navigate(item.slug)}
                            className='py-2 w-[6rem] hover:bg-slate-400 dark:hover:bg-emerald-700  rounded-xl m-2'
                            >{item.name}</button>
                        </NavLink>
                        ) : null
                        )}
                        
                    </div>
                    <div className='hidden sm:flex justify-between h-auto'>
                        {loginStatus && (
                            <NavLink 
                            style={navLinkStyles}
                            className='px-4 py-2 my-2 w-[8rem] duration-200 hover:bg-blue-100 dark:hover:bg-emerald-700 rounded-full text-center cursor-pointer '
                            to={'/my-account'}
                            // onClick={() => navigate('/my-account')}
                            >
                                My Account
                            </NavLink>
                        )}
                        {loginStatus && (
                            <div> 
                                <LogoutBtn />
                            </div>
                        )}
                        <div className={`${!loginStatus ? "m-4 sm:mt-[1.1rem]" : 'pt-4 sm:pt-[1px] sm:m-4'}`}>
                            <ThemeButton />
                        </div>
                    </div>

                    <div className='flex sm:hidden'>
                        <button 
                        class="relative group"
                        onClick={toggle}
                        >
                            <div class="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                            <div class="transform transition-all duration-150 overflow-hidden -translate-y-5 group-focus:translate-y-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                            </div>

                            <div class="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden -translate-y-3">
                                <div class="bg-white mb-1.5 h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6"></div>
                                <div class="bg-white mb-1.5 h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-y-6 delay-75"></div>
                                <div class="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6 delay-100"></div>
                            </div>
                            </div>
                        </button>

                        


                    </div>

                </nav>
            </Container>
            
            <div className={`${show ? 'flex' : 'hidden'} sm:hidden mt-8 flex flex-col item-center flex-wrap`}>
                <div className={` text-black dark:text-white  flex justify-center flex-wrap`}>
                    {navItems.map((item) => 
                    item.active ? (
                    <NavLink key={item.name}
                    style={navLinkStyles}
                    to={`${item.slug}`}
                    >
                        <button

                        // onClick={() => navigate(item.slug)}
                        className='py-2 w-[6rem] hover:bg-slate-400 dark:hover:bg-emerald-700  rounded-xl m-1'
                        >{item.name}</button>
                    </NavLink>
                    ) : null
                    )}
                    
                </div>

                <div className='flex justify-evenly h-auto my-4'>
                    {loginStatus && (
                        <NavLink 
                        style={navLinkStyles}
                        className='py-2 my-2 w-[6.8rem] duration-200 hover:bg-blue-100 dark:hover:bg-emerald-700 rounded-full text-center cursor-pointer '
                        to={'/my-account'}
                        // onClick={() => navigate('/my-account')}
                        >
                            My Account
                        </NavLink>
                    )}
                    {loginStatus && (
                        <div> 
                            <LogoutBtn />
                        </div>
                    )}
                    <div className={`${!loginStatus ? "m-4" : 'pt-[1.1rem]'}`}>
                        <ThemeButton />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
