<?php 
require_once("restclient.php");

$api = new RestClient([
    'base_url' => 'http://127.0.0.1:5000/',  
]);

$data = null;

if (isset($_POST) && isset($_POST["action"]) && $_POST["action"] == 'validar') {
    $data_to_send = array(
        'cpf' => $_POST["cpf"]
    );

    $result = $api->post('cpf/', $data_to_send);
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
            <h2 class="page-title">Validar CPF</h2>
            <?php 
            if ($data && isset($data->resultado))  {
                if ($data->resultado == true) { 
            ?>
                    <div class="result success">CPF Válido</div>
            <?php 
                } 
                else {
            ?>
                    <div class="result danger">CPF Inválido</div>
            <?php 
                }
            }
            ?>
            <form action="" method="POST" class="validate-form">
                <div class="form-row">
                    <label for="cpf">CPF:</label>
                    <input type="text" name="cpf" id="cpf" class="required">
                </div>
                <div class="form-row">
                <input type="hidden" name="action" value="validar">
                    <button class="btn btn-primary">Validar</button>
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