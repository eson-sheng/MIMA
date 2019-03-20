<?php
/**
 * Created by PhpStorm.
 * User: eson
 * Date: 2018/11/5
 * Time: 上午10:51
 */

namespace Me;

use PDO;

class Mima
{
    /*配置属性*/
    public $_config = array();
    /*数据库*/
    private $_db = null;
    /*默认图标*/
    private $_logo = null;

    public function __construct ($config)
    {
        $this->_config = $config;
        $this->_db = new PDO(
            $this->_config['dsn'],
            $this->_config['username'],
            $this->_config['password'],
            array(
                /*错误异常模式处理*/
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                /*返回一个索引为结果集列名的数组*/
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                /*设置PDO属性预处理语句模拟*/
                PDO::ATTR_EMULATE_PREPARES => TRUE,
                /*初始化字符集*/
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
            )
        );
        /*测试连接*/
        // echo $this->_db->getAttribute(constant("PDO::ATTR_SERVER_VERSION"));
        $this->_logo = file_get_contents('./link/img/png');
    }

    public function index()
    {
        /*post发送api*/
        if (!empty($_POST['api'])) {
            
            /*get*/
            if ($_POST['api'] == 'get') {
                echo $this->_get_data();
                return TRUE;
            }

            /*add*/
            if ($_POST['api'] == 'add') {
                echo $this->_add_data();
                return TRUE;
            }

            if ($_POST['api'] == 'edit') {
                echo $this->_edit_data();
                return TRUE;
            }

            /*del*/
            if ($_POST['api'] == 'del') {
                echo $this->_del_data();
                return TRUE;
            }
        }

        /*页面参数*/
        $data = $this->_get_data();

        /*获取html页面*/
        ob_start();
        require_once __DIR__ . "/view/index_html.php";
        $html = ob_get_contents();
        ob_end_clean();

        /*消除资源*/
        unset($test);

        /*输出页面*/
        echo $html;
        return TRUE;
    }

    /*获取数据*/
    private function _get_data()
    {
        $sql = $this->_get_sql();
        $query = $this->_db->prepare($sql);
        $query->execute();
        $arr = $query->fetchAll();
        return json_encode($arr);
    }

    /*添加数据*/
    private function _add_data()
    {
        if (empty($_POST['json']['appname']) ||
            empty($_POST['json']['username']) ||
            empty($_POST['json']['password'])
        ) {
            return json_encode([
                'status' => FALSE,
                'data'  =>'',
                'errmsg' => '未传参数不完全！'
            ]);
        }

        if (empty($_POST['json']['logo'])) {
            $_POST['json']['logo'] = $this->_logo;
        }

        if (empty($_POST['json']['note'])) {
            $_POST['json']['note'] = '';
        }

        /*执行数据库存储*/
        $sql = $this->_add_sql();
        $stmt = $this->_db->prepare($sql);
        $init = $stmt->execute([
            $_POST['json']['appname'],
            $_POST['json']['username'],
            $_POST['json']['password'],
            $_POST['json']['logo'],
            $_POST['json']['note'],
        ]);

        return json_encode([
            'status' => TRUE,
            'data'  => $init,
            'errmsg' => 'OKAY'
        ]);
    }

    /*查询语句*/
    private function _get_sql()
    {
        return "
            SELECT 
                `id`,`appname`,`username`,`password`,`logo`,`note`
            FROM
                `mima`
            WHERE
                `status` = 1
            ;
        ";
    }

    /*添加语句*/
    private function _add_sql()
    {
        return "
            INSERT INTO `mima` (`appname`,`username`,`password`,`logo`,`note`) VALUES (?,?,?,?,?);
        ";
    }

    /*删除数据*/
    private function _del_data()
    {
        if (empty($_POST['json']['id'])) {
            return json_encode([
                'status' => FALSE,
                'data'  =>'',
                'errmsg' => '未传参数不完全！'
            ]);
        }

        /*执行数据库存储*/
        $sql = $this->_del_sql();
        $stmt = $this->_db->prepare($sql);
        $init = $stmt->execute([
            $_POST['json']['id'],
        ]);

        return json_encode([
            'status' => TRUE,
            'data'  => $init,
            'errmsg' => 'OKAY'
        ]);
    }

    /*删除语句*/
    private function _del_sql()
    {
        return "
            DELETE FROM `mima` WHERE `mima`.`id` = ? ;
        ";
    }

    /*修改数据*/
    private function _edit_data()
    {
        if (empty($_POST['json']['appname']) ||
            empty($_POST['json']['username']) ||
            empty($_POST['json']['password']) ||
            empty($_POST['json']['id'])
        ) {
            return json_encode([
                'status' => FALSE,
                'data'  =>'',
                'errmsg' => '未传参数不完全！'
            ]);
        }

        if (empty($_POST['json']['logo'])) {
            $_POST['json']['logo'] = $this->_logo;
        }

        if (empty($_POST['json']['note'])) {
            $_POST['json']['note'] = '';
        }

        /*执行数据库存储*/
        $sql = $this->_edit_sql();
        $stmt = $this->_db->prepare($sql);
        $init = $stmt->execute([
            $_POST['json']['appname'],
            $_POST['json']['username'],
            $_POST['json']['password'],
            $_POST['json']['logo'],
            $_POST['json']['note'],
            $_POST['json']['id'],
        ]);

        return json_encode([
            'status' => TRUE,
            'data'  => $init,
            'errmsg' => 'OKAY'
        ]);
    }

    /*修改语句*/
    private function _edit_sql()
    {
        return "
            UPDATE `mima` SET 
                `appname` = ? , 
                `username` = ? , 
                `password` = ? ,
                `logo` = ? ,
                `note` = ?  
            WHERE `mima`.`id` = ?;
        ";
    }
}