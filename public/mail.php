<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 'on');

$data = json_decode(file_get_contents('php://input'));
$name = $data->{'name'};
  $email_address = $data->{'email'};
  $message = $data->{'message'};
  $subject = $data->{'subject'};

 // echo empty($email_address);

 if(empty($name) ||
    empty($email_address)  ||
    empty($subject)  ||
    empty($message))
  {
       echo 'Data was not provided!';   return false;
  }
  if(!filter_var($email_address,FILTER_VALIDATE_EMAIL)) {
      echo 'Email is invalid';   return false;
  }

 // create email body and send it
 $to = 'lvelazquezllanes@gmail.com';
 // put your email
 $email_subject = "Contact form submitted by:  $name about ";
 $email_body = "You have received a new message. \n\n".
                   " Here are the details:\n \nName: $name \n ".
                   "Email: $email_address\n Message \n $message";
 $headers = "From: $email_address\n";
 $headers .= "Reply-To: $email_address";



 echo 'Mail sent!'; mail($to,$email_subject,$email_body,$headers); return true;

?>