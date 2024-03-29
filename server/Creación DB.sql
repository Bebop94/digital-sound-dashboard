DROP DATABASE IF EXISTS digital_sound;
CREATE DATABASE digital_sound;
USE digital_sound;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `user_first_name` varchar(100) NOT NULL,
    `user_last_name` varchar(100) NOT NULL,
    `user_email` varchar(100) NOT NULL,
    `user_password` varchar(1000) NOT NULL,
    `user_image` varchar(100),
    `user_type` varchar(10) NOT NULL,
	PRIMARY KEY (`id`)
    -- KEY `users_user_type_id_foreign` (`user_type_id`)
    -- CONSTRAINT `user_user_type_id_foreign` FOREIGN KEY (`user_type_id`) REFERENCES `profiles` (`id`)
    );
    
INSERT INTO `users` VALUES (1, 'Pepe', 'Argento', 'pepea@fatiga.com', '$2a$10$o7v4SkWbr3iThnaV9mfwrO9EhAtW.9Raq0IOQcqd9npKDh8Mnrr2.', 'img-usuarios-1670183464708.jpg', 'admin'),
(2, 'Catalina', 'Lagrande', 'catarom@rusia.com', '$2a$10$iknYrzN9bNZjBAQL95kUseJZyjyZvkfhYMnbxIksGNtz4ZxFU0lQK', null, 'usuario');
    
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `user_type_name` varchar(10) NOT NULL,
    PRIMARY KEY (`id`)
);
    
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `user_id` int(10) NOT NULL,
    `flag_is_open` bool NOT NULL,
    `cart_date_created` datetime NOT NULL,
    `cart_date_checkout` datetime,
    PRIMARY KEY (`id`),
    KEY `cart_user_id_foreign` (`user_id`)
);

DROP TABLE IF EXISTS `carts_products`;
CREATE TABLE `carts_products` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `product_id` int(10) NOT NULL,
    `cart_id` int(10) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `cart_product_product_id_foreign` (`product_id`),
	KEY `cart_product_cart_id_foreign` (`cart_id`)
);

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `product_name` varchar(100) NOT NULL,
    `product_description_short` varchar(400) NOT NULL,
    `product_description_long` varchar(400) NOT NULL,
    `product_price` decimal(11,2) NOT NULL,
    `product_images` varchar(400) NOT NULL,
    `flag_hot_product` bool,
    `flag_used_product` bool,
	`category_id` int(10) NOT NULL,
    `brand_id` int(10),
    `promotion_id` int(10),
    PRIMARY KEY (`id`),
    KEY `product_category_id_foreign` (`category_id`),
    KEY `product_brand_id_foreign` (`brand_id`),
    KEY `product_promotion_id_foreign` (`promotion_id`)
);

INSERT INTO `products` VALUES 
(1,"Guitarra eléctrica Les Paul Standard","Este es un subtitulo de la guitarra con ID que termina en 083","Quisque lobortis sit amet odio id maximus. Nullam vel augue fringilla, fermentum metus in, aliquam tortor. Curabitur laoreet elit diam, ut varius turpis scelerisque vel. Vestibulum mauris purus, iaculis vitae orci a, consequat porttitor mi. Phasellus quam ante, imperdiet feugiat sem quis, maximus ullamcorper libero.",74800,"img-prod-guiYbaj-1666985430204.png",false,false,1,NULL,NULL),
(2,"Guit. Elec Jazzmaster","Subtitulo num 3 Oreo Ipsum","Mauris at ante eget nisi consectetur tincidunt. Vivamus convallis pulvinar dolor vel convallis. Proin erat tellus, iaculis nec sem sed, malesuada elementum neque. Curabitur facilisis posuere ullamcorper. Sed eget magna eget metus semper luctus eget vitae metus. Maecenas vitae metus risus. Proin vitae fermentum sapien. ",300000,"img-prod-guiYbaj-1666986402096.png",true,true,1,NULL,NULL),
(3,"Bajo YAMAHA TRBX174-OVS","Otro sub Titulo mas de los 9","Ut fringilla quis lorem vitae aliquet. Nullam scelerisque erat in tellus interdum dictum. In vestibulum leo erat, condimentum cursus leo semper at. Pellentesque ultrices leo magna, sed semper ligula maximus a. ",119000,"img-prod-guiYbaj-1666986737515.png",false,false,1,NULL,NULL),
(4,"Bateria YAMAHA Serie Ryden","Dicen que las baterias Yamaha son buenas","Nunc maximus cursus ultricies. Nunc sagittis leo quis velit pharetra consequat. Sed sed nulla sapien. Quisque vel tortor id dui sollicitudin viverra. ",230000,"img-prod-bat-1666987068778.png",false,true,2,NULL,NULL),
(5,"Pedal de Bombo Demonator","Ya a esta altura se me acabaron las ideas","Fusce fermentum magna ac ornare malesuada. Nullam vehicula felis vitae pretium venenatis. Phasellus congue odio ipsum, malesuada dapibus erat sollicitudin id. In sit amet diam vel turpis pharetra vehicula interdum ac mi. Aliquam scelerisque justo at orci sodales, vel finibus ipsum pellentesque. Nulla quis hendrerit mauris, vitae congue libero. Vivamus elementum elit nibh, vitae posuere leo cursus sit amet. Aenean aliquet eros sit amet elit fringilla malesuada. Praesent eu egestas magna. Sed euismod diam accumsan, pharetra lectus in, eleifend sapien. Donec lectus ligula, pulvinar vitae ullamcorper non, faucibus vitae ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",37380,"img-prod-bat-1666987337325.png",true,true,2,NULL,NULL),
(6,"Bateria 5 Cuerpos 22 12 13 16 Redoblante 14X5 1/2 Soportes","El undecimo ejemplo que tiro","Phasellus tempor turpis maximus elit mollis, in blandit urna tincidunt. Etiam non vehicula augue. Fusce tempus egestas nisi, vitae mollis dolor eleifend vitae. Cras condimentum,NOB eternos hijos eternos de Central. Hace mas o menos 14 años que no ganan un clásido. JA! ",119000,"img-prod-bat-1666994272534.png",false,false,2,NULL,NULL),
(7,"Samson SX3020","Cuando termina esto?","Nam maximus nunc vel cursus placerat. Cras sed euismod eros, id tempus tellus. Nulla at dui a tellus aliquam viverra nec vel nisi. Duis eu purus purus. Maecenas aliquam, ex id venenatis commodo, orci nulla malesuada tortor, in ultricies ex ipsum id est.",320800,"img-prod-amp-1666994509765.png",false,false,3,NULL,NULL),  
(8,"Phonic Powr559RW","Dicen que las URL de Cotodigital son MALISIMAS","nterdum et malesuada fames ac ante ipsum primis in faucibus. Fusce nisi urna, feugiat quis eleifend suscipit, vehicula et elit. Nunc ultricies lobortis iaculis. Morbi vitae ante ut massa efficitur pulvinar eget in eros. Donec dignissim pretium vulputate. Sed ac mi vitae augue porttitor maximus sed a tellus. ",76088,"img-prod-amp-1666994674700.png",true,false,3,NULL,NULL),
(9,"Mixer Consola PoWah","Cuanto mas hay que escribir","Aliquam quis magna quam. Nunc quis lectus non tortor faucibus eleifend. Sed vel quam eget ex convallis posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",16000,"img-prod-amp-1666994880688.png",false,false,3,NULL,NULL),
(10,"AKG K240ST","Lorem Ipsum vamos Rosario Central","Nam vel cursus magna, porta venenatis lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur hendrerit pellentesque ex, eget tempor turpis venenatis vitae. Nam non ultricies metus. Fusce lobortis nec lectus sed semper. Vivamus id nisi porttitor, laoreet erat consequat, efficitur dui. ",55999,"img-prod-acc-1666995698819.png",false,true,4,NULL,NULL),
(11,"Cable HDMI Mallado 15 metros","Rosario Central un cable a tierra","Nulla nec pulvinar erat. Donec massa nunc, ullamcorper non tellus a, imperdiet mollis ligula. Pellentesque sit amet enim nec odio malesuada tempus eget in odio. Vestibulum cursus dictum mauris quis maximus. Maecenas nec sem massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ",1500,"img-prod-acc-1666995556465.png",false,false,4,NULL,NULL),
(12,"Auriculares Gamer Melon","Cuanto producto gamer!","Donec eget blandit nunc, eu tempus quam. Suspendisse et pretium urna, in aliquam mauris. Duis cursus porttitor magna, id hendrerit mauris porta pretium. Sed sit amet facilisis nunc. ",4500,"img-prod-acc-1666995295439.png",true,true,4,NULL,NULL),
(13,"Tama HSSd1 Dyna-Sync","Pega como un fierro","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit dolorum libero eligendi sequi quos consequatur neque? Laborum, veritatis! Deleniti facere obcaecati dolorem hic similique sequi, nobis repudiandae aperiam vel modi?",15300.23,"tama-dynasync.jpg",false,false,2,NULL,NULL),
(14,"Fender Jazz Bass 60th Aniversary","Edición especial del mítico JB","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit dolorum libero eligendi sequi quos consequatur neque? Laborum, veritatis! Deleniti facere obcaecati dolorem hic similique sequi, nobis repudiandae aperiam vel modi?",335000,"fender-jazz-bass.jpg",true,false,1,NULL,NULL);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `category_name` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `categories` VALUES (1, 'Guitarras y Bajos'),(2,'Baterias'),(3,'Amplificadores'),(4,'Accesorios');

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `brand_name` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `promotions`;
CREATE TABLE `promotions` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `promotion_name` varchar(50) NOT NULL,
    `promotion_discount_amount` decimal(3,2),
    PRIMARY KEY (`id`)
);
 




