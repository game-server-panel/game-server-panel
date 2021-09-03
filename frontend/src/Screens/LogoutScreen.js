import axios from "axios";

function LogoutScreen({ setToken }) {
    axios.get("/api/users/logout")
        .then(response => {
            setToken(null);
        });

    return (
        <div style={{textAlign: "center"}}>
            <h1>Goodbye :D</h1>
        </div>
    )
}

export default LogoutScreen;