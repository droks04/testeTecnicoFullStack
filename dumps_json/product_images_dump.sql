/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.0.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ecatalogos
-- ------------------------------------------------------
-- Server version	12.0.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `url` varchar(500) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `product_images` VALUES
(1,43,'assets//O-camiseta-oversized-luffy-one-piece-anime.webp','2025-09-20 19:20:43'),
(2,43,'assets//marrom-O-camiseta-oversized-luffy-one-piece-anime.webp','2025-09-20 19:20:43'),
(3,43,'assets//tras-O-camiseta-oversized-luffy-one-piece-anime.webp','2025-09-20 19:20:43'),
(4,44,'assets//preta-O-camiseta-camisa-anime-desenho-chainsaw-man-denji-ref-18.webp','2025-09-20 19:22:12'),
(5,44,'assets//detalhe-O-camiseta-camisa-anime-desenho-chainsaw-man-denji-ref-18.webp','2025-09-20 19:22:12'),
(6,44,'assets//tras-O-camiseta-camisa-anime-desenho-chainsaw-man-denji-ref-18.webp','2025-09-20 19:22:12'),
(7,58,'assets//rosa-O-camisa-t-shirt-feminina-estampa-lilo-stitch-azul-cores-top.webp','2025-09-20 19:23:09'),
(8,58,'assets//vermelha-O-camiseta-feminina-t-shirt-estampada-personagem-desenhos.webp','2025-09-20 19:23:09'),
(9,58,'assets//preta-O-camiseta-adulto-plus-size-stitch-camisa-algodo-barata.webp','2025-09-20 19:23:09'),
(10,64,'assets/D_NQ_NP_659697-MLB84760465567_052025-O-camiseta-homem-aranha-camisa-spider-man-marvel-logo-heroi.webp','2025-09-25 15:08:57'),
(11,76,'assets/D_NQ_NP_755818-MLB89494388365_082025-O-jaqueta-de-l-aurora.webp','2025-09-25 15:08:57'),
(12,65,'assets/D_NQ_NP_783301-MLB84737301847_052025-O-camiseta-camisa-nezuko-kamado-demon-slayer-anime.webp','2025-09-25 15:08:57'),
(13,59,'assets/D_NQ_NP_808069-CBT75765437106_042024-O-camiseta-lilo-stitch-ohana-significa-familia.webp','2025-09-25 15:08:57'),
(14,60,'assets/D_NQ_NP_823209-MLB84837660364_052025-O-camiseta-stitchlilo-babylook-feminina-preta-branca.webp','2025-09-25 15:08:57'),
(15,61,'assets/D_NQ_NP_852837-MLB88259107068_072025-O-camiseta-feminina-nerd-geek-stitch-e-lilo-disney-logo.webp','2025-09-25 15:08:57'),
(16,62,'assets/D_NQ_NP_854331-MLB85755788047_062025-O-camiseta-camisetao-de-treino-oversized-estampa-stitch.webp','2025-09-25 15:08:57'),
(17,66,'assets/D_NQ_NP_930908-MLB87791001339_072025-O-camiseta-feminina-oversize-minnie-1923-inedita-algodo.webp','2025-09-25 15:08:57'),
(18,63,'assets/D_NQ_NP_989509-MLB91260092134_092025-O.webp','2025-09-25 15:08:57'),
(19,84,'assets/D_Q_NP_2X_627961-MLB85716298673_062025-E-moletom-fire-blue-ziper-masculino-slim-com-capuz-e-bolsos.webp','2025-09-25 15:08:57'),
(20,71,'assets/D_Q_NP_2X_690771-MLB85247252367_052025-E-camiseta-unissex-do-trio-harry-potter-look-nerd-moderno.webp','2025-09-25 15:08:57'),
(21,83,'assets/D_Q_NP_2X_707978-MLB91362450011_082025-E-sueter-infantil-tricotado-com-ziper-para-criancas-de-primave.webp','2025-09-25 15:08:57'),
(22,69,'assets/D_Q_NP_2X_710668-MLB52801880135_122022-E-camiseta-naruto-kakashi-sensei-sharingan-kunai.webp','2025-09-25 15:08:57'),
(23,73,'assets/D_Q_NP_2X_779458-MLB84396400876_052025-E-camisa-giyu-tomioka-anime-demon-slayer-hashira-pilar-da-agua.webp','2025-09-25 15:08:57'),
(24,78,'assets/D_Q_NP_2X_805257-MLB75680716583_042024-E-blusa-de-frio-moletom-vinho-estampado-gorro-capuz-liso.webp','2025-09-25 15:08:57'),
(25,80,'assets/D_Q_NP_2X_810014-MLB84582252790_052025-E-camiseta-branca-unissex-100-algodo-premium-camisa-basica.webp','2025-09-25 15:08:57'),
(26,77,'assets/D_Q_NP_2X_832169-MLB82717708410_032025-E-blusa-moletom-canguru-liso-basico-premium-varias-cores.webp','2025-09-25 15:08:57'),
(27,67,'assets/D_Q_NP_2X_838242-MLB90276299886_082025-E-camiseta-consulado-do-rock-banda-metallica-master-of-puppets.webp','2025-09-25 15:08:57'),
(28,75,'assets/D_Q_NP_2X_859083-MLB86299170172_062025-E-kit-5-camisetas-basicas-masculina-dry-fit-lisa-tradicional.webp','2025-09-25 15:08:57'),
(29,70,'assets/D_Q_NP_2X_876188-MLB78667393617_082024-E-camiseta-iron-maiden-powerslave-1.webp','2025-09-25 15:08:57'),
(30,82,'assets/D_Q_NP_2X_889398-MLB92486373461_092025-E-camiseta-feminina-blusa-macia-gola-redonda-onca-animal-print.webp','2025-09-25 15:08:57'),
(31,86,'assets/D_Q_NP_2X_930437-MLB85254108653_052025-E-kit-2-tech-t-shirts-gola-u-masculino-insider.webp','2025-09-25 15:08:57'),
(32,74,'assets/D_Q_NP_2X_947242-MLB77185550408_072024-E-casaco-jaqueta-sarja-peluciada-masculina-capuz-removivel-314.webp','2025-09-25 15:08:57'),
(33,72,'assets/D_Q_NP_2X_953135-MLB78360199212_082024-E-camisa-camiseta-jujutsu-kaisen-megumi-fushiguro-1961.webp','2025-09-25 15:08:57'),
(34,68,'assets/D_Q_NP_2X_957457-MLB90079469448_082025-E-camiseta-de-rock-banda-kiss-rock-100-algodo.webp','2025-09-25 15:08:57'),
(35,79,'assets/D_Q_NP_2X_972568-MLB86232567931_062025-E-jaqueta-corta-vento-new-era-script-branca-p25002.webp','2025-09-25 15:08:57'),
(36,81,'assets/D_Q_NP_2X_974828-MLB51144158798_082022-E-camiseta-masculina-lisa-basica-100-algodo.webp','2025-09-25 15:08:57'),
(37,85,'assets/D_Q_NP_2X_990434-MLB92675017368_092025-E-blusa-de-frio-sueter-masculino-l-tricot-liso.webp','2025-09-25 15:08:57');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-09-25 13:01:30
