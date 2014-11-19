<?php
class PostMessage
{
	const CONVO_LOCATION = '../conversation/conversation.txt';

	public function WriteToConversation($message, $who)
	{
		$file = __DIR__.'/'.self::CONVO_LOCATION;
		$messages = unserialize(file_get_contents($file));
		$messages[] = array(
			'from' => $who,
			'message' => $message,
			'time' => date('h:i:s a')
		);
		$status = file_put_contents($file, serialize($messages));
		
		header('Content-Type: application/json');
		echo json_encode(array(
			'status' => $status
		));
	}
}

$m = new PostMessage();
$m->WriteToConversation($_POST['msg'], $_POST['from']);