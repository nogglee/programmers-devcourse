# 학습 내용

### Map Object

Map은 key-value 구조의 데이터를 저장할 때 사용하는 객체이다.
일반 객체의 경우 key가 문자열로만 저장되지만, Map은 key를 문자열로 변환하지 않고 참조한다.
그렇기 때문에 key 또는 value에 다양한 타입(객체나 함수)을 사용할 수 있다.

Map에서는 key-value 쌍을 삽입한 순서대로 저장되지만,
배열처럼 인덱스로 값을 조회할 수는 없다. 반드시 key(unique)를 기준으로 접근해야한다.

Map 객체의 메서드
- `new Map()` : Map 객체를 생성
- `map.set(key, value)` : key-value 쌍을 추가
- `map.get(key)` : key를 기준으로 value를 반환
- `map.has(key)` : key가 존재하는지 확인
- `map.delete(key)` : key를 기준으로 value를 삭제
- `map.clear()` : 모든 key-value 쌍을 삭제
- `map.size` : 객체의 개수를 반환

이번 실습에서는 유튜버 정보를 저장하는 Map을 만들었다.
channelID를 key로 사용하고, 유튜버 정보가 담긴 객체를 value로 사용했다.

```javascript
let user01 = { channelTitle : "십오야", subscribers : "593만명", videoNum : "993개" }
let user02 = { channelTitle : "침착맨", subscribers : "227만명", videoNum : "6.6천개" }
let user03 = { channelTitle : "테오", subscribers : "54.8만명", videoNum : "726개" }

const db = new Map()
db.set('@15ya', user01)
db.set('@chimchakman', user02)
db.set('@teo', user03)

app.get
(
    '/youtuber/:id', (req, res) => 
    {
        const {id} = req.params
        res.json(db.get(id))
    }
)
```

클라이언트는 `/youtuber/:id` 형태로 요청을 보내면,
서버에서 path parameter를 통해 전달받은 id를 기준으로
Map으로 만든 db에서 해당 유튜버 정보 조회 후 응답한다.

### Express 뜯어보기

express는 http모듈에 기본 기능을 더해서 편하게 사용할 수 있게 만든 모듈이다.
HTTP 요청 -> 응답의 흐름을 다루기 쉽게 만든 웹 프레임워크이다.

http 모듈을 사용해도 라우터와 핸들러를 직접 구현할 수 있지만,
요청의 URL과 method를 기준으로 분기하는 판단 로직을
개발자가 직접 작성해야 한다.

Express는 이러한 판단 로직을 프레임워크가 담당하고,
개발자는 요청을 처리할 규칙과 로직만 선언하도록 역할을 분리한다.