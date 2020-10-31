-- MySQL dump 10.17  Distrib 10.3.25-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: samarket
-- ------------------------------------------------------
-- Server version	10.3.25-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `samarket`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `samarket` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `samarket`;

--
-- Table structure for table `chat_msgs`
--

DROP TABLE IF EXISTS `chat_msgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_msgs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chat_room_id` bigint(20) DEFAULT NULL,
  `sender_id` varchar(36) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `unread` bigint(20) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chat_msgs_chat_room` (`chat_room_id`),
  KEY `fk_chat_msgs_sender` (`sender_id`),
  CONSTRAINT `fk_chat_msgs_chat_room` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_rooms` (`id`),
  CONSTRAINT `fk_chat_msgs_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_msgs`
--

LOCK TABLES `chat_msgs` WRITE;
/*!40000 ALTER TABLE `chat_msgs` DISABLE KEYS */;
INSERT INTO `chat_msgs` VALUES (1,1,'1f3c9e97-bc0a-46a8-ad91-dea310d9f827','안녕하세요! 체중계 사고 싶은데요',0,'2020-10-31 05:10:32.833'),(2,1,'57f5b80c-cc46-427f-8546-95891d54fdd8','시간 언제 괜찮으신가요???',0,'2020-10-31 05:12:29.512'),(3,1,'1f3c9e97-bc0a-46a8-ad91-dea310d9f827','저는 오늘은 근무가 없어서 아무때나 가능해요!!',0,'2020-10-31 05:12:41.268'),(4,1,'57f5b80c-cc46-427f-8546-95891d54fdd8','그럼 다음주 일요일 10시에',0,'2020-10-31 05:13:13.851'),(5,1,'57f5b80c-cc46-427f-8546-95891d54fdd8','족구장 앞에서 뵐까요?',0,'2020-10-31 05:13:30.478'),(6,1,'1f3c9e97-bc0a-46a8-ad91-dea310d9f827','네 좋아요',0,'2020-10-31 05:13:40.218'),(7,1,'57f5b80c-cc46-427f-8546-95891d54fdd8','ㅎㅎ',0,'2020-10-31 05:13:49.677');
/*!40000 ALTER TABLE `chat_msgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_rooms`
--

DROP TABLE IF EXISTS `chat_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_rooms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) DEFAULT NULL,
  `title` longtext DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `status` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chat_rooms_post` (`post_id`),
  CONSTRAINT `fk_chat_rooms_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_rooms`
--

LOCK TABLES `chat_rooms` WRITE;
/*!40000 ALTER TABLE `chat_rooms` DISABLE KEYS */;
INSERT INTO `chat_rooms` VALUES (1,1,'체중계 팝니다','2020-10-31 05:10:21.481',1);
/*!40000 ALTER TABLE `chat_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `to_reply` bigint(20) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_replies` (`to_reply`),
  KEY `fk_comments_post` (`post_id`),
  KEY `fk_comments_user` (`user_id`),
  CONSTRAINT `fk_comments_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_comments_replies` FOREIGN KEY (`to_reply`) REFERENCES `comments` (`id`),
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,'80afc444-a298-4538-8957-f1c6f9b75743','얼마나 쓰신 건가여',NULL,'2020-10-31 05:03:59.966','2020-10-31 05:03:59.966'),(2,1,'57f5b80c-cc46-427f-8546-95891d54fdd8',' 3달 정도 됐습니다',NULL,'2020-10-31 05:06:08.902','2020-10-31 05:06:08.902'),(3,1,'80afc444-a298-4538-8957-f1c6f9b75743','괜찮네요',2,'2020-10-31 05:06:43.550','2020-10-31 05:06:43.550'),(4,1,'80afc444-a298-4538-8957-f1c6f9b75743','채팅 주세요~',2,'2020-10-31 05:06:59.672','2020-10-31 05:06:59.672'),(5,1,'1f3c9e97-bc0a-46a8-ad91-dea310d9f827','저도 사고 싶어요!',NULL,'2020-10-31 05:12:20.358','2020-10-31 05:12:20.358');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorites` (
  `user_id` varchar(36) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`post_id`),
  KEY `fk_favorites_post` (`post_id`),
  CONSTRAINT `fk_favorites_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_favorites_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES ('1f3c9e97-bc0a-46a8-ad91-dea310d9f827',1),('57f5b80c-cc46-427f-8546-95891d54fdd8',1);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follows` (
  `user_id` varchar(36) NOT NULL,
  `follow_id` varchar(36) NOT NULL,
  PRIMARY KEY (`user_id`,`follow_id`),
  KEY `fk_follows_follows` (`follow_id`),
  CONSTRAINT `fk_follows_follows` FOREIGN KEY (`follow_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_follows_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES ('1f3c9e97-bc0a-46a8-ad91-dea310d9f827','3b5b1dd3-615a-4df8-bf34-168e57b93321'),('1f3c9e97-bc0a-46a8-ad91-dea310d9f827','57f5b80c-cc46-427f-8546-95891d54fdd8'),('3b5b1dd3-615a-4df8-bf34-168e57b93321','1f3c9e97-bc0a-46a8-ad91-dea310d9f827'),('3b5b1dd3-615a-4df8-bf34-168e57b93321','57f5b80c-cc46-427f-8546-95891d54fdd8'),('57f5b80c-cc46-427f-8546-95891d54fdd8','1f3c9e97-bc0a-46a8-ad91-dea310d9f827'),('57f5b80c-cc46-427f-8546-95891d54fdd8','3b5b1dd3-615a-4df8-bf34-168e57b93321'),('57f5b80c-cc46-427f-8546-95891d54fdd8','80afc444-a298-4538-8957-f1c6f9b75743'),('80afc444-a298-4538-8957-f1c6f9b75743','57f5b80c-cc46-427f-8546-95891d54fdd8');
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notis`
--

DROP TABLE IF EXISTS `notis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notis` (
  `user_id` varchar(36) DEFAULT NULL,
  `noti_user_id` varchar(36) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `action` longtext DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  KEY `fk_notis_user` (`user_id`),
  KEY `fk_notis_noti_user` (`noti_user_id`),
  CONSTRAINT `fk_notis_noti_user` FOREIGN KEY (`noti_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_notis_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notis`
--

LOCK TABLES `notis` WRITE;
/*!40000 ALTER TABLE `notis` DISABLE KEYS */;
/*!40000 ALTER TABLE `notis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `author_id` varchar(36) DEFAULT NULL,
  `tags` longtext DEFAULT NULL,
  `title` longtext DEFAULT NULL,
  `type` longtext DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `sub` longtext DEFAULT NULL,
  `clr_font` longtext DEFAULT NULL,
  `clr_back` longtext DEFAULT NULL,
  `clr_tag` longtext DEFAULT NULL,
  `unit_id` bigint(20) DEFAULT NULL,
  `closed` tinyint(1) DEFAULT NULL,
  `is_favorite` bigint(20) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_posts_author` (`author_id`),
  KEY `fk_posts_unit` (`unit_id`),
  CONSTRAINT `fk_posts_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_posts_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'57f5b80c-cc46-427f-8546-95891d54fdd8','체중계,운동,피트니스,다이어트','체중계 팝니다','sell','전역이 얼마 안 남아서 필요없는 체중계를 처분하려고 합니다.\n\n제품명: CAS 디지털 체중계\n가격: 8000원\n희망거래기간: 2020년 11월 10일~13일\n\n연락주시길 바랍니다~~\n','전역하기 전 필요없는 체중계 처분\n3000','#ffffff','#70b5ff','#3450c9',1,0,0,'2020-10-31 04:34:53.241','2020-10-31 04:34:53.241'),(2,'1f3c9e97-bc0a-46a8-ad91-dea310d9f827','오픈소스,Github,개발','국방 오픈소스 해커톤에 대해 알아보자','adv','함께 개발하고 참여 · 공유하는 공개SW 개발방식으로 국방 분야에 활용 가능한 참신하고 우수한 아이디어와 인재 발굴을 위한 기회이니, 많은 관심과 참여 바랍니다.\n\n대  회  명 : 2020 군장병 공개SW 온라인 해커톤\n참가 분야 : 병영생활 및 국방에서 활용 가능한 모바일 앱, 웹 서비스 등 또는 지정과제\n참가 기간 : 2020년 9월 17일(화) ~ 2020년 11월 14일(토), 2개월\n참가 방식 : 온라인 개발 및 협업 방식\n참가 대상 : 별도 참가자 선발(150명 이내)','OSAM','#202326','#00ffcc','#ffffff',1,0,0,'2020-10-31 06:55:57.690','2020-10-31 06:55:57.690'),(3,'3b5b1dd3-615a-4df8-bf34-168e57b93321','스포츠,탁구','탁구라켓 팝니다','sell','사용한지 한 달된 탁구라켓입니다.\n스크래치 없고 상태 양호합니다.\n카카오페이 환영\n\n희망거래기간 2020.11.01~03\n\n연락주세요','2000','#ffffff','#ff5e5e','#522c08',1,0,0,'2020-10-31 08:08:40.391','2020-10-31 08:08:40.391'),(4,'638c58c5-acc7-4c74-837c-41803f152599','공구,정비병,맥가이버칼','빅토리노스 맥가이버칼 싸게 팝니다','sell','정가 44000원 빅토리노스 정품 \n맥가이버칼입니다.\n차량 정비할 때 들고다니면 쓸만합니다.\n','10000','#ffffff','#8990A0','#505560',1,0,0,'2020-10-31 08:18:43.577','2020-10-31 08:18:43.577'),(5,'9b33255f-604f-4257-83d3-5feb0b2599d0','스포츠,농구,농구공','농구공 처분합니다','sell','피엑스에서 파는 농구공입니다\n급하게 처분해야돼서 3분의1 정도로\n싸게 팝니다\n바로 채팅 걸어주세요','1000','#ffffff','#b36710','#4f2405',1,0,0,'2020-10-31 08:30:51.914','2020-10-31 08:30:51.914'),(6,'357bed4f-150b-4ebd-a26a-fcc3d4face7a','혹한기,방한,153군장점,이벤트,세일','[광고] 153 군장점에서 혹한기 이벤트 진행 중!!','adv','153 군장점에서\n혹한기 훈련 등으로 고생하는\n장병들을 위해\n조그마한 이벤트를 마련했습니다!!\n\n이벤트 기간: 2020년 11월 14일부터 29일까지 2주간\n방상내피, 방한양말, 목토시 등 15종 방한물품을\n최대 70% 할인된 가격으로 판매합니다.\n \n군장병 여러분들의 많은 관심 부탁드립니다.','방한물품15종 최대 70%할인','#ffffff','#229ee0','#24b4d1',1,0,0,'2020-10-31 08:44:14.358','2020-10-31 08:44:14.358'),(7,'80afc444-a298-4538-8957-f1c6f9b75743','후레쉬,랜턴','ㄱ자 후레쉬 팝니다','sell','시중에서 정가 3만원인 \n4색 LED ㄱ자 후레쉬 팝니다.\n단독군장에 딱들어갑니다.\n\n배터리는 별도로...','4000','#434546','#54f25a','#1ea427',1,0,0,'2020-10-31 08:57:15.170','2020-10-31 08:57:15.170'),(9,'010624b5-4a27-47bd-9e3c-c1e3baf6041e','휴가,2020,6사단','[공지] 휴가 신청','post','6사단 장병 여러분 휴가신청은 \n11월 14일에 마감되니\n늦지않게 신청바랍니다.','2020년 11월 14일에 마감','#2c2b2b','#f05656','#de8c8c',1,0,0,'2020-10-31 09:03:07.924','2020-10-31 09:03:07.924'),(10,'57f5b80c-cc46-427f-8546-95891d54fdd8','꿀팁,Px,음식','Px 최고의 조합','post','1. 공화춘 짜장+불닭or간짬뽕    슈넬 치킨or조각치킨or크리스피 치킨(크리스피 치킨은 4천원 넘었던걸로 기억함)\n\n2. 비비고 볶음김치+참치캔(섞어먹으면 찐맛이다 약간 꽁치 김치조림 맛임 강추)\n\n3. 컵 칼국수+봉지 칼국수 라면\n겨울에 먹어야 진가를 발휘한다\n\n4. 양념곱창(우리 부대는 팔았었다/가격에 3~4천원대로 월급날만 먹는 냉동이였음 진짜 곱창맛남)+햇반   이거 두개면 사회음식 부럽지 않다\n\n5. 크림우동+불닭볶음면   슈넬or카라 치킨/샤오롱 만두','이것만 알면 나도 백종원','#ffe100','#000000','#7d7d7d',1,0,0,'2020-10-31 09:26:57.505','2020-10-31 09:26:57.505'),(11,'566e1a55-a8b5-449d-9315-5539328e248c','방공,항공기_식별,진급평가','[꿀팁] 항공기 식별 쉽게 외우는 법','post','방공 병과에게\n항공기 식별은\n진급을 위해서 무조건 외워야 한다.\n그러나 500문항이라는 어마무식한 암기량 앞에\n많은 방공병들이 좌절하곤 한다.\n그러나 방법이 없는 것은 아니다\n지금부터 병장 2호봉의 비법을 \n전수해주도록 하겠다\n그 비법은...\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n60초 후에 공개합니다','너도 만점 받을 수 있어...','#010500','#f7f177','#f0ca0e',1,0,0,'2020-10-31 09:43:19.669','2020-10-31 09:43:19.669'),(12,'638c58c5-acc7-4c74-837c-41803f152599','토익,자기계발,영어,외국어','만점자의 토익책 팝니다','sell','이 책으로 군대에서 빡세게 공부해서 토익만점 받았습니다.\n전 어차피 만점이라 싸게 처분합니다.\n\n조조토익 LC/RC Set이고\n가격은 정가 절반인 만원에 드리겠습니다.\n\n희망거래기간은 \n2020년 10월 31일 ~ 11월 3일입니다.\n연락주세요ㅎㅎ','10000','#003d02','#a3c08c','#65a159',1,0,0,'2020-10-31 10:13:34.253','2020-10-31 10:13:34.253'),(13,'638c58c5-acc7-4c74-837c-41803f152599','손난로,방한','🔥 손난로 대량 판매 중 🔥','sell','훈련 때문에 많이 샀다가 \n20개 남은 거 처분합니다\n피엑스에서 파는 일반 손난롭니다.\n\n다담주 휴가라\n담주 중으로 연락주시면 감사하겠습니다.','5000','#ffffff','#a891c5','#6e5f91',1,0,0,'2020-10-31 10:15:40.375','2020-10-31 10:15:40.375');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `writer_id` varchar(36) DEFAULT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `point` float DEFAULT NULL,
  `target_user_id` varchar(36) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_writer` (`writer_id`,`post_id`),
  KEY `fk_reviews_post` (`post_id`),
  KEY `fk_reviews_target_user` (`target_user_id`),
  CONSTRAINT `fk_reviews_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_reviews_target_user` FOREIGN KEY (`target_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_reviews_writer` FOREIGN KEY (`writer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'1f3c9e97-bc0a-46a8-ad91-dea310d9f827',1,'싸게 잘 산것 같아요!!',8,'57f5b80c-cc46-427f-8546-95891d54fdd8','2020-10-31 05:15:34.302','2020-10-31 05:15:34.302'),(2,'57f5b80c-cc46-427f-8546-95891d54fdd8',1,'친절한 분이시네요',9,'1f3c9e97-bc0a-46a8-ad91-dea310d9f827','2020-10-31 05:16:13.321','2020-10-31 05:16:13.321');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `units` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `mil` bigint(20) DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `logo_url` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,1,'테스트부대',NULL),(2,1,'엄청강한부대',NULL);
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_chatrooms`
--

DROP TABLE IF EXISTS `user_chatrooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_chatrooms` (
  `chat_room_id` bigint(20) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`chat_room_id`,`user_id`),
  KEY `fk_user_chatrooms_user` (`user_id`),
  CONSTRAINT `fk_user_chatrooms_chat_room` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_rooms` (`id`),
  CONSTRAINT `fk_user_chatrooms_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_chatrooms`
--

LOCK TABLES `user_chatrooms` WRITE;
/*!40000 ALTER TABLE `user_chatrooms` DISABLE KEYS */;
INSERT INTO `user_chatrooms` VALUES (1,'1f3c9e97-bc0a-46a8-ad91-dea310d9f827'),(1,'57f5b80c-cc46-427f-8546-95891d54fdd8');
/*!40000 ALTER TABLE `user_chatrooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `login_id` varchar(191) DEFAULT NULL,
  `password` longtext DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `phone` longtext DEFAULT NULL,
  `profile_url` longtext DEFAULT NULL,
  `mil` bigint(20) DEFAULT NULL,
  `rank` longtext DEFAULT NULL,
  `unit_id` bigint(20) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_id` (`login_id`),
  KEY `fk_users_unit` (`unit_id`),
  CONSTRAINT `fk_users_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('010624b5-4a27-47bd-9e3c-c1e3baf6041e','6사단 대신 전해드립니다','$2a$10$cvSuIFfdfPg9lyMOXgYFAexsq1/nWvUR/V/cPYvqB8PvSIwJOIH8G','청성하늘지기','','/upload/bluestar.png',1,NULL,1,NULL,NULL),('1421be31-e043-4ffd-97bb-0158c8192cd5','jtjun','$2a$10$D6NqQ2kWvdZJRF9v/ig8yOGDH5fXnrdpfA9l25TqkI11X8sfNLkR2','장태준','','/upload/627153AE-7C8F-4475-B60F-B8A2D6107E96.jpeg',1,NULL,1,NULL,NULL),('1f3c9e97-bc0a-46a8-ad91-dea310d9f827','test1234','$2a$10$eA8KJC1HxoE6idOdDHZRBOHlKNZ0lgaCv5PXfLsQrdW4g3nZQHASW','굳건이','','/upload/다운로드.png',1,NULL,1,NULL,NULL),('282f4e67-83ad-4aa0-b69b-34612639e3eb','홍길동','$2a$10$6YJIwbeZoFKYmwRCbBD4yO2.qY5JU0DHAysHbLGTHTHCsPDxnR0m.','홍길동','',NULL,1,NULL,1,NULL,NULL),('357bed4f-150b-4ebd-a26a-fcc3d4face7a','gjj','$2a$10$QVoLV/Y2fyZjbd4622E.wuEObyL17qR7/lw.I6H9.Tu4zIMVtWoVS','153군장점','','/upload/463b8c56266981cb52a08a99155f8f49.jpg',1,NULL,1,NULL,NULL),('3b5b1dd3-615a-4df8-bf34-168e57b93321','pec','$2a$10$Mm7Cb9Ep7RdYa1lhh/TmCuVminpAWXZZaqe6x2U19Yx0/1j6Cv5tq','박은찬','','/upload/Flag_of_South_Korea.svg',1,NULL,1,NULL,NULL),('566e1a55-a8b5-449d-9315-5539328e248c','cjh','$2a$10$s0nWUuvpaGpg/0zQOjHOAuM0Pbo6Ov3Yz8SUMcYBTO3Q4Aq3GVX/.','최준혁','',NULL,1,NULL,1,NULL,NULL),('57f5b80c-cc46-427f-8546-95891d54fdd8','sce06147','$2a$10$z0D6X4vUmQdTojn5VQ29zeYnPkFp205CLPrzmRfiWzJYCY.57UolK','고현수','','/upload/Screenshot_20200529-202848_KakaoTalk.jpg',1,NULL,1,NULL,NULL),('638c58c5-acc7-4c74-837c-41803f152599','jokuna','$2a$10$HEuTnVC2Lo8UBDWjxPKJq.z8AXtseQLtIp/9Kx56QEV4JNW2euujC','조건희','',NULL,1,NULL,1,NULL,NULL),('80afc444-a298-4538-8957-f1c6f9b75743','psh1234','$2a$10$TL7BTKJj3zw/NlbV/qaxyeHU5Jm.qn2VAZYCU8H8OACxb/juC5z12','박상호','',NULL,1,NULL,1,NULL,NULL),('94b84a98-fc0c-4f67-9913-fda6a749ab8a','gdh','$2a$10$fHbJDvrPotzusguqiGOMoO70ofMEzWdJ1A3oLUysOl5pGtQ50pEbS','강동한','',NULL,1,NULL,1,NULL,NULL),('9b33255f-604f-4257-83d3-5feb0b2599d0','kyj','$2a$10$NCt8TiBz1Xiwoobd0uuesOTmCrray50pcrTxoePvBU6snmrMzzN2i','김영준','','/upload/unnamed-2.jpg',1,NULL,1,NULL,NULL),('e40109ee-3b9b-4b73-8bee-e78160d07723','nkimlab','$2a$10$QNjBDN3RMKjq3bHainzkferNPs1WIYzWZc4K6mPP4faN2EqCl3186','김남희','',NULL,1,NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-31 10:55:54
