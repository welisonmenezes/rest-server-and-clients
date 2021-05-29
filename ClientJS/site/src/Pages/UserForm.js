import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

function UserForm() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [ocupacao, setOcupacao] = useState("");
  const [nomeClass, setNomeClass] = useState("");
  const [idadeClass, setIdadeClass] = useState("");
  const [ocupacaoClass, setOcupacaoClass] = useState("");
  const [title, setTitle] = useState("Cadastrar Usuário");
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      setTitle("Editar Usuário");
      axios.get(`http://127.0.0.1:5000/users/${id}`).then((res) => {
        const person = res.data;
        if (person && person.nome) {
          if (person.nome === null) {
            setNome("");
          } else {
            setNome(person.nome);
          }
          if (person.idade === null) {
            setIdade("");
          } else {
            setIdade(person.idade);
          }
          if (person.ocupacao === null) {
            setOcupacao("");
          } else {
            setOcupacao(person.ocupacao);
          }
        }
      });
    }
  }, [id]);

  function sendData(e) {
    e.preventDefault();
    let isValid = true;
    if (nome.toString().trim() === "") {
      setNomeClass("invalid");
      isValid = false;
    }
    if (idade.toString().trim() === "") {
      setIdadeClass("invalid");
      isValid = false;
    }
    if (ocupacao.toString().trim() === "") {
      setOcupacaoClass("invalid");
      isValid = false;
    }
    if (isValid) {
      setNomeClass("");
      setIdadeClass("");
      setOcupacaoClass("");
      const dataToSend = {
        nome,
        idade,
        ocupacao,
      };
      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      if (id) {
        axios
          .put(`http://127.0.0.1:5000/users/${nome}`, dataToSend)
          .then((res) => {
            history.push("/users");
          });
      } else {
        axios
          .post(`http://127.0.0.1:5000/users/${nome}`, dataToSend)
          .then((res) => {
            history.push("/users");
          });
      }
    }
  }

  return (
    <div className="UserForm">
      <header className="d-flex">
        <Link to="/" className="btn">
          Home
        </Link>
        <Link to="/users" className="btn last">
          Usuários
        </Link>
        <h1>Cliente JS</h1>
      </header>
      <main>
        <div className="container">
          <h2 className="page-title">{title}</h2>
          <form
            onSubmit={(e) => {
              sendData(e);
            }}
          >
            <div className="form-row">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                className={nomeClass}
                onInput={(e) => {
                  setNome(e.target.value);
                }}
                value={nome}
                disabled={id === undefined ? false : true}
              />
            </div>
            <div className="form-row">
              <label htmlFor="age">Idade:</label>
              <input
                type="number"
                id="age"
                className={idadeClass}
                onInput={(e) => {
                  setIdade(e.target.value);
                }}
                value={idade}
              />
            </div>
            <div className="form-row">
              <label htmlFor="role">Ocupação:</label>
              <input
                type="text"
                id="role"
                className={ocupacaoClass}
                onInput={(e) => {
                  setOcupacao(e.target.value);
                }}
                value={ocupacao}
              />
            </div>
            <div className="form-row">
              <button className="btn btn-primary">Salvar</button>
            </div>
          </form>
        </div>
      </main>
      <footer className="d-flex">
        <p>&copy; ABC Bolinhas - 2021</p>
      </footer>
    </div>
  );
}

export default UserForm;
