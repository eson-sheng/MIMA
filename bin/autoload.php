<?php
/**
 * Created by PhpStorm.
 * User: eson
 * Date: 2018/11/5
 * Time: 上午10:48
 */

/*自动加载*/
spl_autoload_register(function($class){
    require str_replace('\\', DIRECTORY_SEPARATOR, ltrim($class, '\\')).'.php';
});