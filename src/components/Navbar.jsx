import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/trips" className="mr-4">Fahrten</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-500 p-2 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;
