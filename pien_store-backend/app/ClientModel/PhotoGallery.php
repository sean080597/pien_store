<?php

namespace App\ClientModel;

use Illuminate\Database\Eloquent\Model;

class PhotoGallery extends Model
{
    private $key;
    private $title;
    private $src;
    private $width;
    private $height;

    // Methods
    function set_key($val) { $this->key = $val; }
    function get_key() { return $this->key; }

    function set_title($val) { $this->title = $val; }
    function get_title() { return $this->title; }

    function set_src($val) { $this->src = $val; }
    function get_src() { return $this->src; }

    function set_width($val) { $this->width = $val; }
    function get_width() { return $this->width; }

    function set_height($val) { $this->height = $val; }
    function get_height() { return $this->height; }
}
