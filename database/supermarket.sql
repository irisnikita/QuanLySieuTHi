/*
 Navicat Premium Data Transfer

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 100408
 Source Host           : localhost:3306
 Source Schema         : mytestdb

 Target Server Type    : MySQL
 Target Server Version : 100408
 File Encoding         : 65001

 Date: 03/12/2019 12:25:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chucvu
-- ----------------------------
DROP TABLE IF EXISTS `chucvu`;
CREATE TABLE `chucvu`  (
  `id` int(10) NOT NULL,
  `tenchucvu` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of chucvu
-- ----------------------------
BEGIN;
INSERT INTO `chucvu` VALUES (1, 'Nhân viên bán hàng'), (2, 'Thủ Kho'), (3, 'Bộ phận quản lý');
COMMIT;

-- ----------------------------
-- Table structure for cthoadon
-- ----------------------------
DROP TABLE IF EXISTS `cthoadon`;
CREATE TABLE `cthoadon`  (
  `id` int(10) NOT NULL,
  `msmh` int(10) NULL DEFAULT NULL,
  `soluong` int(50) NULL DEFAULT NULL,
  `dongia` int(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_msmh_cthoadon`(`msmh`) USING BTREE,
  CONSTRAINT `fk_msmh_cthoadon` FOREIGN KEY (`msmh`) REFERENCES `mhang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for ctnhapkho
-- ----------------------------
DROP TABLE IF EXISTS `ctnhapkho`;
CREATE TABLE `ctnhapkho`  (
  `id` int(10) NOT NULL,
  `msmh` int(10) NULL DEFAULT NULL,
  `soluong` int(50) NULL DEFAULT NULL,
  `dongia` int(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_msmh_ctphieunhap`(`msmh`) USING BTREE,
  CONSTRAINT `fk_msmh_ctphieunhap` FOREIGN KEY (`msmh`) REFERENCES `mhang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for ctpdhang
-- ----------------------------
DROP TABLE IF EXISTS `ctpdhang`;
CREATE TABLE `ctpdhang`  (
  `id` int(10) NOT NULL,
  `msmh` int(10) NULL DEFAULT NULL,
  `soluong` int(50) NULL DEFAULT NULL,
  `dongia` int(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_msmh_ctpdhang`(`msmh`) USING BTREE,
  CONSTRAINT `fk_msmh_ctpdhang` FOREIGN KEY (`msmh`) REFERENCES `mhang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of ctpdhang
-- ----------------------------
BEGIN;
INSERT INTO `ctpdhang` VALUES (1, 3, 20, 50000);
COMMIT;

-- ----------------------------
-- Table structure for ctpghang
-- ----------------------------
DROP TABLE IF EXISTS `ctpghang`;
CREATE TABLE `ctpghang`  (
  `id` int(10) NOT NULL,
  `msmh` int(10) NULL DEFAULT NULL,
  `soluong` int(10) NULL DEFAULT NULL,
  `dongia` int(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_msmh_chitietphieugiaohnag`(`msmh`) USING BTREE,
  CONSTRAINT `fk_msmh_chitietphieugiaohnag` FOREIGN KEY (`msmh`) REFERENCES `mhang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for ctphieugiaoca
-- ----------------------------
DROP TABLE IF EXISTS `ctphieugiaoca`;
CREATE TABLE `ctphieugiaoca`  (
  `id` int(10) NOT NULL,
  `msmh` int(10) NULL DEFAULT NULL,
  `soluong` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_msmh_ctphieugiaoca`(`msmh`) USING BTREE,
  CONSTRAINT `fk_msmh_ctphieugiaoca` FOREIGN KEY (`msmh`) REFERENCES `phieugiaoca` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for ctxuatkho
-- ----------------------------
DROP TABLE IF EXISTS `ctxuatkho`;
CREATE TABLE `ctxuatkho`  (
  `id` int(10) NOT NULL,
  `msmh` int(10) NULL DEFAULT NULL,
  `soluong` int(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_msmh_ctxuatkho`(`msmh`) USING BTREE,
  CONSTRAINT `fk_msmh_ctxuatkho` FOREIGN KEY (`msmh`) REFERENCES `mhang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for hoadon
-- ----------------------------
DROP TABLE IF EXISTS `hoadon`;
CREATE TABLE `hoadon`  (
  `id` int(10) NOT NULL,
  `ngaylap` date NULL DEFAULT NULL,
  `tongtgia` int(11) NULL DEFAULT NULL,
  `tenmh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `msnv` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_msnv_hoadon`(`msnv`) USING BTREE,
  CONSTRAINT `fk_msnv_hoadon` FOREIGN KEY (`msnv`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for khachhtt
-- ----------------------------
DROP TABLE IF EXISTS `khachhtt`;
CREATE TABLE `khachhtt`  (
  `id` int(10) NOT NULL,
  `tenkh` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `diachi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sdt` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mshd` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_mshd_khahhtt`(`mshd`) USING BTREE,
  CONSTRAINT `fk_mshd_khahhtt` FOREIGN KEY (`mshd`) REFERENCES `hoadon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of khachhtt
-- ----------------------------
BEGIN;
INSERT INTO `khachhtt` VALUES (2, 'Lê Văn Tám', '11/3 Cô Ba Sài Gòn', '0902909021', NULL), (3, 'Anh Hùng Mobileưqw', '11/2 Lữ Gia Thành Phố', '0989893829', NULL);
COMMIT;

-- ----------------------------
-- Table structure for khohang
-- ----------------------------
DROP TABLE IF EXISTS `khohang`;
CREATE TABLE `khohang`  (
  `id` int(10) NOT NULL,
  `tenkho` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `diachi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for mhang
-- ----------------------------
DROP TABLE IF EXISTS `mhang`;
CREATE TABLE `mhang`  (
  `maquay` int(10) NULL DEFAULT NULL,
  `id` int(10) NOT NULL,
  `tenmh` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `loaimh` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dvt` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `soluong` int(50) NULL DEFAULT NULL,
  `dongia` int(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_maquay`(`maquay`) USING BTREE,
  CONSTRAINT `fk_maquay` FOREIGN KEY (`maquay`) REFERENCES `quayhang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of mhang
-- ----------------------------
BEGIN;
INSERT INTO `mhang` VALUES (NULL, 1, 'Nước ngọt cỡ lớn pepsi', 'Đồ Uống', 'chai', 12, 12000), (NULL, 2, 'Bột giặt omo', 'Gia dụng', 'chai', 20, 200000), (NULL, 3, 'Hộp cafe nestViet', 'Đồ Uống', 'hộp', 50, 50000);
COMMIT;

-- ----------------------------
-- Table structure for ncc
-- ----------------------------
DROP TABLE IF EXISTS `ncc`;
CREATE TABLE `ncc`  (
  `id` int(10) NOT NULL,
  `tenncc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `diachi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sdt` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of ncc
-- ----------------------------
BEGIN;
INSERT INTO `ncc` VALUES (1, 'Công ty bột giặt omo matic ver 2', '11 omo matic le 3', '0979898987'), (2, 'Công ty nước ngọt cocacola', '11 coca co la cr', '0989890987'), (3, 'Công ty ép dẻo công nghệ cao', '11/2 Trần Duy hưng Hà Nội2', '0989878789'), (23, 'Phụng Hưng', '11/8 Lữ Gia', '0989829818');
COMMIT;

-- ----------------------------
-- Table structure for nhanvien
-- ----------------------------
DROP TABLE IF EXISTS `nhanvien`;
CREATE TABLE `nhanvien`  (
  `msnv` int(20) NULL DEFAULT NULL,
  `tennv` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  `phone` int(10) NULL DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id` int(10) NOT NULL,
  `machucvu` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_machucvu`(`machucvu`) USING BTREE,
  CONSTRAINT `fk_machucvu` FOREIGN KEY (`machucvu`) REFERENCES `chucvu` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of nhanvien
-- ----------------------------
BEGIN;
INSERT INTO `nhanvien` VALUES (NULL, 'Nguyễn Đức Hùng', '1999-02-02', 989829822, '11/8 Lữ Gia p9 Đà lạt Lâm Đồng', 2, 2), (NULL, 'Nguyễn Hùng Thư', '1999-12-22', 989827821, '11/9 Lữ Gia p 9 Ngiu', 3, 2), (NULL, 'Nguyễn Ca Lân', '1999-12-21', 979287832, '11/8 Lữ Gia p9 Đà lạt Lâm Đồng', 4, 3), (NULL, 'Nguyễn Luân', '1999-09-09', 989898767, '1/9 Lữ Gia 09 Đà Lạt', 7, 2), (NULL, 'Hùng Thư Tiu', '2019-02-22', 989876762, '98/2 Hùng Phan ', 20, 3), (NULL, 'Melr La Ta', '1999-12-02', 989837812, '11/8 Lữ Nư tứ', 23, 1);
COMMIT;

-- ----------------------------
-- Table structure for nhapkho
-- ----------------------------
DROP TABLE IF EXISTS `nhapkho`;
CREATE TABLE `nhapkho`  (
  `id` int(10) NOT NULL,
  `ngaynhap` date NULL DEFAULT NULL,
  `tongtrigia` int(50) NULL DEFAULT NULL,
  `mskho` int(10) NULL DEFAULT NULL,
  `msncc` int(10) NULL DEFAULT NULL,
  `msnv` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_mskho_nhapkho`(`mskho`) USING BTREE,
  INDEX `fk_msnv_nhapkho`(`msnv`) USING BTREE,
  INDEX `fk_msncc_nhapkho`(`msncc`) USING BTREE,
  CONSTRAINT `fk_mskho_nhapkho` FOREIGN KEY (`mskho`) REFERENCES `khohang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_msncc_nhapkho` FOREIGN KEY (`msncc`) REFERENCES `ncc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_msnv_nhapkho` FOREIGN KEY (`msnv`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for pdhang
-- ----------------------------
DROP TABLE IF EXISTS `pdhang`;
CREATE TABLE `pdhang`  (
  `id` int(10) NOT NULL,
  `ngaydh` date NULL DEFAULT NULL,
  `dcnhan` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sdtnhan` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `msnv` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_msnv_pdhang`(`msnv`) USING BTREE,
  CONSTRAINT `fk_msnv_pdhang` FOREIGN KEY (`msnv`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for pghang
-- ----------------------------
DROP TABLE IF EXISTS `pghang`;
CREATE TABLE `pghang`  (
  `id` int(10) NOT NULL,
  `ngaygiao` date NULL DEFAULT NULL,
  `dcgiao` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sdtgiao` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `thanhtien` int(11) NULL DEFAULT NULL,
  `msnv` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_msnv_pghang`(`msnv`) USING BTREE,
  CONSTRAINT `fk_msnv_pghang` FOREIGN KEY (`msnv`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for phieugiaoca
-- ----------------------------
DROP TABLE IF EXISTS `phieugiaoca`;
CREATE TABLE `phieugiaoca`  (
  `id` int(10) NOT NULL,
  `ngay` date NULL DEFAULT NULL,
  `ca` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `maquay` int(10) NULL DEFAULT NULL,
  `msnv` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_maquay_phieugiaoca`(`maquay`) USING BTREE,
  INDEX `fk_msnv_phieugiaoca`(`msnv`) USING BTREE,
  CONSTRAINT `fk_maquay_phieugiaoca` FOREIGN KEY (`maquay`) REFERENCES `quayhang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_msnv_phieugiaoca` FOREIGN KEY (`msnv`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for pkk
-- ----------------------------
DROP TABLE IF EXISTS `pkk`;
CREATE TABLE `pkk`  (
  `id` int(10) NOT NULL,
  `ngaylap` date NULL DEFAULT NULL,
  `tenmh` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `soluong` int(11) NULL DEFAULT NULL,
  `msnv` int(10) NULL DEFAULT NULL,
  `mskho` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_msnv_pkk`(`msnv`) USING BTREE,
  INDEX `fk_mskho_pkk`(`mskho`) USING BTREE,
  CONSTRAINT `fk_mskho_pkk` FOREIGN KEY (`mskho`) REFERENCES `khohang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_msnv_pkk` FOREIGN KEY (`msnv`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for quayhang
-- ----------------------------
DROP TABLE IF EXISTS `quayhang`;
CREATE TABLE `quayhang`  (
  `id` int(10) NOT NULL,
  `tenquay` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for quaythungan
-- ----------------------------
DROP TABLE IF EXISTS `quaythungan`;
CREATE TABLE `quaythungan`  (
  `id` int(10) NOT NULL,
  `tenqtn` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mshd` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_mshd_quaythungan`(`mshd`) USING BTREE,
  CONSTRAINT `fk_mshd_quaythungan` FOREIGN KEY (`mshd`) REFERENCES `hoadon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameUser` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `passwordUser` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isLogin` tinyint(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'truongvi', '123456', 'nltruongvi@gmail.com', 1), (2, 'NguyenCa', '1234567', NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for xuatkho
-- ----------------------------
DROP TABLE IF EXISTS `xuatkho`;
CREATE TABLE `xuatkho`  (
  `id` int(10) NOT NULL,
  `ngayxuat` date NULL DEFAULT NULL,
  `tongtgia` int(11) NULL DEFAULT NULL,
  `mskho` int(10) NULL DEFAULT NULL,
  `msnv` int(10) NULL DEFAULT NULL,
  `maquay` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_masokho_xuatkho`(`mskho`) USING BTREE,
  INDEX `fk_masonhanvien_xuatkho`(`msnv`) USING BTREE,
  INDEX `fk_maquay_xuatkho`(`maquay`) USING BTREE,
  CONSTRAINT `fk_maquay_xuatkho` FOREIGN KEY (`maquay`) REFERENCES `quayhang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_masokho_xuatkho` FOREIGN KEY (`mskho`) REFERENCES `khohang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_masonhanvien_xuatkho` FOREIGN KEY (`msnv`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
