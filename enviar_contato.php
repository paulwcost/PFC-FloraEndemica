<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtém os dados do formulário
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $mensagem = htmlspecialchars($_POST['mensagem']);

    // Configurações do e-mail
    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Substitua pelo host SMTP do seu provedor
        $mail->SMTPAuth = true;
        $mail->Username = 'plataformaespeciesnativas@gmail.com'; // Substitua pelo seu e-mail
        $mail->Password = 'plataformanativa2025'; // Substitua pela sua senha ou app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Remetente e destinatário
        $mail->setFrom($email, $nome);
        $mail->addAddress('plataformaespeciesnativas@gmail.com', 'Plataforma de Espécies Nativas');

        // Conteúdo do e-mail
        $mail->isHTML(true);
        $mail->Subject = 'Nova mensagem de contato';
        $mail->Body = "<strong>Nome:</strong> $nome<br>
                        <strong>E-mail:</strong> $email<br>
                        <strong>Mensagem:</strong><br>$mensagem";

        $mail->send();
        echo "<script>alert('Mensagem enviada com sucesso!'); window.location.href='contato.html';</script>";
    } catch (Exception $e) {
        echo "<script>alert('Erro ao enviar a mensagem: {$mail->ErrorInfo}'); window.location.href='contato.html';</script>";
    }
} else {
    // Redireciona para a página de contato se o acesso não for via POST
    header('Location: contato.html');
    exit;
}
?>
