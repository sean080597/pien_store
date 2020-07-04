<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
  protected $role;

  public function __construct(){
    $this->middleware('jwt.auth');
    $this->role = new Role;
  }

  public function getAllData(){
    $lsRoles = $this->role->all();
    return response()->json(['success' => true, 'data' => $lsRoles], 200);
}
}
