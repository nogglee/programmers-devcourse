# 학습 내용

### DB 제약조건

DB 제약조건(constraint)은 **잘못된 데이터가 저장되는 것을 사전에 막기 위한 규칙**이다.  
서버에서 유효성 검사에서 걸러내지 못한 예외가 있더라도, DB 제약조건이 마지막 방어선 역할을 한다.  

사용할 수 있는 제약조건은 무엇이 있는지 알아보자.  

#### DEFAULT (기본값)
컬럼에 값이 들어오지 않았을 때 자동으로 채워질 값을 지정한다.  

- INSERT 시 해당 컬럼을 생략하면 DEFAULT 값이 저장됨  
- 생성 시점이 아닌 **저장 시점에 적용**된다  

#### AUTO_INCREMENT (자동 증가)
숫자 컬럼에 대해 레코드가 추가될 때마다 값이 자동으로 증가한다.  

- 주로 PRIMARY KEY와 함께 사용  
- 직접 값을 넣지 않아도 DB가 알아서 번호를 부여함  
- 서버에서 id를 계산하지 않아도 됨

#### NOT NULL
컬럼에 NULL 값이 들어오는 것을 허용하지 않는다.  

- 필수 입력값에 사용
- INSERT 시 해당 컬럼이 없으면 에러 발생
- 반드시 존재해야 하는 데이터를 DB 차원에서 강제

#### UNIQUE
컬럼 값의 중복을 허용하지 않는다.  

- 같은 값이 두 번 들어오면 에러 발생
- PRIMARY KEY와 달리 NULL 허용 가능

#### PRIMARY KEY
테이블에서 각 행(row)을 식별하는 고유 키  

- UNIQUE + NOT NULL 성격을 동시에 가짐
- 테이블당 하나만 존재 가능
- 자동으로 index 생성
- 데이터의 정체성을 나타냄

#### FOREIGN KEY
다른 테이블의 PRIMARY KEY를 참조하는 컬럼   

- 테이블 간 관계를 표현
- 존재하지 않는 값을 참조하려 하면 에러 발생

#### ON DELETE / ON UPDATE
FOREIGN KEY로 연결된 데이터가 변경될 때의 동작을 정의한다.  

대표 옵션:  
- CASCADE: 부모 삭제/수정 시 자식도 함께 삭제/수정
- SET NULL: 부모 삭제 시 자식 값을 NULL로 변경
- RESTRICT: 참조 중이면 삭제/수정 불가
- NO ACTION: RESTRICT와 유사

이 옵션들은 **데이터 관계가 깨지는 것을 방지**하기 위해 사용된다.  

---

### MySQL(MariaDB) 날짜 / 시간 타입 + UTC

MariaDB에서 사용하는 대표적인 날짜/시간 타입은 DATE, TIME, DATETIME, TIMESTAMP 네 가지다.  
겉보기에는 비슷하지만, DATETIME과 TIMESTAMP는 내부 동작 방식이 완전히 다르다.  

#### DATE
날짜만 저장하여, '언제인지(날짜)'만 필요할 때 사용한다.  

형식:  
```
YYYY-MM-DD
```

#### TIME
시간만 저장한여, '몇 시인지 / 얼마나 걸렸는지' 표현한다.  

형식:  
```
HH:MM:SS
```

#### DATETIME
날짜 + 시간을 그대로 저장한다.    

형식:  
```
YYYY-MM-DD HH:MM:SS
```

특징:  
- 입력한 값을 변환 없이 그대로 저장
- 서버 timezone이 바뀌어도 값이 변하지 않음

#### TIMESTAMP
날짜 + 시간을 UTC 기준으로 변환해 저장한다.  

> **UTC란?**  
> UTC는 세계 표준 시간이다.  
> 한국 시간(KST)은 UTC에 9시간을 더해 주어야한다.  
> 형식은 DATETIME과 같지만, 동작 방식이 다르다.  

특징:  
- 저장 시 UTC 기준으로 변환
- 조회 시 서버 timezone에 맞게 다시 변환

예 (한국 시간 기준):  
```
2026-02-02 12:00 (KST)
→ DB 저장: 2026-02-02 03:00 (UTC)
→ 조회 시 다시 +9시간
```

즉, TIMESTAMP는 '전 세계 공통의 순간'을 표현한다.  

주 사용처:  
- created_at
- updated_at
- 로그인 시각
- 로그 기록

---

#### DATETIME vs TIMESTAMP

DATETIME:  
- 입력한 시각 그대로 저장 (timezone 영향 없음)
- 고정된 시각

TIMESTAMP:   
- UTC 기준 저장 후 지역 시간으로 변환
- 사건이 발생한 순간

---

### 다른 테이블에서 데이터 가져오기

JOIN은 **서로 다른 테이블을 하나의 결과처럼 묶어서 조회하는 방법**이다.  
테이블을 쪼개면(정규화), 데이터는 깔끔해지지만 조회할 때는 여러 테이블을 함께 봐야 한다.  
즉 JOIN은, '관계로 나뉜 테이블을 다시 연결해서 읽기 위한 문법'이라고 할 수 있다.  

#### 왜 JOIN이 필요할까?

예를 들어 아래와 같이 테이블이 나뉘어있다면,  
- users 테이블 → 사용자 정보
- orders 테이블 → 주문 정보

'누가 어떤 주문을 했는지' 보기 위해서 두 테이블을 함께 조회해야 한다.  
이러한 케이스일 때 orders.user_id(FK) 와 users.id(PK) 를 기준으로 JOIN이 필요하다.  

---

### JOIN의 종류

#### INNER JOIN

두 테이블에 **모두 존재하는(교집합) 데이터만** 가져온다.  

```sql
SELECT *
FROM orders
INNER JOIN users ON orders.user_id = users.id;
```

특징:  
- 양쪽에 모두 있는 데이터만 조회
- 매칭 안 되면 결과에서 제외

#### LEFT JOIN

왼쪽 테이블 기준으로 전부 가져오고, 오른쪽은 있으면 붙이고 없으면 NULL  

```sql
SELECT *
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

특징:  
- 기준인 users 테이블 전부 출력
- orders가 없는 유저가 존재할 수 있음

#### RIGHT JOIN

LEFT JOIN의 반대로, 오른쪽 테이블이 기준이된다.

```sql
SELECT *
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
```