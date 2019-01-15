<?php
/**
 * Created by PhpStorm.
 * User: eson
 * Date: 2018/11/5
 * Time: 上午10:25
 */

require_once __DIR__ . "/bin/autoload.php";

/*配置文件加载*/
$config = require __DIR__ . '/config/web.php';
if (is_file(__DIR__ . '/config/local_web.php')) {
    $local_web = require __DIR__ . '/config/local_web.php';
    $config = array_merge($config, $local_web);
}

use Me\Mima;

$index = new Mima($config);
$index->index();
