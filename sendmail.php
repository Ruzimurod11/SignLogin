<?php 
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = "UTF-8";
  $mail->setLanguage("en", 'phpmailer/language/');
  $mail->IsHTML(true);

  // from Whom
  $mail->setFrom('info@fls.guru', 'Freelancer lifestyle');
  // to whom 
  $mail->addAddress('code@fls.guru');
  // subject mail
  $mail->Subject = 'Salom bu Ruzimurod';

  // hand
  $hand = 'right';
  if($_POST['hand'] == 'left') {
    $hand = 'left';
  }

  // body mail's
  $body = '<h1>Meet super mail!</h1>';

  if (trim(!empty($_POST["name"]))) {
    $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
  }
  if (trim(!empty($_POST['email']))) {
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
  }
  if (trim(!empty($_POST['hand']))) {
    $body.='<p><strong>Hand:</strong> '.$hand.'</p>';
  }
  if (trim(!empty($_POST['age']))) {
    $body.='<p><strong>Age:</strong> '.$_POST['age'].'</p>';
  }
  if (trim(!empty($_POST['message']))) {
    $body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>';
  }

  // add file 
  if (trim(!empty($_FILES['image']['tmp_name']))) {
    // road for download file
    $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
    // add file
    if (copy($_FILES['image']['tmp_name'], $filePath)) {
      $fileAttach = $filePath;
      $body.='<p><strong>Image in application</strong>';
      $mail->addAttachment($fileAttach);
    }
  }

  $mail->Body = $body;

  // Send
  if (!$mail->send()) {
    $message = "Error";
  } else {
    $message = 'Data has been sended!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);

?>