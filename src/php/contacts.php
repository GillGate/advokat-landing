<?php

	$email_to = "gillgate@yandex.ru";
    
    $name = trim($_POST['contacts-name']);
    $secondName = trim($_POST['contacts-secondname']);
    $phone = trim($_POST['contacts-phone']);
	$email = trim($_POST['contacts-email']);
	$desc  = trim($_POST['contacts-desc']);

	$dt = date('Y-m-d H:i:s');
	
    $errors = [];

    if($name == '') {
		$errors['contacts-name'] = 'Введите имя!';
	} elseif (strlen($name) < 2) {
		$errors['contacts-name'] = 'Имя должно содержать миниммум 2 буквы!';
	}

	if($secondName == '') {
		$errors['contacts-secondname'] = 'Введите фамилию!';
	} elseif (strlen($secondName) < 2) {
		$errors['contacts-secondname'] = 'Фамилия должна содержать миниммум 2 буквы!';
	}

	if($phone == '') {
		$errors['contacts-phone'] = 'Укажите свой телефон!';
	} elseif(!validate_phone_number($phone)) {
		$errors['contacts-phone'] = 'Введите корректный номер!';
	}

	if($email == '') {
		$errors['contacts-email'] = 'Укажите свой E-mail!';
	}elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$errors['contacts-email'] = 'Введите корректный E-mail!';
	}

    $response = ['res' => empty($errors), 'errors' => $errors];
    
	if(empty($errors)){

		$headers = "";
		$headers .= "From: gillgate.bhuser.ru \r\n";
		$headers .= "Content-type': 'text/plain; charset=utf-8 \r\n";

		$subject  = 'Детальная запись на консультацию';
		$letter   = "Заявка из раздела контакты: \n Имя: $name \n Фамилия: $secondName \n Телефон: $phone \n Почта: $email \n Описание проблемы: $desc \n";

		$sendmail = mail($email_to, $subject, $letter, $headers);
	}
    
    echo json_encode($response);

    function validate_phone_number($phone) {
		$filtered_phone_number = filter_var($phone, FILTER_SANITIZE_NUMBER_INT);
		$phone_to_check = str_replace("-", "", $filtered_phone_number);
		if (strlen($phone_to_check) < 10 || strlen($phone_to_check) > 14) {
			return false;
		} else {
			return true;
		}
	}