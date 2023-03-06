CREATE DATABASE `mima` DEFAULT charset=utf8mb4;
use `mima`;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `username` VARCHAR(32) NOT NULL COMMENT '账号',
    `password` VARCHAR(32) NOT NULL COMMENT '密码',
    `email` VARCHAR(32) DEFAULT NULL COMMENT '邮箱',
    `mobile` INT(11) DEFAULT NULL COMMENT '手机',
    `nick` VARCHAR(32) DEFAULT NULL COMMENT '昵称',
    `pic` VARCHAR(256) DEFAULT NULL COMMENT '头像',
    `reg_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
    `updata_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    `status` TINYINT(1) NOT NULL DEFAULT '1' COMMENT '状态(单选):0=未激活,1=激活',
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员';

DROP TABLE IF EXISTS `mima`;
CREATE TABLE IF NOT EXISTS `mima`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `appname` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '名称',
    `username` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '账号',
    `password` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '密码',
    `link` VARCHAR(128) NOT NULL DEFAULT '' COMMENT '链接',
    `logo` TEXT COMMENT '图标',
    `note` VARCHAR(128) NOT NULL DEFAULT '' COMMENT '备注',
    `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updata_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态(单选):0=未激活,1=激活',
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='密码记事本';
