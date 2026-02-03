CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`professionalId` int NOT NULL,
	`appointmentDate` datetime NOT NULL,
	`duration` int DEFAULT 30,
	`status` enum('pending','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending',
	`reason` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blood_pressure_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`systolic` int NOT NULL,
	`diastolic` int NOT NULL,
	`pulse` int,
	`notes` text,
	`recordedAt` datetime NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blood_pressure_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blood_sugar_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`value` int NOT NULL,
	`measurementType` enum('fasting','postprandial','random') NOT NULL,
	`notes` text,
	`recordedAt` datetime NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blood_sugar_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `communes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`wilayaCode` varchar(3) NOT NULL,
	`nameAr` varchar(100) NOT NULL,
	`nameFr` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `communes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lab_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`labId` int NOT NULL,
	`testName` varchar(255) NOT NULL,
	`testType` varchar(100),
	`results` json NOT NULL,
	`normalRange` text,
	`status` enum('pending','ready','reviewed') NOT NULL DEFAULT 'pending',
	`documentUrl` varchar(500),
	`testedAt` datetime NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lab_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `medical_professionals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`professionalType` enum('doctor','clinic','lab') NOT NULL,
	`fullName` text NOT NULL,
	`licenseNumber` varchar(100) NOT NULL,
	`specialization` varchar(100),
	`clinicName` varchar(255),
	`labName` varchar(255),
	`wilaya` varchar(100) NOT NULL,
	`commune` varchar(100) NOT NULL,
	`address` text NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(320) NOT NULL,
	`website` varchar(255),
	`bio` text,
	`profileImage` varchar(500),
	`rating` decimal(3,2) DEFAULT '0',
	`reviewCount` int DEFAULT 0,
	`isVerified` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `medical_professionals_id` PRIMARY KEY(`id`),
	CONSTRAINT `medical_professionals_licenseNumber_unique` UNIQUE(`licenseNumber`)
);
--> statement-breakpoint
CREATE TABLE `otp_verifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`phone` varchar(20) NOT NULL,
	`otp` varchar(6) NOT NULL,
	`isVerified` boolean DEFAULT false,
	`expiresAt` datetime NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `otp_verifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fullName` text NOT NULL,
	`dateOfBirth` datetime,
	`gender` enum('male','female','other'),
	`wilaya` varchar(100),
	`commune` varchar(100),
	`address` text,
	`phone` varchar(20) NOT NULL,
	`emergencyContact` varchar(20),
	`bloodType` enum('O+','O-','A+','A-','B+','B-','AB+','AB-'),
	`allergies` text,
	`chronicDiseases` text,
	`currentMedications` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `patients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `prescriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`doctorId` int NOT NULL,
	`medications` json NOT NULL,
	`diagnosis` text,
	`notes` text,
	`issuedAt` datetime NOT NULL,
	`expiresAt` datetime,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `prescriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`doctorId` int NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `specializations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameAr` varchar(255) NOT NULL,
	`nameFr` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `specializations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wilayas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(3) NOT NULL,
	`nameAr` varchar(100) NOT NULL,
	`nameFr` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wilayas_id` PRIMARY KEY(`id`),
	CONSTRAINT `wilayas_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `userType` enum('patient','doctor','clinic','lab') NOT NULL;