import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CPFForm() {
  const [cpf, setCpf] = useState("");
  const [cpfClass, setCpfClass] = useState("");
  const [wasValidated, setWasValidated] = useState(false);
  const [validationClass, setValidationClass] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  function sendData(e) {
    e.preventDefault();
    let isValid = true;
    if (cpf.toString().trim() === "") {
      setCpfClass("invalid");
      isValid = false;
    }
    if (isValid) {
      setCpfClass("");
      const dataToSend = { cpf };
      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios.post(`http://127.0.0.1:5000/cpf/`, dataToSend).then((res) => {
        setCpf("");
        if (res.data.resultado) {
          setValidationClass("success");
          setValidationMessage("CPF Válido");
        } else {
          setValidationClass("danger");
          setValidationMessage("CPF Inválido");
        }
        setWasValidated(true);
      });
    }
  }

  return (
    <div className="CPFForm">
      <header className="d-flex">
        <Link to="/" className="btn">
          Home
        </Link>
        <h1>Cliente JS</h1>
      </header>
      <main>
        <div className="container">
          <h2 className="page-title">Validar CPF</h2>
          {wasValidated && (
            <div className={`result ${validationClass}`}>
              {validationMessage}
            </div>
          )}
          <form
            onSubmit={(e) => {
              sendData(e);
            }}
          >
            <div className="form-row">
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                className={cpfClass}
                onInput={(e) => {
                  setCpf(e.target.value);
                }}
                value={cpf}
              />
            </div>
            <div className="form-row">
              <button className="btn btn-primary">Validar</button>
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

export default CPFForm;
