# Python Server

## Tecnologias e Bibliotecas 

- Python 3.9.5
- flask
- flask_restful
- flask_cors

## Execute os seguintes comandos dentro do diretório `ServerPython/`

### Criar ambiente virtual
```
python -m venv venv
```

### Executar ambiente virtual
```
venv\Scripts\activate
```

### Instalar dependências
```
pip install flask
```
```
pip install flask-restful
```
```
pip install flask-cors
```

### Congelar dependências
```
python -m pip freeze > requirements.txt
```

### Instalar dependências congeladas
```
python -m pip install -r requirements.txt
```

### Rodar servidor
```
python server.py
```



# Cliente PHP

## Tecnologias e Bibliotecas 

- PHP 8.0.5

## Exectue os seguintes comandos dentro do diretório `ClientPHP/`

### Levantar o server do cliente
```
php -S localhost:5001
```


# Cliente C#

## Tecnologias e Bibliotecas 

- DotNet Core 5

## Exectue os seguintes comandos dentro do diretório `ClientC#/`

### Instalar as dependências
```
dotnet restore
```

### Levantar o server do cliente
```
dotnet run
```


# Cliente JS

## Tecnologias e Bibliotecas 

- React 17.0.2
- NPM 6.14.12
- Node 14.16.1

## Exectue os seguintes comandos dentro do diretório `ClientJS/site/`

### Instalar as dependências
```
npm install
```

### Levantar o server do cliente
```
npm start
```


# Cliente GO

## Tecnologias e Bibliotecas 

- GO 1.16.4

## Exectue os seguintes comandos dentro do diretório `ClientGO` 

### Levantar o server do cliente
```
go run client.go
```