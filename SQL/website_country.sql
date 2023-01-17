-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: 10.211.55.3    Database: website
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `base_code` varchar(255) NOT NULL DEFAULT '',
  `detail_code` varchar(255) NOT NULL DEFAULT '',
  `number_code` varchar(255) NOT NULL DEFAULT '',
  `is_sovereignty` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_2c5aa339240c0c3ae97fcc9dc4` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'阿富汗','AF','AFG','004','1'),(5,'奥兰','AX','ALA','248','0'),(6,'阿尔巴尼亚','AL','ALB','008','1'),(7,'阿尔及利亚','DZ','DZA','012','1'),(8,'美属萨摩亚','AS','ASM','016','0'),(9,'安道尔','AD','AND','020','1'),(10,'安哥拉','AO','AGO','024','1'),(11,'安圭拉','AI','AIA','660','0'),(12,'南极洲','AQ','ATA','010','0'),(13,'安提瓜和巴布达','AG','ATG','028','1'),(14,'阿根廷','AR','ARG','032','1'),(15,'亚美尼亚','AM','ARM','051','1'),(16,'阿鲁巴','AW','ABW','533','0'),(17,'澳大利亚','AU','AUS','036','1'),(18,'奥地利','AT','AUT','040','1'),(19,'阿塞拜疆','AZ','AZE','031','1'),(20,'巴哈马','BS','BHS','044','1'),(21,'巴林','BH','BHR','048','1'),(22,'孟加拉国','BD','BGD','050','1'),(23,'巴巴多斯','BB','BRB','052','1'),(24,'白俄罗斯','BY','BLR','112','1'),(25,'比利时','BE','BEL','056','1'),(26,'伯利兹','BZ','BLZ','084','1'),(27,'贝宁','BJ','BEN','204','1'),(28,'百慕大','BM','BMU','060','0'),(29,'不丹','BT','BTN','064','0'),(30,'玻利维亚','BO','BOL','068','1'),(31,'荷兰加勒比区','BQ','BES','535','0'),(32,'波黑','BA','BIH','070','1'),(33,'博茨瓦纳','BW','BWA','072','1'),(34,'布韦岛','BV','BVT','074','0'),(35,'巴西','BR','BRA','076','1'),(36,'英属印度洋领地','IO','IOT','086','0'),(37,'文莱','BN','BRN','096','1'),(38,'保加利亚','BG','BGR','100','1'),(39,'布基纳法索','BF','BFA','854','1'),(40,'布隆迪','BI','BDI','854','1'),(41,'佛得角','CV','CPV','132','1'),(42,'柬埔寨','KH','KHM','116','1'),(44,'喀麦隆','CM','CMR','120','1'),(45,'加拿大','CA','CAN','124','1'),(46,'开曼群岛','KY','CYM','136','0'),(47,'中非','CF','CAF','140','1'),(48,'乍得','TD','TCD','148','1'),(49,'智利','CL','CHL','152','1'),(50,'中国','CN','CHN','156','1');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-17 16:42:00
