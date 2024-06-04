-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 30 Apr 2024 pada 16.48
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `persediaan_barang`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `map_role_permission`
--

CREATE TABLE `map_role_permission` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `map_role_permission`
--

INSERT INTO `map_role_permission` (`id`, `role_id`, `permission_id`, `created_at`, `created_by`) VALUES
(244, 1, 1, '2024-04-24 08:22:19', NULL),
(245, 1, 2, '2024-04-24 08:22:19', NULL),
(246, 1, 3, '2024-04-24 08:22:19', NULL),
(247, 2, 2, '2024-04-24 08:22:19', NULL),
(248, 2, 3, '2024-04-24 08:22:19', NULL),
(249, 3, 3, '2024-04-24 13:05:49', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `mst_user`
--

CREATE TABLE `mst_user` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mst_user`
--

INSERT INTO `mst_user` (`id`, `role_id`, `username`, `name`, `password`) VALUES
(1, 1, 'Admin', 'Superadmin', NULL),
(2, 2, 'Head', 'Head of Division', NULL),
(3, 3, 'Vendor', 'Product Vendor', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `mst_user_permission`
--

CREATE TABLE `mst_user_permission` (
  `id` int(11) NOT NULL,
  `code` varchar(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `detail` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mst_user_permission`
--

INSERT INTO `mst_user_permission` (`id`, `code`, `detail`) VALUES
(1, 'MSTR-CRUD', NULL),
(2, 'CONT-ADD', NULL),
(3, 'CONT-READ', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `mst_user_role`
--

CREATE TABLE `mst_user_role` (
  `id` int(11) NOT NULL,
  `role_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `detail` varchar(512) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mst_user_role`
--

INSERT INTO `mst_user_role` (`id`, `role_name`, `detail`) VALUES
(1, 'BUMN', NULL),
(2, 'PIMPINAN', NULL),
(3, 'VENDOR', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pencatatan`
--

CREATE TABLE `pencatatan` (
  `id` int(11) NOT NULL,
  `tanggal` varchar(50) NOT NULL,
  `uraian` varchar(255) NOT NULL,
  `barang_masuk` int(11) DEFAULT 0,
  `barang_keluar` int(11) DEFAULT 0,
  `product_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pencatatan`
--

INSERT INTO `pencatatan` (`id`, `tanggal`, `uraian`, `barang_masuk`, `barang_keluar`, `product_id`) VALUES
(1, '1', 'dwd', 1, 0, '1'),
(2, '2024-04-15', 'asfa2', 31, 1, '7'),
(3, '2024-04-15', 'svvvvvvvvvvda', 3, 1, '7'),
(4, '2024-04-25', 'sdadwq', 12, 5, '14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(100) DEFAULT NULL,
  `jumlah` varchar(50) DEFAULT NULL,
  `satuan` varchar(50) DEFAULT NULL,
  `harga` varchar(16) DEFAULT NULL,
  `vendor` varchar(100) DEFAULT NULL,
  `no_telp` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `nama_barang`, `jumlah`, `satuan`, `harga`, `vendor`, `no_telp`) VALUES
(2, 'Paperone F4 75 gr', '1', 'Ream', '41290', 'PT. DATA SCRIP', '021-6544515'),
(3, 'Paperone F4 80 gr', '1', 'Ream', '45570', 'PT. DATA SCRIP', '021-6544515'),
(4, 'Paperone A4 75 gr', '1', 'Ream', '36300', 'PT. DATA SCRIP', '021-6544515'),
(5, 'Paperone A4 80 gr', '1', 'Ream', '40070', 'PT. DATA SCRIP', '021-6544515'),
(6, 'Paperone Q4 75 gr', '1', 'Ream', '35120', 'PT. DATA SCRIP', '021-6544515'),
(7, 'Paperone Q4 80 gr', '1', 'Ream', '38750', 'PT. DATA SCRIP', '021-6544515'),
(8, 'Paperone Q4 80 gr (Carbon Neutral)', '1', 'Ream', '40070', 'PT. DATA SCRIP', '021-6544515'),
(9, 'Paperone A3 75 gr', '1', 'Ream', '72600', 'PT. DATA SCRIP', '021-6544515'),
(10, 'Paperone A3 80 gr', '1', 'Ream', '80120', 'PT. DATA SCRIP', '021-6544515'),
(11, 'Amplop Surat Coklat Folio (F4)', '1', 'Pack', '76590', 'PT. Fatma Jaya Cipta Media', '7226961'),
(12, 'Amplop Surat Coklat Sedang', '1', 'Pack', '71595', 'PT. Fatma Jaya Cipta Media', '7226961'),
(13, 'Amplop Surat Putih Standard (Kaca)', '1', 'Pack', '74370', 'PT. Fatma Jaya Cipta Media', '7226961'),
(14, 'Amplop Surat Putih Standard (Kabinet)', '1', 'Pack', '69930', 'PT. Fatma Jaya Cipta Media', '7226961'),
(15, 'Kop Surat Folio (F4)', '1', 'Pack', '116550', 'PT. Fatma Jaya Cipta Media', '7226961'),
(16, 'Kop Surat Folio (F4) R-2', '1', 'Pack', '43290', 'PT. Fatma Jaya Cipta Media', '7226961'),
(17, 'Kop Surat Kwarto ( A4)', '1', 'Pack', '107670', 'PT. Fatma Jaya Cipta Media', '7226961'),
(18, 'Kop Surat Kwarto (A4) R-3', '1', 'Pack', '53280', 'PT. Fatma Jaya Cipta Media', '7226961'),
(19, 'Kop Surat Kwarto (A4) Sambungan - KB', '1', 'Pack', '105450', 'PT. Fatma Jaya Cipta Media', '7226961'),
(20, 'Amplop Uang Besar', '1', 'Pack', '122100', 'PT. Fatma Jaya Cipta Media', '7226961'),
(21, 'Amplop Uang Sedang', '1', 'Pack', '83250', 'PT. Fatma Jaya Cipta Media', '7226961'),
(22, 'Kop Nota Intern - KB', '1', 'Pack', '107670', 'PT. Fatma Jaya Cipta Media', '7226961'),
(23, 'Kop Memo - KB', '1', 'Pack', '107670', 'PT. Fatma Jaya Cipta Media', '7226961'),
(24, 'Kop Surat Folio (F4) - KB', '1', 'Pack', '116550', 'PT. Fatma Jaya Cipta Media', '7226961'),
(25, 'Cover Deposito', '1', 'Pack', '288600', 'PT. Fatma Jaya Cipta Media', '7226961'),
(26, 'Map BNI', '1', 'pcs', '5217', 'PT. Fatma Jaya Cipta Media', '7226961'),
(27, 'Kop Surat Direksi Hal 1', '1', 'pcs', '222000', 'PT. Fatma Jaya Cipta Media', '7226961'),
(28, 'Kop Surat Direksi Hal 2', '1', 'pcs', '222000', 'PT. Fatma Jaya Cipta Media', '7226961'),
(29, 'Acco Plastik', '1', 'Box', '9500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(30, 'Ballpoint Faster (tidak pakai tutup-hitam)', '1', 'pcs', '3100', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(31, 'Ballpoint Faster (tidak pakai tutup-biru)', '1', 'pcs', '3100', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(32, 'Ballpoint Faster (pakai tutup-biru)', '1', 'pcs', '2500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(33, 'Ballpoint Faster (pakai tutup-hitam)', '1', 'pcs', '2500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(34, 'Ballpoint Faster (pakai tutup-merah)', '1', 'pcs', '2500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(35, 'Baterai (A2) (2 piece) Alkaline ABC', '1', 'Set', '16500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(36, 'Baterai (A3) (2 piece) Alkaline ABC', '1', 'Set', '18500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(37, 'Baterai ABC kecil (4pcs)', '1', 'Set', '12000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(38, 'Binder Clip No.105 Joyko', '1', 'Dos', '3000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(39, 'Binder Clip No.107 Joyko', '1', 'Dos', '3500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(40, 'Binder Clip No.111 Joyko', '1', 'Dos', '5000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(41, 'Binder Clip No.155 Joyko', '1', 'Dos', '6500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(42, 'Box File Jumbo Bindex', '1', 'Pcs', '28000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(43, 'Buku Expedisi Besar Bintang Obor', '1', 'Pcs', '15000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(44, 'Buku Expedisi Kiki', '1', 'Pcs', '18000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(45, 'Buku Folio 100 Lembar Bintang Obor', '1', 'Pcs', '19000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(46, 'Buku Folio 200 Lembar Bintang Obor', '1', 'Pcs', '40000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(47, 'Buku Folio 300 Lembar Bintang Obor', '1', 'Pcs', '60000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(48, 'Buku Kas Kecil Bintang Obor', '1', 'Pcs', '15000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(49, 'Computer File Uk.14 7/8x11 Bambi', '1', 'Pcs', '54000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(50, 'Cover Concorde', '1', 'Pack', '32500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(51, 'Cover Plastik untuk jilid (Tebal 0,10cm)', '1', 'Pack', '45000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(52, 'Cover abuabu Concorde', '1', 'Set', '15000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(53, 'Cutter A300 Joyko', '1', 'Pcs', '8000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(54, 'Cutter L500 Joyko', '1', 'Pcs', '16500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(55, 'Desk Set Joyko DS-22', '1', 'Pcs', '95000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(56, 'Double Tape 1 inc Kenko', '1', 'Pcs', '6250', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(57, 'File Transparan A4', '1', 'Pcs', '3000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(58, 'File Transparan F4', '1', 'Pcs', '3000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(59, 'Gunting Kenko', '1', 'Pcs', '8000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(60, 'Hekter HD-10 Kecil Joyko', '1', 'Pcs', '8500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(61, 'Hekter HD-50 Besar Joyko', '1', 'Pcs', '19000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(62, 'Hekter Jilid HD-12N/24 Joyko', '1', 'Pcs', '285000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(63, 'Isi Cutter Joyko', '1', 'Tube', '7000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(64, 'Isi Hekter HD-10 Joyko', '1', 'Box', '1850', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(65, 'Isi Hekter Besar No.3-1 M Joyko', '1', 'Box', '4500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(66, 'Kertas Fax 210x30 Fax', '1', 'Roll', '28500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(67, 'Kertas Fax 210x30 FY Fax', '1', 'Roll', '14250', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(68, 'Kertas HVS 70 gr A4', '1', 'Ream', '45500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(69, 'Kertas HVS 70 gr F4', '1', 'Ream', '50500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(70, 'Kertas HVS 80 gr A4', '1', 'Ream', '52000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(71, 'Kertas HVS 70 gr F4', '1', 'Ream', '57000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(72, 'Kertas HVS warna 70 gr (Folio)', '1', 'Ream', '60000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(73, 'Kertas Signature', '1', 'Box', '105000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(74, 'Amplop BNI untuk Kalender', '1', 'Pcs', '6000', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(75, 'Paper Clipboard kayu', '1', 'Pcs', '7500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(76, 'Paper Clip Jumbo No.5/1 Joyko', '1', 'Dos', '5500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(77, 'Paper Clip No.3 Kecil Joyko', '1', 'Dos', '2500', 'PT. Cahaya Subur Sejahtera', '021-6912194'),
(78, 'Pembolong Kertas Kenko', '1', 'Pcs', '14500', 'PT. Cahaya Subur Sejahtera', '021-6912194');

-- --------------------------------------------------------

--
-- Struktur dari tabel `request`
--

CREATE TABLE `request` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `jumlah` varchar(50) NOT NULL,
  `harga_total` varchar(50) DEFAULT NULL,
  `contact_person` varchar(50) DEFAULT NULL,
  `tanggal` varchar(50) DEFAULT NULL,
  `no_po` varchar(50) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `request`
--

INSERT INTO `request` (`id`, `product_id`, `jumlah`, `harga_total`, `contact_person`, `tanggal`, `no_po`, `is_verified`) VALUES
(9, 2, '2', '82580', '956', '2024-04-27', '31321', 1),
(10, 8, '22', '881540', '3212', '2024-04-07', '21', 1),
(11, 14, '5', '349650', '21421', '2024-04-22', '1351', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `jumlah` varchar(50) DEFAULT NULL,
  `satuan` varchar(50) DEFAULT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `stock`
--

INSERT INTO `stock` (`id`, `jumlah`, `satuan`, `product_id`) VALUES
(15, '1', 'Ream', 2),
(16, '1', 'Ream', 3),
(17, '1', 'Ream', 8),
(18, '100', 'Pack', 14);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `vendor` varchar(150) DEFAULT NULL,
  `tanggal` varchar(50) DEFAULT NULL,
  `invoice_path` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id`, `vendor`, `tanggal`, `invoice_path`, `status`) VALUES
(7, 'Superadmin', '2024-04-09', 'pdfFiles-1714227113256.pdf', 1),
(8, 'Superadmin', '2024-05-01', 'pdfFiles-1714227135870.pdf', 1),
(9, 'PT. ABCDERF', '2024-04-25', 'pdfFiles-1714285776408.pdf', 0);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `v_users`
-- (Lihat di bawah untuk tampilan aktual)
--
CREATE TABLE `v_users` (
`id` int(11)
,`role_id` int(11)
,`name` varchar(255)
,`username` varchar(255)
,`role_name` varchar(50)
,`role_detail` varchar(512)
,`permissions` mediumtext
);

-- --------------------------------------------------------

--
-- Struktur untuk view `v_users`
--
DROP TABLE IF EXISTS `v_users`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_users`  AS SELECT `a`.`id` AS `id`, `a`.`role_id` AS `role_id`, `a`.`name` AS `name`, `a`.`username` AS `username`, `b`.`role_name` AS `role_name`, `b`.`detail` AS `role_detail`, group_concat(`d`.`code` separator ',') AS `permissions` FROM (((`mst_user` `a` left join `mst_user_role` `b` on(`a`.`role_id` = `b`.`id`)) left join `map_role_permission` `c` on(`c`.`role_id` = `b`.`id`)) left join `mst_user_permission` `d` on(`d`.`id` = `c`.`permission_id`)) GROUP BY `a`.`username` ;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `map_role_permission`
--
ALTER TABLE `map_role_permission`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `mst_user`
--
ALTER TABLE `mst_user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `mst_user_permission`
--
ALTER TABLE `mst_user_permission`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `mst_user_role`
--
ALTER TABLE `mst_user_role`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pencatatan`
--
ALTER TABLE `pencatatan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `no_po` (`no_po`);

--
-- Indeks untuk tabel `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `map_role_permission`
--
ALTER TABLE `map_role_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=250;

--
-- AUTO_INCREMENT untuk tabel `mst_user`
--
ALTER TABLE `mst_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `mst_user_permission`
--
ALTER TABLE `mst_user_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `mst_user_role`
--
ALTER TABLE `mst_user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `pencatatan`
--
ALTER TABLE `pencatatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT untuk tabel `request`
--
ALTER TABLE `request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
