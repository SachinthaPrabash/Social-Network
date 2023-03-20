import React, { useState } from 'react'
import userLogo from '../../assets/menInProfile.jpg'
import { FaTimes, FaAlignJustify } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    //profile image toggle
    const [usertoggle, setUserToggle] = useState(false);
    //hamburger toggle
    const [toggle, setToggle] = useState(false);

    const authLinks = (

        <div className="flex items-center md:order-2">
            {/*Dropdown menu   */}
            <div className={`${usertoggle ? "block z-50 overflow-auto absolute" : "hidden"}  float-right  lg:w-48 md:w-44 mt-72 -ml-20 md:-ml-40 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Developers</Link>
                    </li>

                    <li>
                        <Link to="/" onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</Link>
                    </li>

                </ul>

            </div>
            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" onClick={() => {
                if (toggle === true) {
                    setToggle(!toggle)
                    setUserToggle(!usertoggle)
                }
                else {
                    setUserToggle(!usertoggle)
                }
            }} >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={userLogo} alt="user img" />
            </button>


        </div>




    );

    const guestLinks = (
        <>
            <button type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => {
                    if (usertoggle === true) {
                        setUserToggle(!usertoggle)
                        setToggle(!toggle)
                    }
                    else {
                        setToggle(!toggle)
                    }
                }} >
                <span className="sr-only">Open main menu</span>
                {toggle ? <FaTimes /> : <FaAlignJustify />}
            </button>
            <div className={`${toggle ? "block" : "hidden"}    items-center justify-between  w-full md:flex md:w-auto md:order-1`}>
                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" >Developer</Link>

                    </li>
                    <li>
                        <Link to="/register" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</Link>
                    </li>
                    <li>
                        <Link to="/login" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
                    </li>

                </ul>
            </div>

        </>
    );



    return (
        <>
            <nav className="bg-white  border-gray-200 px-2 fixed w-screen  sm:px-4 py-2.5  dark:bg-gray-900">
                <div className=" flex flex-wrap items-center justify-between mx-auto">
                    <Link to='/' className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-white">DevConnector </span>
                    </Link>


                    {/*Profile dropdown */}


                    {/*Hamburger dropdown */}

                    {!loading && (<>{isAuthenticated ? authLinks : guestLinks}</>)}

                    {/*Hamburger menu */}

                </div>
            </nav>


        </>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)