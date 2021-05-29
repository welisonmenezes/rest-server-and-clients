package main

import (
	"io/ioutil"
	"fmt"
	"net/http"
	"net/url"
	"html/template"
	"encoding/json"
	"bytes"
)

type UserViewPage struct {
	Nome string
	Idade string
	Ocupacao string
}

type ResultViewPage struct {
	Resultado float32
}

type ResultCpfViewPage struct {
	Resultado bool
}

type UserFormViewPage struct {
	Title string
	Action string
	Nome string
	Idade string
	Ocupacao string
}

type CalcFormViewPage struct {
	WasCalculated bool
	Resultado float32
}

type CpfFormViewPage struct {
	WasValidated bool
	Resultado bool
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("index.html")
	fmt.Println(t.Execute(w, nil))
}

func calcFormHandler(w http.ResponseWriter, r *http.Request) {

	r.ParseForm()
	num1 := r.Form.Get("num1")
	num2 := r.Form.Get("num2")
	operador := r.Form.Get("operator")
	action := r.Form.Get("action")

	pageData := CalcFormViewPage {
		WasCalculated: false,
		Resultado: 0,
	}

	// Calcular
	if (action == "calcular") {
		data := url.Values{}
		data.Set("num1", num1)
		data.Set("num2", num2)
		data.Set("operador", operador)
		b := bytes.NewBufferString(data.Encode())
		req, err := http.NewRequest("POST", "http://127.0.0.1:5000/calc/", b)
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		req.Header.Set("Access-Control-Allow-Origin", "*")
		client := &http.Client{}
		resp, err := client.Do(req)
		if err == nil {
			result := ResultViewPage {}
			defer resp.Body.Close()
			body, err := ioutil.ReadAll(resp.Body)
			if err == nil {
				json.Unmarshal([]byte(string(body)), &result)
				pageData.WasCalculated = true
				pageData.Resultado = result.Resultado
			}
		}
	}

	t, _ := template.ParseFiles("calc-form.html")
	fmt.Println(t.Execute(w, pageData))
}

func cpfFormHandler(w http.ResponseWriter, r *http.Request) {

	r.ParseForm()
	cpf := r.Form.Get("cpf")
	action := r.Form.Get("action")

	pageData := CpfFormViewPage {
		WasValidated: false,
		Resultado: false,
	}

	// Validar
	if (action == "validar") {
		data := url.Values{}
		data.Set("cpf", cpf)
		b := bytes.NewBufferString(data.Encode())
		req, err := http.NewRequest("POST", "http://127.0.0.1:5000/cpf/", b)
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		req.Header.Set("Access-Control-Allow-Origin", "*")
		client := &http.Client{}
		resp, err := client.Do(req)
		if err == nil {
			result := ResultCpfViewPage {}
			defer resp.Body.Close()
			body, err := ioutil.ReadAll(resp.Body)
			if err == nil {
				json.Unmarshal([]byte(string(body)), &result)
				pageData.WasValidated = true
				pageData.Resultado = result.Resultado
			}
		}
	}

	t, _ := template.ParseFiles("cpf-form.html")
	fmt.Println(t.Execute(w, pageData))
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
	
	// Deletar
	action := r.URL.Query().Get("action")
	nameToDelete := r.URL.Query().Get("name")
	if action == "deletar" {
		req, err := http.NewRequest(http.MethodDelete, "http://127.0.0.1:5000/users/"+nameToDelete, nil)
		client := &http.Client{}
		resp, err := client.Do(req)
		if err == nil {
			fmt.Println(resp)
			http.Redirect(w, r, "/users", http.StatusSeeOther)
		}
	}

	// Listar
	users := []UserViewPage {}
	resp, err := http.Get("http://127.0.0.1:5000/users")
	if err == nil {
		defer resp.Body.Close()
		body, err := ioutil.ReadAll(resp.Body)
		if err == nil {
			json.Unmarshal([]byte(string(body)), &users)
		}
	}
	t, _ := template.ParseFiles("users.html")
	fmt.Println(t.Execute(w, users))
}

func userFormHandler(w http.ResponseWriter, r *http.Request) {

	r.ParseForm()
	nome := r.Form.Get("name")
	idade := r.Form.Get("age")
	ocupacao := r.Form.Get("role")
	action := r.Form.Get("action")

	// Cadastrar/Editar
	if (action == "cadastrar" || action == "editar") {
		method := "POST"
		if (action == "editar") {
			method = "PUT"
		}
		data := url.Values{}
		data.Set("nome", nome)
		data.Set("idade", idade)
		data.Set("ocupacao", ocupacao)
		b := bytes.NewBufferString(data.Encode())
		req, err := http.NewRequest(method, "http://127.0.0.1:5000/users/"+nome, b)
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		req.Header.Set("Access-Control-Allow-Origin", "*")
		client := &http.Client{}
		resp, err := client.Do(req)
		if err == nil {
			fmt.Println(resp)
			http.Redirect(w, r, "/users", http.StatusSeeOther)
		}
	}

	// Mostrar detalhes do usuario (Edição apenas)
	viewAction := r.URL.Query().Get("view-action")
	nameToEdit := r.URL.Query().Get("name")
	pageData := UserFormViewPage {
		Title: "Cadastrar Usuário",
		Action: "cadastrar",
		Nome: "",
		Idade: "",
		Ocupacao: "",
	}
	if (viewAction == "editar") {
		resp, err := http.Get("http://127.0.0.1:5000/users/"+nameToEdit)
		if err == nil {
			user := UserViewPage {}
			defer resp.Body.Close()
			body, err := ioutil.ReadAll(resp.Body)
			if err == nil {
				json.Unmarshal([]byte(string(body)), &user)
				pageData.Nome = user.Nome
				pageData.Idade = user.Idade
				pageData.Ocupacao = user.Ocupacao
				pageData.Title = "Editar Usuário"
				pageData.Action = "editar"
			}
		}
	}

	t, _ := template.ParseFiles("user-form.html")
	fmt.Println(t.Execute(w, pageData))
}

func main() {
	http.HandleFunc("/", indexHandler)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/calc-form", calcFormHandler)
	http.HandleFunc("/cpf-form", cpfFormHandler)
	http.HandleFunc("/users", usersHandler)
	http.HandleFunc("/user-form", userFormHandler)
	http.ListenAndServe(":5004", nil)
}