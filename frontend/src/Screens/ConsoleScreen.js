import ControlCard from "../Components/ControlCard";

function ConsoleScreen(props) {
    return (
        <div>
            <ControlCard containerId={props.match.params.id}></ControlCard>
        </div>
    )
}

export default ConsoleScreen;