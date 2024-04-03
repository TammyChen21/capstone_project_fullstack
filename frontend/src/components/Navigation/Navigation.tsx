import "./Navigation.css";
import {PiPersonArmsSpreadBold, PiSealCheckBold} from "react-icons/pi";
import { TiThListOutline } from "react-icons/ti";
import {Link} from "react-router-dom";
import {RiHomeSmileLine} from "react-icons/ri";

export default function Navigation(): JSX.Element{
    return (

        <nav className="nav">
            <ul>
                <li>
                    <Link to={"/"}><RiHomeSmileLine /></Link>
                </li>
                <li>
                    <Link to={"/plancards"}><PiSealCheckBold/></Link>
                </li>
                <li>
                    <Link to={"/plan"}><TiThListOutline/></Link>
                </li>
                <li>
                    <Link to={"/profile"}><PiPersonArmsSpreadBold /></Link>
                </li>
            </ul>
        </nav>
    )
}

