import React from 'react'
import { LogoutBtn, Logo, Container, ThemeButton } from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {

    const loginStatus = useSelector(state => state.auth.loginStatus);
    const navigate = useNavigate();

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

    return (
        <header className='w-full bg-slate-300 shadow-md'>
            <Container>
                <nav className='flex justify-center md:justify-between flex-wrap'>
                    <div className=' mx-2 my-1'>
                        <Link to='/' >
                            <Logo width='70px'   />
                        </Link>
                    </div>
                    <ul className={`${loginStatus? 'sm:pl-[13.3rem]' : 'sm:pl-[1.2rem]'} sm:pl-[1.2rem] w-auto flex justify-evenly flex-wrap`}>
                        {navItems.map((item) => 
                        item.active ? (
                        <li key={item.name}>
                            <button
                            onClick={() => navigate(item.slug)}
                            className='py-2 w-auto hover:bg-slate-400 rounded-xl p-2 m-2'
                            >{item.name}</button>
                        </li>
                        ) : null
                        )}
                        
                    </ul>
                    <div className='flex justify-between h-auto'>
                        {loginStatus && (
                            <div 
                            className='px-4 py-2 my-2 duration-200 hover:bg-blue-100 rounded-full          cursor-pointer'
                            onClick={() => navigate('/my-account')}
                            >
                                My Account
                            </div>
                        )}
                        {loginStatus && (
                            <div> 
                                <LogoutBtn />
                            </div>
                        )}
                        <ThemeButton />
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header
