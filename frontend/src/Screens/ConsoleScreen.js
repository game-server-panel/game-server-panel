import { Link } from "react-router-dom";
import ControlCard from "../Components/ControlCard";

function ConsoleScreen(props) {
    return (
        <div>
            <Link to={"/container/" + props.match.params.id}><button className="btn btn-primary" style={{marginBottom: 20, marginLeft: 20, marginTop: 20}}>Go back</button></Link>
            <ControlCard containerId={props.match.params.id}></ControlCard>
        </div>
    )
}

export default ConsoleScreen;