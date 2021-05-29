import { Link } from "react-router-dom";
import logo from '../logo192.png';

function Home() {
  return (
    <div className="Home">
      <header className="d-flex">
        <h1>
          <img src={logo} alt="react" />
          Cliente JS
        </h1>
      </header>
      <main>
        <h2 className="page-title">Escolha uma ação</h2>
        <ul className="d-flex DashboardMenu">
          <li>
            <Link to="users" className="d-flex">
              Gerenciar Usuários
            </Link>
          </li>
          <li>
            <Link to="cpf-form" className="d-flex">
              Validar CPF
            </Link>
          </li>
          <li>
            <Link to="calc-form" className="d-flex">
              Calculadora Simples
            </Link>
          </li>
        </ul>
      </main>
      <footer className="d-flex">
        <p>&copy; ABC Bolinhas - 2021</p>
      </footer>
    </div>
  );
}

export default Home;
