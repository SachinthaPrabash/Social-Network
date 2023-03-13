import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <section className="bg-landing_image bg-no-repeat  bg-center bg-fixed w-screen h-screen ">
            <div className="container mx-auto h-full flex flex-col justify-center items-center px-4">
                <h1 className="text-5xl text-white font-bold my-2">Developer Connector</h1>
                <p className="text-2xl text-white my-2">Create a profile & Connect with other developrs</p>
                <div className="flex flex-col md:flex-row my-2">
                    <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 md:my-0 md:mr-2">Sign Up</Link>
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 md:my-0 md:ml-2">Login</Link>
                </div>
            </div>
        </section>


    )
}

export default Landing