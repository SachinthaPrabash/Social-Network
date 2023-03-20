import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'

const Register = ({ setAlert, register, isAuthenticated }) => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData;

    const onChange = async e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'red-600')

        } else {
            register({ name, email, password });
        }
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }

    return (
        <div className="pt-20 md:pt-28 md:px-20 px-12 ">
            <div className="bg-white shadow-sm rounded xl:px-96 pt-6 pb-8 mb-4 flex flex-col my-2">
                <div className="text-center pb-8">
                    <h1 className="text-2xl font-bold">Sign Up</h1>
                </div>

                <form onSubmit={e => onSubmit(e)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Username"
                            value={name}
                            name="name"
                            onChange={e => onChange(e)}
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            placeholder="Email"
                            value={email}
                            name="email"
                            onChange={e => onChange(e)}
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="Password"
                            value={password}
                            name="password"
                            onChange={e => onChange(e)}

                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
                            Confirm Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="Confirm Password"
                            value={password2}
                            name="password2"
                            onChange={e => onChange(e)}

                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                            Register
                        </button>

                    </div>
                    <div className="text-center pt-12 pb-12">
                        <p> Already have a account?</p>
                        <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
                            Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register) 