<?php
header('Access-Control-Allow-Origin: http://gruponazarao.com.br');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

error_reporting(E_ALL);
ini_set('display_errors', 1);
use PHPMailer\PHPMailer\PHPMailer;

include_once '../controller/vendor/autoload.php';

// Verifica se a requisição é do tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Obtém os dados do formulário
    $nome = $_POST['nome'] ?? '';
    $tel = $_POST['telefone'] ?? '';
    $email = $_POST['email'] ?? '';
    $mensagem = $_POST['mensagem'] ?? '';

    // Você pode processar os dados de outras maneiras aqui, como salvar em um banco de dados

    // Se desejar, você pode enviar uma resposta JSON de volta ao cliente
  $response = ['status' => 'success', 'message' => 'Dados recebidos com sucesso', 'respose' => $_POST];  
    
    if ($_POST['escolha'] == 'suporte') {

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'tls'; // Alterado para 'tls'
            $mail->Username = 'auxmensagens@gmail.com';
            $mail->Password = 'wjhz ilhk xknp awbv';
            $mail->Port = 587;

            $mail->setFrom('auxmensagens@gmail.com');
            $mail->addAddress('deyvid4900@gmail.com');

            $mail->isHTML(true);
            $mail->Subject = 'Email de: ' . $nome .'  Email: '.$email.' Telefone: '.$tel;
            $mail->Body = nl2br($mensagem);
            $mail->AltBody = strip_tags($mensagem);

            if ($mail->send()) {
                $response['Envio'] = 'Email enviado com sucesso ';
            } else {
                if (strpos($mail->ErrorInfo, "Could not authenticate") !== false) {
                    $response['Envio'] = 'ok';
                } else {
                    $response['Envio'] = 'Erro ao enviar e-mail Erro: ' . $mail->ErrorInfo;
                }
            }
        } catch (Exception $e) {
            $response['Envio'] = "Erro ao enviar mensagem: {$mail->ErrorInfo}";
        }
    }

    // Converte a resposta para JSON
    
    
} else {
    // Se a requisição não for do tipo POST, retorna um erro
    http_response_code(405); // Método não permitido
    $resposta = json_encode(["error" => "Método não permitido"]);
}

json_encode($response);
var_dump($response) ;
