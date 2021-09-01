import { Link } from 'react-router-dom';
import GetContainers from '../Components/GetContainers';
import '../index.css';

function Homescreen() {
  return (
    <div className="App">
      <h1 className="main-title">Game Server Panel</h1>
      <div>
        <Link to="/createserver">
          <button className="btn btn-primary mx-auto d-grid" style={{marginTop: 20}}>Create new game server</button>
        </Link>

        <GetContainers></GetContainers>
      </div>
      
    </div>
  );
}

export default Homescreen;

