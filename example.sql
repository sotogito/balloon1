--
-- Table structure for table `author`
--
 
CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
--
-- Dumping data for table `author` //콤보박스의 목록을 바꾸고싶으면 아래 이름을 바꾸면 됨
--
 
INSERT INTO `author` VALUES (1,'balloon','balloon1');
INSERT INTO `author` VALUES (2,'big balloon','big balloon2');
 
--
-- Table structure for table `topic`//이 부분에서 글자수 제한이 있음
--
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
--
-- Dumping data for table `topic`
--
 
INSERT INTO `topic` VALUES (1,'balloon','hello my first balloon','2022-01-01 00:00:00',1);
