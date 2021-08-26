import "./css/header.css";
import { Link } from 'react-router-dom';

export default function LinkSet(props)
{
    return (
        <Link to={props.redirect} 
            className={'linkset headerSpacing ' + props.act} 
            onClick={props.onClick}
        >
            {props.value}
        </Link>
    );
}