import styles from './Navbar.module.sass'
import { NavLink } from 'react-router-dom'


export const Navbar = () => {


    return (
        <div>
            <img src="" alt="" />
            <ul>
                <li><NavLink to='/Dashboard'/></li>
                <li><NavLink to='/Analytics' /></li>
                <li><NavLink to='/Products' /></li>
                <li><NavLink to='/Payment' /></li>
                <li><NavLink to='/Orders' /></li>
                <li><NavLink to='/Enquiry' /></li>
                <li><NavLink to='/Marketing' /></li>
                <li><NavLink to='/Setting' /></li>
            </ul>
            <div>
                <ul>
                    <li><NavLink to='/User' /></li>
                    <li>Logout</li>
                </ul>
            </div>
        </div>
    )
}