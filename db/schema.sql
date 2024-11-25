-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: citavet
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `IdCita` bigint unsigned NOT NULL AUTO_INCREMENT,
  `FechaHora` datetime NOT NULL,
  `IdCliente` bigint unsigned NOT NULL,
  `IdMascota` bigint unsigned NOT NULL,
  `IdServicio` bigint unsigned NOT NULL,
  `Estado` enum('Pendiente','Completado') NOT NULL DEFAULT 'Pendiente',
  `NotasCliente` text,
  PRIMARY KEY (`IdCita`),
  UNIQUE KEY `IdCita` (`IdCita`),
  UNIQUE KEY `IdServicio` (`IdServicio`),
  KEY `IdCliente` (`IdCliente`),
  KEY `IdMascota` (`IdMascota`),
  CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`IdCliente`) REFERENCES `clientes` (`IdCliente`),
  CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`IdMascota`) REFERENCES `mascotas` (`IdMascota`),
  CONSTRAINT `FK_Citas_Servicios` FOREIGN KEY (`IdServicio`) REFERENCES `servicios` (`IdServicio`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (2,'2024-11-25 10:00:00',1,4,1,'Completado',NULL),(3,'2024-11-26 15:30:00',1,5,2,'Completado',NULL),(5,'2024-11-28 11:00:00',1,4,3,'Pendiente','nota ejemplo 1');
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `IdCliente` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `IdUsuario` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdCliente`),
  UNIQUE KEY `IdCliente` (`IdCliente`),
  KEY `FK_Clientes_Usuarios` (`IdUsuario`),
  CONSTRAINT `FK_Clientes_Usuarios` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Cliente 1','Calle Ejemplo 123','555123456','cliente1@example.com',2),(2,'Cliente 2','Avenida Prueba 456','555654321','cliente2@example.com',6);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultasmedicas`
--

DROP TABLE IF EXISTS `consultasmedicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultasmedicas` (
  `IdConsulta` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Fecha` date DEFAULT NULL,
  `Diagnostico` text,
  `Tratamiento` text,
  `IdVeterinario` bigint unsigned DEFAULT NULL,
  `IdMascota` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdConsulta`),
  UNIQUE KEY `IdConsulta` (`IdConsulta`),
  KEY `IdVeterinario` (`IdVeterinario`),
  KEY `IdMascota` (`IdMascota`),
  CONSTRAINT `consultasmedicas_ibfk_1` FOREIGN KEY (`IdVeterinario`) REFERENCES `veterinarios` (`IdVeterinario`),
  CONSTRAINT `consultasmedicas_ibfk_2` FOREIGN KEY (`IdMascota`) REFERENCES `mascotas` (`IdMascota`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultasmedicas`
--

LOCK TABLES `consultasmedicas` WRITE;
/*!40000 ALTER TABLE `consultasmedicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultasmedicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallesfactura`
--

DROP TABLE IF EXISTS `detallesfactura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallesfactura` (
  `IdDetalle` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Cantidad` int DEFAULT NULL,
  `PrecioUnitario` decimal(10,2) DEFAULT NULL,
  `Subtotal` decimal(10,2) DEFAULT NULL,
  `IdFactura` bigint unsigned DEFAULT NULL,
  `IdProducto` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdDetalle`),
  UNIQUE KEY `IdDetalle` (`IdDetalle`),
  KEY `IdFactura` (`IdFactura`),
  KEY `IdProducto` (`IdProducto`),
  CONSTRAINT `detallesfactura_ibfk_1` FOREIGN KEY (`IdFactura`) REFERENCES `facturas` (`IdFactura`),
  CONSTRAINT `detallesfactura_ibfk_2` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`IdProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallesfactura`
--

LOCK TABLES `detallesfactura` WRITE;
/*!40000 ALTER TABLE `detallesfactura` DISABLE KEYS */;
/*!40000 ALTER TABLE `detallesfactura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `IdFactura` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Fecha` date DEFAULT NULL,
  `MontoTotal` decimal(10,2) DEFAULT NULL,
  `MetodoPago` varchar(50) DEFAULT NULL,
  `IdCliente` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdFactura`),
  UNIQUE KEY `IdFactura` (`IdFactura`),
  KEY `IdCliente` (`IdCliente`),
  CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`IdCliente`) REFERENCES `clientes` (`IdCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialmedico`
--

DROP TABLE IF EXISTS `historialmedico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialmedico` (
  `IdHistorial` bigint unsigned NOT NULL AUTO_INCREMENT,
  `FechaInicio` date DEFAULT NULL,
  `IdMascota` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdHistorial`),
  UNIQUE KEY `IdHistorial` (`IdHistorial`),
  KEY `IdMascota` (`IdMascota`),
  CONSTRAINT `historialmedico_ibfk_1` FOREIGN KEY (`IdMascota`) REFERENCES `mascotas` (`IdMascota`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialmedico`
--

LOCK TABLES `historialmedico` WRITE;
/*!40000 ALTER TABLE `historialmedico` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialmedico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mascotas`
--

DROP TABLE IF EXISTS `mascotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mascotas` (
  `IdMascota` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Tipo` enum('Perro','Gato') NOT NULL,
  `Raza` varchar(30) DEFAULT NULL,
  `IdCliente` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdMascota`),
  UNIQUE KEY `IdMascota` (`IdMascota`),
  KEY `IdCliente` (`IdCliente`),
  CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`IdCliente`) REFERENCES `clientes` (`IdCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mascotas`
--

LOCK TABLES `mascotas` WRITE;
/*!40000 ALTER TABLE `mascotas` DISABLE KEYS */;
INSERT INTO `mascotas` VALUES (4,'Firulais','Perro','Labrador',1),(5,'Michi','Perro','Siames',1);
/*!40000 ALTER TABLE `mascotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personaldelivery`
--

DROP TABLE IF EXISTS `personaldelivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personaldelivery` (
  `IdPersonalDelivery` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `IdUsuario` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdPersonalDelivery`),
  UNIQUE KEY `IdPersonalDelivery` (`IdPersonalDelivery`),
  KEY `FK_PersonalDelivery_Usuarios` (`IdUsuario`),
  CONSTRAINT `FK_PersonalDelivery_Usuarios` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personaldelivery`
--

LOCK TABLES `personaldelivery` WRITE;
/*!40000 ALTER TABLE `personaldelivery` DISABLE KEYS */;
/*!40000 ALTER TABLE `personaldelivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `IdProducto` bigint unsigned NOT NULL AUTO_INCREMENT,
  `NombreProducto` varchar(50) DEFAULT NULL,
  `TipoProducto` varchar(50) DEFAULT NULL,
  `Precio` decimal(10,2) DEFAULT NULL,
  `Stock` int DEFAULT NULL,
  PRIMARY KEY (`IdProducto`),
  UNIQUE KEY `IdProducto` (`IdProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recepcionistas`
--

DROP TABLE IF EXISTS `recepcionistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recepcionistas` (
  `IdRecepcionista` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `IdUsuario` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdRecepcionista`),
  KEY `FK_Recepcionistas_Usuarios` (`IdUsuario`),
  CONSTRAINT `FK_Recepcionistas_Usuarios` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recepcionistas`
--

LOCK TABLES `recepcionistas` WRITE;
/*!40000 ALTER TABLE `recepcionistas` DISABLE KEYS */;
/*!40000 ALTER TABLE `recepcionistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `IdServicio` bigint unsigned NOT NULL AUTO_INCREMENT,
  `NombreServicio` varchar(50) DEFAULT NULL,
  `Descripcion` text,
  `Precio` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`IdServicio`),
  UNIQUE KEY `IdServicio` (`IdServicio`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Consulta General','Revisión general de la mascota',300.00),(2,'Vacunación','Aplicación de vacunas para la mascota',500.00),(3,'Baño','Servicio de baño y limpieza de la mascota',200.00),(4,'Desparasitacion','Eliminación de parásitos internos y externos',400.00),(5,'Cirugía','Procedimientos quirúrgicos para la mascota',2500.00);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportes`
--

DROP TABLE IF EXISTS `transportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportes` (
  `IdTransporte` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Fecha` date DEFAULT NULL,
  `DireccionRecogida` varchar(100) DEFAULT NULL,
  `DireccionEntrega` varchar(100) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `IdPersonalDelivery` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdTransporte`),
  UNIQUE KEY `IdTransporte` (`IdTransporte`),
  KEY `IdPersonalDelivery` (`IdPersonalDelivery`),
  CONSTRAINT `transportes_ibfk_1` FOREIGN KEY (`IdPersonalDelivery`) REFERENCES `personaldelivery` (`IdPersonalDelivery`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportes`
--

LOCK TABLES `transportes` WRITE;
/*!40000 ALTER TABLE `transportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `transportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `IdUsuario` bigint unsigned NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(50) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Tipo` enum('Recepcionista','Cliente','Veterinario','PersonalDelivery','Administrador') NOT NULL,
  PRIMARY KEY (`IdUsuario`),
  UNIQUE KEY `IdUsuario` (`IdUsuario`),
  UNIQUE KEY `NombreUsuario` (`NombreUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'recepcionista1','1234','Recepcionista'),(2,'cliente1','1234','Cliente'),(3,'veterinario1','1234','Veterinario'),(4,'delivery1','1234','PersonalDelivery'),(5,'admin1','1234','Administrador'),(6,'cliente2','1234','Cliente');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacunas`
--

DROP TABLE IF EXISTS `vacunas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacunas` (
  `IdVacuna` bigint unsigned NOT NULL AUTO_INCREMENT,
  `TipoVacuna` varchar(50) DEFAULT NULL,
  `FechaAdministracion` date DEFAULT NULL,
  `IdMascota` bigint unsigned DEFAULT NULL,
  `IdVeterinario` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdVacuna`),
  UNIQUE KEY `IdVacuna` (`IdVacuna`),
  KEY `IdMascota` (`IdMascota`),
  KEY `IdVeterinario` (`IdVeterinario`),
  CONSTRAINT `vacunas_ibfk_1` FOREIGN KEY (`IdMascota`) REFERENCES `mascotas` (`IdMascota`),
  CONSTRAINT `vacunas_ibfk_2` FOREIGN KEY (`IdVeterinario`) REFERENCES `veterinarios` (`IdVeterinario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacunas`
--

LOCK TABLES `vacunas` WRITE;
/*!40000 ALTER TABLE `vacunas` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacunas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veterinarios`
--

DROP TABLE IF EXISTS `veterinarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinarios` (
  `IdVeterinario` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Especialidad` varchar(50) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `IdUsuario` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`IdVeterinario`),
  UNIQUE KEY `IdVeterinario` (`IdVeterinario`),
  KEY `FK_Veterinarios_Usuarios` (`IdUsuario`),
  CONSTRAINT `FK_Veterinarios_Usuarios` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veterinarios`
--

LOCK TABLES `veterinarios` WRITE;
/*!40000 ALTER TABLE `veterinarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `veterinarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'citavet'
--

--
-- Dumping routines for database 'citavet'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 17:17:42
