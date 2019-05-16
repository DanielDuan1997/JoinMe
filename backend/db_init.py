#!/usr/bin/python3

import pymysql

db = pymysql.connect("localhost", "root", "niabbf")

cursor = db.cursor()

cursor.execute("DROP DATABASE IF EXISTS JoinMe;")
cursor.execute("CREATE DATABASE JoinMe;")
cursor.execute("use JoinMe;")

sql = """CREATE TABLE `User` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` char(20) NOT NULL,
  `password` char(32) NOT NULL,
  `total_rate` int(10) DEFAULT 10,
  `total_num` int(10) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
cursor.execute(sql)

sql = """CREATE TABLE `Task` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `initiator` int(10) NOT NULL,
  `num_connect` int(1) NOT NULL,
  `from` char(20) NOT NULL,
  `to` char(20) NOT NULL,
  `starttime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`initiator`) REFERENCES User(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
cursor.execute(sql)

sql = """CREATE TABLE `Relation` (
  `user_id` int(10) NOT NULL,
  `task_id` int(10) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY(`user_id`, `task_id`),
  FOREIGN KEY(`user_id`) REFERENCES User(`id`),
  FOREIGN KEY(`task_id`) REFERENCES Task(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
cursor.execute(sql)

print("Create DataBase `JoinMe` tables `User`, `Task`, `Relation`")

db.close()
