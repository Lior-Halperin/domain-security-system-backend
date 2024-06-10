CREATE DATABASE IF NOT EXISTS `domian_security`;
USE `domian_security`;

-- Then grant privileges
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

-- Set global host cache size to 0
SET GLOBAL host_cache_size=0; -- Ensure init.sql file does not use deprecated settings and includes secure practices.

FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS security_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
     domainId VARCHAR(20) NOT NULL UNIQUE,
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
    domainName VARCHAR(20) NOT NULL UNIQUE,
    expiresDate VARCHAR(255),
    registrant VARCHAR(255),
    administrativeContact VARCHAR(255),
    technicalContact VARCHAR(255),
    hostNames VARCHAR(255),
    scanDate DATE DEFAULT '1900-01-01',
    status ENUM('pending','completed') DEFAULT ('pending')
);

CREATE TABLE IF NOT EXISTS domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domainName VARCHAR(20) NOT NULL UNIQUE,
    securityInfoId INT NOT NULL,
    identityInfoId INT NOT NULL,
    scanDate DATE DEFAULT '1900-01-01', 
    activityStatus ENUM('new','active', 'inactive') DEFAULT ('new'),
    FOREIGN KEY (securityInfoId) REFERENCES security_info(id) ON DELETE CASCADE,
    FOREIGN KEY (identityInfoId) REFERENCES identity_info(id) ON DELETE CASCADE,
    INDEX (securityInfoId),
    INDEX (identityInfoId)
);

CREATE TABLE IF NOT EXISTS request_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    method VARCHAR(10),
    url VARCHAR(50),
    headers TEXT, --  TEXT allows for more flexibility as it can accommodate variable lengths without requiring you to define a maximum length.
    body TEXT,
    timestamp DATE DEFAULT '1900-01-01'
);
