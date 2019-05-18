#!/usr/bin/python3

import pymysql

db = pymysql.connect("localhost", "root", "niabbf")

cursor = db.cursor()

cursor.execute("DROP DATABASE IF EXISTS JoinMe;")
cursor.execute("CREATE DATABASE JoinMe;")
cursor.execute("use JoinMe;")

sql = """CREATE TABLE `User` (
  `username` char(20) NOT NULL,
  `nickname` char(20) NOT NULL,
  `password` char(32) NOT NULL,
  `total_rate` int(10) DEFAULT 10,
  `total_num` int(10) DEFAULT 1,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
cursor.execute(sql)

sql = """CREATE TABLE `Task` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `initiator` char(20) NOT NULL,
  `num_connect` int(1) NOT NULL,
  `from` char(20) NOT NULL,
  `to` char(20) NOT NULL,
  `starttime` datetime NOT NULL,
  `cancel` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`initiator`) REFERENCES User(`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
cursor.execute(sql)

sql = """CREATE TABLE `Relation` (
  `username` char(20) NOT NULL,
  `task_id` int(10) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`username`, `task_id`),
  FOREIGN KEY (`username`) REFERENCES User(`username`),
  FOREIGN KEY (`task_id`) REFERENCES Task(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
cursor.execute(sql)

print("Create DataBase `JoinMe` tables `User`, `Task`, `Relation`")

sql = """INSERT INTO `User` (`username`, `nickname`, `password`) VALUES ('niabbf', 'niabbf', '6f7a3a8fe1dc6259b01b49775621fc46')"""
cursor.execute(sql)
db.commit()

print("Create root user `niabbf`")

db.close()
