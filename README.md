# Domain Security System

## Description

The Domain Security system provides security and identity information about domains. It scans domains in the database at a given interval and gathers information from various sources, such as VirusTotal and WHOIS. The system supports an asynchronous REST API with endpoints to retrieve and add domains for analysis. All requests are stored for future analysis.

## Features

- Retrieve current information about a domain.
- Add a domain to the list for analysis.
- Store past results for future use.
- Gather information from VirusTotal and WHOIS.
- Scheduled scanning of domains at configurable intervals.
- Dockerized deployment.

## Technologies Used

- Node.js
- TypeScript
- MySQL
- Docker
- node-cron
- express
- dotenv
- cors
- axios

**N-Tiers Architecture** 
![N-Tiers-Architecture](/assets/n-triers-architecture.png)

## Installation

### Using Docker

1. Clone the repository:

    ```sh
    git clone https://github.com/Lior-Halperin/domain-security-system-backend.git
    cd domain-security
    ```

2. Create a `.env` file with the following content:

    ```sh
    MYSQL_ROOT_PASSWORD=1234
    MYSQL_DATABASE=domain_security
    MYSQL_USER=root
    MYSQL_PASSWORD=1234

NODE_ENV=development
MYSQL_ROOT_PASSWORD=1234
DB_HOST_DEV=database
DB_PORT_DEV=3306
DB_NAME_DEV=domian_security
DB_USER_DEV=root
DB_PASSWORD_DEV=1234
SERVER_PORT_DEV =3002
HASH_SALT = Add your hash salt
HASH_ALGORITHM = Add your hash algorithm 
JWT_SECRET_KEY = Add your JWS secret key

# Api - Whois
API_URL_WHOIS = https://www.whoisxmlapi.com/whoisserver/WhoisService
API_KEY_WHOIS = Add your WHOIS key
API_LIMITED_DAY_WHOIS = ""
API_LIMITED_REQUEST_DURATION_WHOIS = 50
API_LIMITED_DURATION_WHOIS = 1000

# Api - Virus Total
API_URL_VIRUS = https://www.virustotal.com/api/v3/domains/
API_KEY_VIRUS = Add your VIRUS key
API_LIMITED_DAY_VIRUS = 500
API_LIMITED_DURATION_VIRUS = 60000
API_LIMITED_REQUEST_DURATION_VIRUS = 4

    ```

3. Run the Docker containers:

    ```sh
    docker-compose up --build
    ```

## Usage

### Endpoints

1. **Get Domain Information**

    - **URL:** `/api/domain/:domainName`
    - **Method:** `GET`
    - **Description:** Returns current information about the domain. If there is no information, adds the domain to the list for analysis and replies with a message to check back later.

2. **Add Domain for Analysis**

    - **URL:** `/api/add-domain`
    - **Method:** `POST`
    - **Description:** Adds a domain to the list for analysis.
    - **Body Parameters:**
        - `domain` (string): The domain name to be added.

## Database Schema

### Tables

1. `domains`
    - `id` INT AUTO_INCREMENT PRIMARY KEY
    - `domainName` VARCHAR(20) NOT NULL UNIQUE
    - `securityInfo` VARCHAR(255)
    - `identityInfo` VARCHAR(255)
    - `activityStatus` ENUM('new', 'active', 'inactive') DEFAULT 'new'

2. `security_info`
    - `id` INT AUTO_INCREMENT PRIMARY KEY
    - `domainId` VARCHAR(255)
    - `categories` VARCHAR(255)
    - `lastAnalysisResults` VARCHAR(255)
    - `lastHttpsCertificate` VARCHAR(255)
    - `whois` VARCHAR(255)
    - `reputation` INT
    - `totalVotes` VARCHAR(255)
    - `createdDate` INT
    - `updatedDate` INT
    - `scanDate` DATE NOT NULL
    - `status` ENUM('pending', 'completed') DEFAULT 'pending'

3. `identity_info`
    - `id` INT AUTO_INCREMENT PRIMARY KEY
    - `domainName` VARCHAR(255)
    - `expiresDate` VARCHAR(255)
    - `registrant` VARCHAR(255)
    - `administrativeContact` VARCHAR(255)
    - `technicalContact` VARCHAR(255)
    - `hostNames` VARCHAR(255)
    - `scanDate` DATE NOT NULL
    - `status` ENUM('pending', 'completed') DEFAULT 'pending'

## Scheduled Tasks

Scheduled tasks are handled using `node-cron`. The following task is scheduled to run at 9 AM and 11 PM every day:

```js
cron.schedule("0 9,23 * * *", scanDomains);
