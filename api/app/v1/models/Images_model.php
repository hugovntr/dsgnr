<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Images_model extends CI_Model {

	public function getAll()
	{
		$images = $this->db->get('images')->result();
		return $images;
	}

	public function getSlugs()
	{
		$res = $this->db->select('slug')->get('images')->result();
		$return = [];
		foreach ($res as $row) {
			array_push($return, $row->slug);
		}
		return ($return);
	}

	public function get($slug)
	{
		return ($this->db->get_where('images', ['slug' => $slug])->result());
	}

	public function edit($slug, $data)
	{
		if (empty($data)) {
			return (['message' => 'error bro', 'status' => 401]);
		}
		try {
			$this->db->where('slug', $slug)->update('images', $data);
			return (['message' => 'successfully edited', 'status' => 200]);
		} catch (Exception $e) {
			return (['message' => $e, 'status' => 400]);
		}
	}

	public function insert($data)
	{
		try {
			$this->db->insert('images', $data);
			return (['message' => 'successfully created', 'status' => 201]);
		} catch (Exception $e) {
			return (['message' => $e, 'status' => 400]);
		}
	}

	public function delete($id)
	{
		try {
			$this->db->delete('images', ['id' => $id]);
			return (['message' => 'successfully deleted', 'status' => 200]);
		} catch (Exception $e) {
			return (['message' => $e, 'status' => 400]);
		}
	}
}
