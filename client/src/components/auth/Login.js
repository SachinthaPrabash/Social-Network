import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    const onChange = async e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <>
            < div className="pt-20 md:pt-28 md:px-20 px-12" >
                <div className="bg-white shadow-sm rounded xl:px-96 pt-6 pb-8 mb-4 flex flex-col my-2">
                    <div className="text-center pb-8">
                        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                        <p className='flex justify-center items-center'>
                            <FaUser className='mr-2' /> Sign Into Your Account
                        </p>
                    </div>
                    <form onSubmit={e => onSubmit(e)} className="px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow  border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={e => onChange(e)}
                                required />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={e => onChange(e)}
                                required />
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign In
                            </button>

                        </div>
                        <div className="text-center pt-12 pb-12">
                            <p> Dont't have a account?</p>
                            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
                                Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login    