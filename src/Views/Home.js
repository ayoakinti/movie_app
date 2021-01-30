import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app">
      This is the home page
      <ul>
        <li>
          <Link to="/movies">Movies Tab</Link>
        </li>
        <li>
          <Link to="/ecommerce">Ecommerce Tab</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
