<?php
 namespace App\Traits;
 use Config;
 use Image;
 trait CommonService
 {
    public static function quickRandomString($length = 16){
        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return substr(str_shuffle(str_repeat($pool, $length)), 0, $length);
    }

    public static function quickRandomStringNumber($length = 16){
        $pool = '0123456789';
        return substr(str_shuffle(str_repeat($pool, $length)), 0, $length);
    }

    public static function checkSaveImage($list_file_types, $input_image, $file_directory){
        //generate image file name
        $generate_name = uniqid() . '_' . time() . date('Ymd') . '_IMG';
        //get mime type
        $mimeType = Image::make($input_image)->mime();
        if (in_array($mimeType, $list_file_types)) {
            foreach ($list_file_types as $type) {
                if (strcmp($type, $mimeType) == 0) {
                    $mime_split = explode('/', $type);
                    $file_name = $generate_name . '.' . end($mime_split);
                }
            }
            //save image
            Image::make($input_image)->save($file_directory.$file_name);
            return response()->json([
                'success' => true,
                'file_name' => $file_name
            ]);
        }else{
            return response()->json([
                'success' => false,
                'error_msg' => Config::get('constants.MSG.ERROR.ONLY_IMG_TYPE'),
            ]);
        }
    }

    public static function isSetNotEmpty($val){
        return isset($val) && !empty($val);
    }

    // greatest common divisor (USCLN - VI)
    public static function USCLN($a, $b) {
        if ($b == 0) return $a;
        return self::USCLN($b, $a % $b);
    }

    // least common multiple (BSCNN - VI)
    public static function BSCNN($a, $b) {
        return ($a * $b) / self::USCLN($a, $b);
    }

    // convert fraction (a/b)- Numerator(a) & Denominator(b)
    public static function getRatioImage($img_width, $img_height) {
        $aspectRatio = round($img_width/$img_height, 1);
        $nume = $aspectRatio*10; $deno = 10;
        $uscln = self::USCLN($nume, $deno);
        return response()->json([
            'numerator' => $nume/$uscln,
            'denominator' => $deno/$uscln
        ]);
    }
 }