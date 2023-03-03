import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ActorsList from './actors';
import FilmsList from './films';
import { listActors } from './api';

// function Home() {
//   return (
//     <div>
//       <h1>Welcome to SakilaDB!</h1>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/actors">Actors List</Link>
//         </li>
//       </ul>
//     </div>
//   );
// }

function Home() {
  return (
    <div>
      <h1>Welcome to SakilaDB!</h1>
      <p><Link to="/actors">Actors List</Link></p>
      <p><Link to="/films">Movies List</Link></p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/actors" element={<ActorsList />} />
        <Route exact path="/films" element={<FilmsList />} />
      </Routes>
    </Router>
  );
}

export default App;