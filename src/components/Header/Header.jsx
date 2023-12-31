import React,{ useEffect, useState } from 'react'
import { LogoutBtn, Logo, Container, ThemeButton } from '../index.js'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch } from '../../store/searchSlice.js'


function Header() {

    const location = useLocation();
    // location.pathname.

    const dispatch = useDispatch();
    const [show,setShow] = useState(false);
    const loginStatus = useSelector(state => state.auth.loginStatus);
    const [searchValue,setSearchValue] = useState('');

    useEffect(() => {
        dispatch(setSearch(searchValue));

    }, [searchValue])

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
                            className='px-2 sm:mr-2 py-2 my-2 h-[2.3rem] w-[7rem] flex items-center justify-center duration-200 hover:bg-slate-400 dark:hover:bg-emerald-700 rounded-full text-center cursor-pointer '
                            to={'/my-account'}
                            // onClick={() => navigate('/my-account')}
                            >
                                My Account
                            </NavLink>
                        )}
                        {loginStatus && (
                            <div className=''> 
                                <LogoutBtn />
                            </div>
                        )}
                        <div className={`${!loginStatus ? "m-4 sm:mt-[1.1rem]" : ' sm:m-[0.9rem]'}`}>
                            <ThemeButton />
                        </div>
                    </div>

                    <div className='flex sm:hidden'>
                        <button 
                        className="relative group"
                        onClick={toggle}
                        >
                            <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                                <div className="transform transition-all duration-150 overflow-hidden -translate-y-5 group-focus:translate-y-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                    </svg>
                                </div>

                                <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden -translate-y-3">
                                    <div className="bg-white mb-1.5 h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6"></div>
                                    <div className="bg-white mb-1.5 h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-y-6 delay-75"></div>
                                    <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6 delay-100"></div>
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

                <div className='flex justify-evenly h-auto mb-2'>
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
                        <div > 
                            <LogoutBtn />
                        </div>
                    )}
                    <div className={`${!loginStatus ? "m-4" : 'pt-[1.1rem]'}`}>
                        <ThemeButton />
                    </div>
                </div>
            </div>
            
            <form 
            className={`flex justify-center my-4 ${!location.pathname.localeCompare('/') || !location.pathname.match('/all-posts') && 'hidden' }`}
            onSubmit={e => e.preventDefault()}
            >

                <label 
                className="bg-white dark:bg-slate-300 rounded-l-3xl flex items-center pl-3 px-2 border border-black border-r-0"
                id="search"
                
                >
                    &#128269;
                </label>
                <br/>

                <input 
                htmlFor="search"
                className="w-[99%] md:w-[40%] h-[3rem] font-medium dark:bg-slate-300 px-2 outline-none rounded-r-3xl cursor-pointer border border-black border-l-0 placeholder-gray-500 dark:text-black" 
                type="text" 
                placeholder="Search for anything" 
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                />
                <br/>

            </form>

        </header>
    )
}

export default Header
