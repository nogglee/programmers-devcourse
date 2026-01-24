# 학습 내용

### 01. Database

data를 효율적으로 관리하기 위한 데이터 집합체를 Database(이하 DB)라고 한다.  
data를 구조화하여 중복을 막고, 효율적인 데이터 연산을 가능하게 한다.  

DBMS(Database Management System)를 통해 DB를 운영하고 관리할 수 있다.  
DB에 새로운 데이터를 추가하거나 수정 및 삭제를 DBMS를 통해서 수행하게 된다.  

우리가 일상생활에서 사용하는 상품에도 브랜드가 있듯이, DBMS도 여러 종류 브랜드가 있다.  
> ex. Oracle, MySQL, PostgreSQL, SQLite, MariaDB 등  
운영하는 회사는 각 브랜드마다 다르지만 연산 처리 주요 명령어는 비슷하다.  

** DBMS 설치**
실습에서는 Docker를 통해 MariaDB를 설치하여 사용할 예정이다.

1. MariaDB 설치
    `docker pull mariadb`
2. MariaDB 설정
    > 컨테이너 이름: mariadb  
    > -d: 백그라운드에서 실행  
    > -p: 포트 매핑 (host:container)  
    > --restart=always: 도커 재시작 시 자동으로 컨테이너 시작  
    > -e MYSQL_ROOT_PASSWORD={password}: root 비밀번호 설정  
    `docker run --name mariadb -d -p 3306:3306 --restart=always -e MYSQL_ROOT_PASSWORD={password} mariadb`
3. MariaDB 컨테이너 접속
    > exec: 명령 실행  
    > -it: interactive terminal  
    > /bin/bash: bash shell --> 컨테이너 내부에서 bash shell 실행  
    `docker exec -it mariadb /bin/bash`
4. MariaDB 실행
    `mariadb -u root -p` => 2번에서 설정한 비밀번호 입력  

### 02. SQL

> **SQL**  
> SQL(Structured Query Language)은 DBMS에 명령을 내리는 언어이다.  

**SQL 구문**
1. DB 조회
    ```shell
    MariaDB [(none)]> SHOW DATABASES;
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | mysql              |
    | performance_schema |
    | sys                |
    +--------------------+
    ```
2. DB 생성
    ```shell
    MariaDB [(none)]> CREATE DATABASE Tennis;

    // result
    MariaDB [(none)]> SHOW DATABASES;
    +--------------------+
    | Database           |
    +--------------------+
    | Tennis             |
    | information_schema |
    | mysql              |
    | performance_schema |
    | sys                |
    +--------------------+
    ```
3. DB 조회
    ```shell
    MariaDB [(none)]> USE Tennis;

    // result
    Database changed
    ```
4. Table 생성
    ```shell
    MariaDB [Tennis]> CREATE TABLE member 
        -> (
        ->  id VARCHAR(30),
        ->  name VARCHAR(30),
        ->  pwd VARCHAR(30)
        -> );

    // result
    MariaDB [Tennis]> SHOW TABLES;
    +------------------+
    | Tables_in_Tennis |
    +------------------+
    | member           |
    +------------------+
    ```
5. Data 삽입
    ```shell
    MariaDB [Tennis]> INSERT INTO member
    -> VALUES ('nogglee', 'Eunji LEE', 'aaaaa');
    

    // result
    // ID 컬럼 조회
    MariaDB [Tennis]> SELECT id FROM member;
    +---------+
    | id      |
    +---------+
    | nogglee |
    +---------+

    // 모든 데이터 조회
    MariaDB [Tennis]> SELECT * FROM member;
    +-------------+-----------+-------+
    | id          | name      | pwd   |
    +-------------+-----------+-------+
    | nogglee     | Eunji LEE | zzzzz |
    | ssongcoding | Songa KIM | bbbbb |
    +-------------+-----------+-------+

    // WHERE 절 사용하여 특정 조건의 데이터 조회
    MariaDB [Tennis]> SELECT * FROM member WHERE id = 'nogglee';
    +---------+-----------+-------+
    | id      | name      | pwd   |
    +---------+-----------+-------+
    | nogglee | Eunji LEE | aaaaa |
    +---------+-----------+-------+
    ```
6. Data 수정
    ```shell
    MariaDB [Tennis]> UPDATE member SET pwd = 'zzzzz' WHERE id = 'nogglee';
    
    // result
    MariaDB [Tennis]> SELECT * FROM member WHERE id = 'nogglee';
    +---------+-----------+-------+
    | id      | name      | pwd   |
    +---------+-----------+-------+
    | nogglee | Eunji LEE | zzzzz |
    +---------+-----------+-------+
    ```
7. Data 삭제
    ```shell
    MariaDB [Tennis]> DELETE FROM member WHERE id = 'nogglee';
    
    // result
    MariaDB [Tennis]> SELECT * FROM member;
    +-------------+-----------+-------+
    | id          | name      | pwd   |
    +-------------+-----------+-------+
    | ssongcoding | Songa KIM | bbbbb |
    +-------------+-----------+-------+
    ```
