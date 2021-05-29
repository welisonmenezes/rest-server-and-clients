<?php 
require_once("restclient.php");

$api = new RestClient([
    'base_url' => 'http://127.0.0.1:5000/',  
]);

$data = null;

if (isset($_POST) && isset($_POST["action"]) && $_POST["action"] == 'calcular') {
    $data_to_send = array(
        'num1' => $_POST["num1"],
        'num2' => $_POST["num2"],
        'operador' => $_POST["operator"]
    );

    $result = $api->post('calc/', $data_to_send);
    $data = $result->decode_response();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="php.png" />
    <title>Cliente PHP</title>
    <link rel="stylesheet" href="http://127.0.0.1:5000/static/Styles.css">
</head>
<body>
    <header class="d-flex">
        <a href="index.php" class="btn">Home</a>
        <h1>
            <img src="php.png" alt="php">
            Cliente PHP
        </h1>
    </header>
    <main>
        <div class="container">
            <h2 class="page-title">Calculadora</h2>
            <?php if ($data && isset($data->resultado))  { ?>
                <div class="result success">O resultado é: <?php echo $data->resultado; ?></div>
            <?php } ?>
            <form action="" method="POST" class="validate-form">
                <div class="form-row">
                    <label for="num1">Numero 1:</label>
                    <input type="number" name="num1" id="num1"  class="required">
                </div>
                <div class="form-row">
                    <label for="operator">Operação</label>
                    <select name="operator" id="operator" class="required">
                        <option value="">Operação</option>
                        <option value="Somar">Somar</option>
                        <option value="Subtrair">Subtrair</option>
                        <option value="Multiplicar">Multiplicar</option>
                        <option value="Dividir">Dividir</option>
                        <option value="Resto">Resto</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="num2">Numero 2:</label>
                    <input type="number" name="num2" id="num2" class="required">
                </div>
                <div class="form-row">
                    <input type="hidden" name="action" value="calcular">
                    <button class="btn btn-primary">Calcular</button>
                </div>
            </form>
        </div>
    </main>
    <footer class="d-flex">
        <p>&copy; ABC Bolinhas - 2021</p>
    </footer>
    <script src="http://127.0.0.1:5000/static/App.js"></script>
</body>
</html>