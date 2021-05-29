# Python Server

## Tecnologias e Bibliotecas 

- Python 3.9.5
- flask
- flask_restful

## Execute os seguintes comandos dentro do diretório Server/

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

## Exectue os seguintes comandos dentro do diretório ClientPHP/

### Levantar o server do cliente
```
php -S localhost:5001
```


# Cliente C#

## Tecnologias e Bibliotecas 

- DotNet Core 5

## Exectue os seguintes comandos dentro do diretório ClientC#/

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

- ReactJs
- NPM
- NodeJs

## Exectue os seguintes comandos dentro do diretório ClientJS/site/

### Instalar as dependências
```
npm install
```

### Levantar o server do cliente
```
npm start
```