import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from '../logo192.png';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/users/`).then((res) => {
      const persons = res.data;
      if (persons && persons[0] && persons[0].nome) {
        setUsers(persons);
      }
    });
  }, []);

  function deleteUser(nome) {
    axios.delete(`http://127.0.0.1:5000/users/${nome}`).then((res) => {
      const newUsers = users.filter(user => user.nome !== nome);
      setUsers(newUsers);
    });
  };

  return (
    <div className="Users">
      <header className="d-flex">
        <Link to="/" className="btn">
          Home
        </Link>
        <h1>
          <img src={logo} alt="react" />
          Cliente JS
        </h1>
      </header>
      <main>
        <div className="container">
          <div className="header">
            <Link to="user-form" className="btn btn-primary">
              Cadastrar
            </Link>
            <h2 className="page-title">Usuários</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Ocupação</th>
                <th className="th-action">Deletar</th>
                <th className="th-action">Editar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.nome}>
                    <td>{user.nome}</td>
                    <td>{user.idade}</td>
                    <td>{user.ocupacao}</td>
                    <td className="th-action">
                      <span className="btn danger" onClick={() => {deleteUser(user.nome)}}>
                        Deletar
                      </span>
                    </td>
                    <td className="th-action">
                      <Link to={`user-form/${user.nome}`} className="btn info">
                        Editar
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="d-flex">
        <p>&copy; ABC Bolinhas - 2021</p>
      </footer>
    </div>
  );
}

export default Users;
