<?php 

defined('BASEPATH') OR exit('No direct script access allowed');


/**
 * API JSON RESPONSE
 */
class Response
{
	public $CI;
	
	public function send($data, $status = 200)
	{
		return $this->CI->output
		->set_status_header($status)
		->set_output(json_encode($data));
	}

	public function sendError($message, $status = 404)
	{
		return $this->CI->output
		->set_status_header($status)
		->set_output(json_encode(['message' => $message]));
	}

	public function sendMessage($response)
	{
		return $this->CI->output
		->set_status_header(($response['status']) ? $response['status'] : 200)
		->set_output(json_encode(['message' => $response['message']]));
	}

	public function __construct()
	{
		$this->CI = &get_instance();
		$this->CI->output->set_header('Access-Control-Allow-Origin: *');
    	$this->CI->output->set_header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, HEAD, OPTIONS");
    	$this->CI->output->set_header('Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding');
    	$this->CI->output->set_content_type('application/json');
    	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { die(); }
	}
}

?>