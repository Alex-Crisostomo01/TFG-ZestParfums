-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: perfumeria_recio
-- ------------------------------------------------------
-- Server version	8.0.45




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
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id_carrito` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_carrito`),
  UNIQUE KEY `uq_carrito_usuario` (`id_usuario`),
  CONSTRAINT `fk_carrito_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles_pedido`
--

DROP TABLE IF EXISTS `detalles_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_pedido` (
  `id_detalle` int unsigned NOT NULL AUTO_INCREMENT,
  `id_pedido` int unsigned NOT NULL,
  `id_perfume` int unsigned NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_detalle_pedido` (`id_pedido`),
  KEY `fk_detalle_perfume` (`id_perfume`),
  CONSTRAINT `fk_detalle_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detalle_perfume` FOREIGN KEY (`id_perfume`) REFERENCES `perfumes` (`id_perfume`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_detalle_cantidad` CHECK ((`cantidad` > 0)),
  CONSTRAINT `chk_detalle_precio` CHECK ((`precio_unitario` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_pedido`
--

LOCK TABLES `detalles_pedido` WRITE;
/*!40000 ALTER TABLE `detalles_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalles_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones_envio`
--

DROP TABLE IF EXISTS `direcciones_envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones_envio` (
  `id_direccion` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `nombre_destinatario` varchar(100) NOT NULL,
  `telefono_contacto` varchar(20) DEFAULT NULL,
  `calle` varchar(150) NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `codigo_postal` varchar(10) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `principal` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_direccion`),
  KEY `fk_direccion_usuario` (`id_usuario`),
  CONSTRAINT `fk_direccion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones_envio`
--

LOCK TABLES `direcciones_envio` WRITE;
/*!40000 ALTER TABLE `direcciones_envio` DISABLE KEYS */;
/*!40000 ALTER TABLE `direcciones_envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_carrito`
--

DROP TABLE IF EXISTS `items_carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_carrito` (
  `id_item_carrito` int unsigned NOT NULL AUTO_INCREMENT,
  `id_carrito` int unsigned NOT NULL,
  `id_perfume` int unsigned NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id_item_carrito`),
  UNIQUE KEY `uq_carrito_perfume` (`id_carrito`,`id_perfume`),
  KEY `fk_item_carrito_perfume` (`id_perfume`),
  CONSTRAINT `fk_item_carrito_carrito` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id_carrito`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_item_carrito_perfume` FOREIGN KEY (`id_perfume`) REFERENCES `perfumes` (`id_perfume`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_item_carrito_cantidad` CHECK ((`cantidad` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_carrito`
--

LOCK TABLES `items_carrito` WRITE;
/*!40000 ALTER TABLE `items_carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `items_carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id_marca` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `pais_origen` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_marca`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id_pago` int unsigned NOT NULL AUTO_INCREMENT,
  `id_pedido` int unsigned NOT NULL,
  `metodo_pago` enum('tarjeta','paypal','transferencia','contrareembolso') NOT NULL,
  `fecha_pago` datetime DEFAULT NULL,
  `estado_pago` enum('pendiente','completado','fallido','reembolsado') NOT NULL DEFAULT 'pendiente',
  `monto` decimal(10,2) NOT NULL,
  `referencia_externa` varchar(100) DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`id_pago`),
  KEY `fk_pago_pedido` (`id_pedido`),
  CONSTRAINT `fk_pago_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_pago_monto` CHECK ((`monto` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedido` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `id_direccion` int unsigned NOT NULL,
  `fecha_pedido` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('pendiente','pagado','enviado','entregado','cancelado','devuelto') NOT NULL DEFAULT 'pendiente',
  `total` decimal(10,2) NOT NULL,
  `observaciones` text,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedido_usuario` (`id_usuario`),
  KEY `fk_pedido_direccion` (`id_direccion`),
  CONSTRAINT `fk_pedido_direccion` FOREIGN KEY (`id_direccion`) REFERENCES `direcciones_envio` (`id_direccion`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_pedido_total` CHECK ((`total` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfumes`
--

DROP TABLE IF EXISTS `perfumes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfumes` (
  `id_perfume` int unsigned NOT NULL AUTO_INCREMENT,
  `id_marca` int unsigned NOT NULL,
  `id_categoria` int unsigned NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_perfume`),
  KEY `fk_perfume_marca` (`id_marca`),
  KEY `fk_perfume_categoria` (`id_categoria`),
  CONSTRAINT `fk_perfume_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_perfume_marca` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id_marca`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_perfume_precio` CHECK ((`precio` >= 0)),
  CONSTRAINT `chk_perfume_stock` CHECK ((`stock` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfumes`
--

LOCK TABLES `perfumes` WRITE;
/*!40000 ALTER TABLE `perfumes` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfumes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `es_admin` tinyint(1) NOT NULL DEFAULT '0',
  `estado` enum('activo','bloqueado') NOT NULL DEFAULT 'activo',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Cristian Sanz','cristian@example.com','hash_password_1','600111111','2026-03-01 10:00:00',1,'activo');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-25 17:50:40
INSERT INTO marcas (id_marca, nombre, activo) 
VALUES (1, 'Chanel', 1);

INSERT INTO categorias (id_categoria, nombre, activo) 
VALUES (1, 'Especial Verano', 1);

INSERT INTO perfumes (id_marca, id_categoria, nombre, precio, stock, activo) 
VALUES (1, 1, 'Chanel Nº5', 120.50, 5, 1);

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE perfumes;
TRUNCATE TABLE marcas;
TRUNCATE TABLE categorias;

SET FOREIGN_KEY_CHECKS = 1;

START TRANSACTION;

-- 1) MARCAS (10)
INSERT INTO marcas (id_marca, nombre, pais_origen) VALUES
(1, 'Dior', 'Francia'),
(2, 'Chanel', 'Francia'),
(3, 'Giorgio Armani', 'Italia'),
(4, 'Yves Saint Laurent', 'Francia'),
(5, 'Paco Rabanne', 'España'),
(6, 'Jean Paul Gaultier', 'Francia'),
(7, 'Versace', 'Italia'),
(8, 'Calvin Klein', 'Estados Unidos'),
(9, 'Carolina Herrera', 'Venezuela'),
(10, 'Tom Ford', 'Estados Unidos');

-- 2) CATEGORIAS (5)
INSERT INTO categorias (id_categoria, nombre) VALUES
(1, 'Amaderado'),
(2, 'Fresco'),
(3, 'Oriental'),
(4, 'Floral'),
(5, 'Aromatico');

-- 3) PERFUMES (15)
INSERT INTO perfumes
(id_perfume, id_marca, id_categoria, nombre, descripcion, precio, stock, activo)
VALUES
-- Dior
(1, 1, 1, 'Dior Sauvage',
 'Fragancia masculina de caracter fresco y amaderado',
 89.90, 50, 1),

(2, 1, 3, 'Dior Homme Intense',
 'Perfume elegante con notas intensas y sofisticadas',
 109.90, 30, 1),

-- Chanel
(3, 2, 4, 'Chanel N°5',
 'Fragancia floral iconica de estilo clasico',
 124.90, 25, 1),

(4, 2, 5, 'Bleu de Chanel',
 'Perfume aromatico fresco con fondo amaderado',
 112.00, 40, 1),

-- Giorgio Armani
(5, 3, 2, 'Acqua di Gio',
 'Fragancia fresca inspirada en el mar Mediterraneo',
 84.90, 60, 1),

-- Yves Saint Laurent
(6, 4, 3, 'YSL Black Opium',
 'Perfume oriental con notas dulces e intensas',
 98.50, 35, 1),

(7, 4, 5, 'Y Eau de Parfum',
 'Fragancia aromatica moderna y equilibrada',
 92.00, 45, 1),

-- Paco Rabanne
(8, 5, 3, '1 Million',
 'Perfume oriental especiado con caracter intenso',
 88.00, 55, 1),

(9, 5, 1, 'Invictus',
 'Fragancia fresca y amaderada de espiritu deportivo',
 86.90, 50, 1),

-- Jean Paul Gaultier
(10, 6, 3, 'Le Male',
 'Perfume oriental aromatico con toques dulces',
 82.00, 40, 1),

-- Versace
(11, 7, 1, 'Versace Eros',
 'Fragancia amaderada intensa y juvenil',
 79.90, 45, 1),

-- Calvin Klein
(12, 8, 2, 'CK One',
 'Perfume fresco unisex de estilo limpio',
 59.90, 70, 1),

-- Carolina Herrera
(13, 9, 3, 'Good Girl',
 'Fragancia oriental dulce con notas contrastadas',
 99.90, 30, 1),

-- Tom Ford (2 perfumes)
(14, 10, 1, 'Tom Ford Oud Wood',
 'Perfume amaderado exclusivo con notas profundas',
 179.00, 20, 1),

(15, 10, 3, 'Tom Ford Black Orchid',
 'Fragancia intensa y oscura con perfil oriental sofisticado',
 164.00, 18, 1);

COMMIT;

SELECT p.id_perfume, p.nombre, m.nombre AS marca, c.nombre AS categoria, p.precio, p.stock
FROM perfumes p
JOIN marcas m ON p.id_marca = m.id_marca
JOIN categorias c ON p.id_categoria = c.id_categoria
ORDER BY p.id_perfume;

select * from perfumes;

UPDATE perfumes 
SET imagen_url = 'acquaDiGio.jpg' 
WHERE id_perfume = 5;
