-- permission to connect from any host (%)
-- GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY `1234` WITH GRANT OPTION;
-- FLUSH PRIVILEGES;
-- EXIT;

-- Create the user first
-- CREATE USER 'root'@'%' IDENTIFIED BY '1234';

CREATE DATABASE IF NOT EXISTS `domian_security`;
USE `domian_security`;

-- Then grant privileges
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

-- Set global host cache size to 0
SET GLOBAL host_cache_size=0; -- Ensure init.sql file does not use deprecated settings and includes secure practices.

FLUSH PRIVILEGES;

-- DROP TABLE IF EXISTS domain;

CREATE TABLE IF NOT EXISTS domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domainName VARCHAR(20) NOT NULL UNIQUE,
    securityInfo VARCHAR(255),
    identityInfo VARCHAR(255),
    scanDate DATE DEFAULT '1900-01-01', 
    activityStatus ENUM('new','active', 'inactive') DEFAULT ('new')
);


CREATE TABLE IF NOT EXISTS security_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
     domainId VARCHAR(255),
     categories VARCHAR(255),
     lastAnalysisResults VARCHAR(255),
     lastHttpsCertificate VARCHAR(255),
     whois VARCHAR(255),
     reputation int,
     totalVotes VARCHAR(255),
     createdDate int,
     updatedDate int,
     scanDate DATE DEFAULT '1900-01-01', 
     status ENUM('pending','completed') DEFAULT ('pending')
);

CREATE TABLE IF NOT EXISTS identity_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domainName VARCHAR(255),
    expiresDate VARCHAR(255),
    registrant VARCHAR(255),
    administrativeContact VARCHAR(255),
    technicalContact VARCHAR(255),
    hostNames VARCHAR(255),
    scanDate DATE DEFAULT '1900-01-01',
    status ENUM('pending','completed') DEFAULT ('pending')
);

INSERT INTO domains(domainName,
    securityInfo,
    identityInfo
) VALUES('google.com','2','3');
