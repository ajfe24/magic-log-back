-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2023 a las 20:33:41
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `sku` varchar(12) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `user_id`, `name`, `sku`, `quantity`, `price`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 4, 'producto 1', '123-123-1234', 123, '12.99', '2023-07-30 09:04:33', NULL, '2023-07-31 02:39:18'),
(2, 4, 'producto 2eeqweq', 'qweqweqweqwe', 1213, '111.00', '2023-07-30 09:09:30', NULL, '2023-07-31 02:40:20'),
(3, 4, 'producto 3', '123-123-1234', 123, '12.99', '2023-07-30 09:09:34', NULL, '2023-07-31 02:40:54'),
(4, 4, 'producto 3', '123-123-1234', 123, '12.99', '2023-07-30 09:09:37', NULL, '2023-07-31 02:43:45'),
(5, 4, 'producto 3', '123-123-1234', 123, '12.99', '2023-07-30 09:09:38', NULL, '2023-07-31 02:44:14'),
(6, 4, 'producto 3', '123-123-1234', 123, '12.99', '2023-07-30 09:09:39', NULL, '2023-07-31 02:44:25'),
(7, 4, 'producto 3', '123-123-1234', 123, '12.99', '2023-07-30 09:09:40', NULL, '2023-07-31 02:44:41'),
(8, 4, 'producto 3', '123-123-1234', 123, '12.99', '2023-07-30 10:09:48', NULL, '2023-07-31 02:44:45'),
(9, 4, 'producto 3', '123-123-1234', 123, '12.99', '2023-07-30 10:09:49', NULL, '2023-07-31 02:44:48'),
(10, 4, 'producto 3', '123-123-1234', 123, '12.99', '2023-07-30 10:09:50', NULL, NULL),
(11, 4, 'producto 3', '123-123-1234', 123, '12.99', '2023-07-30 10:09:51', NULL, NULL),
(12, 4, 'producto 3', '123-123-1234', 123, '12.99', '2023-07-30 10:09:52', NULL, '2023-07-31 02:44:59'),
(13, 4, 'prueducto desde crud', '123123123123', 333, '333.00', '2023-07-31 01:50:22', NULL, NULL),
(14, 4, 'SDAFBG', '123', 12, '1234.00', '2023-07-31 05:00:03', NULL, NULL),
(15, 12, 'ewq', 'weqw', 123, '321.00', '2023-07-31 06:08:32', NULL, NULL),
(16, 5, 'sad', 'dsa', 12, '123.00', '2023-07-31 06:16:44', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('cliente','vendedor','administrador') NOT NULL DEFAULT 'cliente',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `user_type`, `created_at`, `updated_at`) VALUES
(4, 'erick.flores.a24@gmail.com', '$2b$10$HkK4we42s0P8C930FT3YruQ32L7Cr0VzDwfHw7bsCG2GgNQ7Ra3q2', 'administrador', '2023-07-28 18:24:46', '2023-07-28 18:24:46'),
(5, 'demo@laboralsoft.com', '$2b$10$9fAzgV5W1TbZ5vVO2tRVFOVZUWUoWuut4aQwTEhF3DMgH5GjADT7G', 'vendedor', '2023-07-30 06:25:10', '2023-07-30 06:25:10'),
(6, 'demo1@laboralsoft.com', '$2b$10$93jUSpRxkquKy7JFZ4VYc.eAdg8geaDz9rh2ovhj57.gZYtzm9Wba', 'cliente', '2023-07-30 07:40:18', '2023-07-30 07:40:18'),
(7, 'demo2@laboralsoft.com', '$2b$10$qGQP34SjXkRwq/aYO6/VxeXPSk3PpxMjfQdCMzd9o2VhVKe0HWZxm', 'cliente', '2023-07-30 07:42:11', '2023-07-30 07:42:11'),
(8, 'demo3@laboralsoft.com', '$2b$10$q/bIUx5ds97FrgdPGhLiz.relcg6zx3WWUxqosuxAjbG8MCQhik96', 'cliente', '2023-07-30 07:42:34', '2023-07-30 07:42:34'),
(9, 'demo4@laboralsoft.com', '$2b$10$iWILHDiPtTxNd3mw8h.OGuBULwHOCS7OP26Y8szn8GlyVUNHiPNyO', 'vendedor', '2023-07-30 07:43:22', '2023-07-30 07:43:22'),
(10, 'demo5@laboralsoft.com', '$2b$10$Ll4Gl75BbTuRtd/OF1stfelOWmAGquupFSgwqpKitbcFMJ6tAf1LG', 'cliente', '2023-07-30 07:44:14', '2023-07-30 07:44:14'),
(11, 'cliente@asd.com', '$2b$10$fNiAr7BU4xQaMaj.9FowHeWGxpRzCpku.t0e3M2ZyY2AMGb5/x4Jm', 'cliente', '2023-07-31 04:48:53', '2023-07-31 04:48:53'),
(12, 'jose@email.com', '$2b$10$KvN2p8Fct/Y9MRNruTDE3uRR4uEw8njbvfvft6QUzYZRR.DkV/Tzq', 'vendedor', '2023-07-31 06:08:16', '2023-07-31 06:08:16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
