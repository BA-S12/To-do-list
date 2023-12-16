import logo from '../assets/checklist.png'
import '../style/header.css'
import '../style/globel.css'
import { Link } from 'react-router-dom'
import ToDoListAR from './toDoListAr'
function HeaderAR(){

    return(
        <>
        <header>
            <div className="container">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="languages">
            <Link className='EN' to='/'>EN</Link>

            </div>
            </div>
        </header>
        <ToDoListAR/>
        </>
    );
}

export default HeaderAR;