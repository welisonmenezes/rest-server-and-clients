import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CalcForm() {
  const [num1, setNum1] = useState("");
  const [num1Class, setNum1Class] = useState("");
  const [num2, setNum2] = useState("");
  const [num2Class, setNum2Class] = useState("");
  const [operador, setOperador] = useState("");
  const [operadorClass, setOperadorClass] = useState("");
  const [wasCalculated, setWasCalculated] = useState(false);
  const [result, setResult] = useState("");

  function sendData(e) {
    e.preventDefault();
    let isValid = true;
    if (num1.toString().trim() === "") {
      setNum1Class("invalid");
      isValid = false;
    }
    if (num2.toString().trim() === "") {
      setNum2Class("invalid");
      isValid = false;
    }
    if (operador.toString().trim() === "") {
      setOperadorClass("invalid");
      isValid = false;
    }
    if (isValid) {
      setNum1Class("");
      setNum2Class("");
      setOperadorClass("");
      const dataToSend = { num1, num2, operador };
      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios.post(`http://127.0.0.1:5000/calc/`, dataToSend).then((res) => {
        setNum1("");
        setNum2("");
        setOperador("");
        setWasCalculated(true);
        setResult(res.data.resultado);
      });
    }
  }

  return (
    <div className="CalcForm">
      <header className="d-flex">
        <Link to="/" className="btn">
          Home
        </Link>
        <h1>Cliente JS</h1>
      </header>
      <main>
        <div className="container">
          <h2 className="page-title">Calculadora</h2>
          {wasCalculated &&
            <div className="result success">O resultado é: {result}</div>
          }
          <form
            onSubmit={(e) => {
              sendData(e);
            }}
          >
            <div className="form-row">
              <label htmlFor="num1">Numero 1:</label>
              <input
                type="number"
                name="num1"
                id="num1"
                className={num1Class}
                onInput={(e) => {
                  setNum1(e.target.value);
                }}
                value={num1}
              />
            </div>
            <div className="form-row">
              <label htmlFor="operator">Operação</label>
              <select
                name="operator"
                id="operator"
                className={operadorClass}
                onChange={(e) => {
                  setOperador(e.target.value);
                }}
                value={operador}
              >
                <option value="">Operação</option>
                <option value="Somar">Somar</option>
                <option value="Subtrair">Subtrair</option>
                <option value="Multiplicar">Multiplicar</option>
                <option value="Dividir">Dividir</option>
                <option value="Resto">Resto</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="num2">Numero 2:</label>
              <input
                type="number"
                name="num2"
                id="num2"
                className={num2Class}
                onInput={(e) => {
                  setNum2(e.target.value);
                }}
                value={num2}
              />
            </div>
            <div className="form-row">
              <button className="btn btn-primary">Calcular</button>
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

export default CalcForm;
