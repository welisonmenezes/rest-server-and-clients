# Python Server

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

## Exectue os seguintes comandos dentro do diretório ClientPHP/

### Levantar o servidor
```
php -S localhost:5001
```