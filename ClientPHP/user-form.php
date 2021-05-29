<?php 
require_once("restclient.php");
require_once("utils.php");

$api = new RestClient([
    'base_url' => 'http://127.0.0.1:5000/',  
]);

$title = "Cadastrar Usuário";
$name = "";
$age = "";
$role = "";
$action = "cadastrar";

if (isset($_POST) && isset($_POST["action"])) {
    $data_to_send = array(
        'nome' => $_POST["name"],
        'idade' => $_POST["age"],
        'ocupacao' => $_POST["role"]
    );
    if ($_POST["action"] == 'editar') {
        $api->put('users/'.$_GET['name'], $data_to_send);
    }
    if ($_POST["action"] == 'cadastrar') {
        $api->post('users/'.$_POST['name'], $data_to_send);
    }

    header('Location: '.baseUrl().'/users.php');
}

if (isset($_GET) && isset($_GET["name"])) {
    $result = $api->get("users/".$_GET['name']);
    $data = $result->decode_response();
    if (!empty($data) && isset($data->nome)) {
        $name = $data->nome;
        $age = $data->idade;
        $role = $data->ocupacao;
        $action = "editar";
        $title = "Editar Usuário";
    }
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
        <a href="users.php" class="btn last">Usuários</a>
        <h1>
            <img src="php.png" alt="php">
            Cliente PHP
        </h1>
    </header>
    <main>
        <div class="container">
            <h2 class="page-title"><?php echo $title; ?></h2>
            <form action="" method="POST" class="validate-form">
                <div class="form-row">
                    <label for="name">Nome:</label>
                    <?php if ($action == 'editar') { ?>
                        <input type="text" name="name" id="name" class="required" value="<?php echo $name; ?>" readonly>
                    <?php } else { ?>
                        <input type="text" name="name" id="name" class="required" value="<?php echo $name; ?>">
                    <?php } ?>
                </div>
                <div class="form-row">
                    <label for="age">Idade:</label>
                    <input type="number" name="age" id="age" class="required" value="<?php echo $age; ?>">
                </div>
                <div class="form-row">
                    <label for="role">Ocupação:</label>
                    <input type="text" name="role" id="role" class="required" value="<?php echo $role; ?>">
                </div>
                <div class="form-row">
                    <input type="hidden" name="action" value="<?php echo $action; ?>">
                    <button class="btn btn-primary">Salvar</button>
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