<?php
class FetchMessages
{
	const CONVO_LOCATION = '../conversation/conversation.txt';

	public function ReadConversation()
	{
		$file = __DIR__.'/'.self::CONVO_LOCATION;
		$messages = unserialize(file_get_contents($file));
		
		header('Content-Type: application/json');
		echo json_encode($messages);
	}
}

$fm = new FetchMessages();
$fm->ReadConversation();