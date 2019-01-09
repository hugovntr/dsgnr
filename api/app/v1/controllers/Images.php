<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Images extends CI_Controller {

	public function index()
	{
		$this->response->send($this->_images->getAll(), 200);
	}

	public function slugs()
	{
		$this->response->send($this->_images->getSlugs(), 200);
	}

	public function show($slug)
	{
		if (($data = $this->_images->get($slug)) != null)
		{
			$this->response->send($data, 200);
		}
		else
		{
			$this->response->sendError("No project with id $id");
		}
	}

	public function edit($slug)
	{
		$response = $this->_images->edit($slug, $this->input->post());

		$this->response->sendMessage($response);
	}

	public function create()
	{
		$url = $this->input->get('url');
		$title = $this->input->get('title');
		$description = $this->input->get('description');
		$data = [
			'url' => $this->input->get('url'),
			'title' => $this->input->get('title'),
			'description' => $this->input->get('description')
		];

		$response = $this->_images->insert($data);

		$this->response->sendMessage($response);
	}

	public function delete($id)
	{
		$response = $this->_images->delete($id);

		$this->response->sendMessage($response);
	}

	function __construct()
	{
		// NEED A FIX FOR THIS HORRIBLE MESS //
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: content-type");
		header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, HEAD, OPTIONS");
		parent::__construct();
    	$this->load->database();
		$this->load->model('Images_model', '_images');
	}
}
