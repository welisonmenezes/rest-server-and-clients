<?php 
require_once("restclient.php");
$api = new RestClient([
    'base_url' => 'http://127.0.0.1:5000/',  
]);

if (isset($_GET) && isset($_GET["action"]) && $_GET['action'] == 'deletar') {
    $api->delete('users/'.$_GET['name']);
}

$result = $api->get('users/');
$data = $result->decode_response();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cliente PHP</title>
    <link rel="stylesheet" href="http://127.0.0.1:5000/static/Styles.css">
</head>
<body>
    <header class="d-flex">
        <a href="index.php" class="btn">Home</a>
        <h1>Cliente PHP</h1>
    </header>
    <main>
        <div class="container">
            <div class="header">
                <a href="user-form.php" class="btn btn-primary">Cadastrar</a>
                <h2 class="page-title">Usuários</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Ocupação</th>
                        <th class="th-action">Deletar</th>
                        <th class="th-action">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if(!empty($data)) { ?>
                        <?php for ($i = 0; $i < count($data); $i++)  { ?>
                            <tr>
                                <td><?php echo $data[$i]->nome; ?></td>
                                <td><?php echo $data[$i]->idade; ?></td>
                                <td><?php echo $data[$i]->ocupacao; ?></td>
                                <td class="th-action">
                                    <a href="users.php?action=deletar&name=<?php echo $data[$i]->nome; ?>" class="btn danger">Deletar</a>
                                </td>
                                <td class="th-action">
                                    <a href="user-form.php?name=<?php echo $data[$i]->nome; ?>" class="btn info">Editar</a>
                                </td>
                            </tr>
                        <?php } ?>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    </main>
    <footer class="d-flex">
        <p>&copy; ABC Bolinhas - 2021</p>
    </footer>

    <script src="http://127.0.0.1:5000/static/App.js"></script>
</body>
</html>