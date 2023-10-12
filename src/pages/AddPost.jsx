import React from 'react'
import { Container,PostForm } from '../components/index.js'

function AddPost() {
    return (
        <div className='py-8 w-full dark:bg-slate-600 dark:text-gray-300'>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost
