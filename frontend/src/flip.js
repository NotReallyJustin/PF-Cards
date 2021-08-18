import './css/design.css';

//Something that flips the page
export default function Flip(props)
{
    return (
    <div className='preDiv'>
        <div 
            className='flip'
            onClick={props.onClick} >
            
        </div>
    </div>);
}