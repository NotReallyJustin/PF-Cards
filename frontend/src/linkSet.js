export default function LinkSet(props)
{
    return (
        <div className="linkset headerSpacing" onClick={props.onClick}>
            {props.value}
        </div>
    );
}