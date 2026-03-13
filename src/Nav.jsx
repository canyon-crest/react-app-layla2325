function Nav({ setPage }) {
  return (
    <nav className="navbar">
      <ul>
          <li onClick={() => setPage("home")}>Home</li>
          <li onClick={() => setPage("about")}>About</li>
          <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Nav;
