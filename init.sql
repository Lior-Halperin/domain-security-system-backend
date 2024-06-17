CREATE DATABASE IF NOT EXISTS `domian_security`;
USE `domian_security`;

-- Then grant privileges
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

-- Set global host cache size to 0
SET GLOBAL host_cache_size=0; -- Ensure init.sql file does not use deprecated settings and includes secure practices.

FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS domains (
    domainId VARCHAR(20) PRIMARY KEY,
    scanDate DATE DEFAULT '1900-01-01', 
    activityStatus ENUM('new','active', 'inactive') DEFAULT ('new'),
    INDEX (scanDate)
);

CREATE TABLE IF NOT EXISTS security_info (
     domainId VARCHAR(20) PRIMARY KEY,
     categories VARCHAR(255),
     lastAnalysisResults VARCHAR(255),
     lastHttpsCertificate VARCHAR(255),
     whois VARCHAR(255),
     reputation int,
     totalVotes VARCHAR(255),
     createdDate int,
     updatedDate int,
     scanDate DATE DEFAULT '1900-01-01', 
     status ENUM('pending','completed') DEFAULT ('pending'),
     FOREIGN KEY (domainId) REFERENCES domains(domainId) ON DELETE CASCADE, -- ON DELETE CASCADE - action ensures referential integrity by automatically deleting any dependent rows in the child tables when a row in the parent table is deleted.
     INDEX (scanDate),
     INDEX (status)
);

CREATE TABLE IF NOT EXISTS identity_info (
    domainId VARCHAR(20) PRIMARY KEY,
    expiresDate VARCHAR(255),
    registrant VARCHAR(255),
    administrativeContact VARCHAR(255),
    technicalContact VARCHAR(255),
    hostNames VARCHAR(255),
    scanDate DATE DEFAULT '1900-01-01',
    status ENUM('pending','completed') DEFAULT ('pending'),
    FOREIGN KEY (domainId) REFERENCES domains(domainId) ON DELETE CASCADE,
    INDEX (scanDate),
    INDEX (status)
);

CREATE TABLE IF NOT EXISTS request_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    method VARCHAR(10),
    url VARCHAR(50),
    headers TEXT, --  TEXT allows for more flexibility as it can accommodate variable lengths without requiring you to define a maximum length.
    body TEXT,
    timestamp DATE DEFAULT '1900-01-01',
    INDEX (timestamp)
);
