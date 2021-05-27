from flask import Flask
from flask_restful import Api, Resource, reqparse
import re
app = Flask(__name__)
api = Api(app)

usuarios = [ 
    {
        "nome": "Abc",
        "idade": 42,
        "ocupacao": "oreia"
    },
    {
        "nome": "Bolinhas",
        "idade": 32,
        "ocupacao": "seca"
    },
    {
        "nome": "Uniplac",
        "idade": 22,
        "ocupacao": "estagiário" 
    } 
]


class User(Resource):
    def get(self, nome=None):
        if nome == None:
            return usuarios
        else:
            for user in usuarios:
                if(nome == user["nome"]):
                    return user, 200

        return "Usuário não encontrado", 404


    def post(self, nome):
        parser = reqparse.RequestParser()
        parser.add_argument("idade")
        parser.add_argument("ocupacao")
        args = parser.parse_args()

        for user in usuarios:
            if(nome == user["nome"]):
                return "Usuário com nome {} já existe".format(nome), 400

        user = {
            "nome": nome,
            "idade": args["idade"],
            "ocupacao": args["ocupacao"]
        }
        usuarios.append(user)

        return user, 201


    def put(self, nome):
        parser = reqparse.RequestParser()
        parser.add_argument("idade")
        parser.add_argument("ocupacao")
        args = parser.parse_args()

        for user in usuarios:
            if(nome == user["nome"]):
                user["idade"] = args["idade"]
                user["ocupacao"] = args["ocupacao"]
                return user, 200

        user = {
            "nome": nome,
            "idade": args["idade"],
            "ocupacao": args["ocupacao"]
        }
        usuarios.append(user)

        return user, 201


    def delete(self, nome):
        global usuarios
        usuarios = [user for user in usuarios if user["nome"] != nome]
        return "{} deletado.".format(nome), 200


class Calc(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("num1")
        parser.add_argument("num2")
        parser.add_argument("operador")
        args = parser.parse_args()
        result = None

        if (args['operador'] == 'Somar'):
            result = float(args['num1']) + float(args['num2'])

        if (args['operador'] == 'Subtrair'):
            result = float(args['num1']) - float(args['num2'])

        if (args['operador'] == 'Multiplicar'):
            result = float(args['num1']) * float(args['num2'])

        if (args['operador'] == 'Dividir'):
            if float(args['num2']) == 0:
                result = 'Error'
            else:
                result = float(args['num1']) / float(args['num2'])

        if (args['operador'] == 'Resto'):
            result = float(args['num1']) % float(args['num2'])

        data = {
            "resultado": result,
        }

        return data, 200


class CPF(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("cpf")
        args = parser.parse_args()
        cpf = args['cpf']

        cpf = ''.join(re.findall(r'\d', str(cpf)))

        if not cpf or len(cpf) < 11:
            return {
                "resultado": False
            }, 200

        antigo = [int(d) for d in cpf]
        novo = antigo[:9]

        while len(novo) < 11:
            resto = sum([v * (len(novo) + 1 - i) for i, v in enumerate(novo)]) % 11
            digito_verificador = 0 if resto <= 1 else 11 - resto
            novo.append(digito_verificador)

        if novo == antigo:
            return {
                "resultado": True
            }, 200

        return {
            "resultado": False
        }, 200


api.add_resource(User, "/users/", "/users/<string:nome>")
api.add_resource(Calc, "/calc/")
api.add_resource(CPF, "/cpf/")

app.run(debug=True)