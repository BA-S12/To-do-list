import logo from '../assets/checklist.png'
import '../style/header.css'
import '../style/globel.css'
import { Link } from 'react-router-dom'

function Header(){

    return(

        <header>
            <div className="container">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="languages">
            <Link className='AR' to='/headerAr'>AR</Link>
                {/* <a>AR</a>  */}
            </div>
            </div>
        </header>
    );
}

export default Header;