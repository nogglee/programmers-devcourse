# 학습 내용

### forEach문은 어떤 역할을 할까?

forEach는 배열의 각 요소를 한 번씩 꺼내서 개발자가 지정한 함수를 실행해주는 메서드이다.  

```javascript
arr.forEach(callback)
```
이렇게 forEach문의 parameter로 함수를 전달하는 것이 콜백 함수임을 복기하자.   

**그럼 콜백 함수는 언제, 무슨 역할로 실행될까?**
위 코드에서 callback은 배열 요소마다 1번씩 자동 호출된다.  
만약 배열에 5개의 요소가 있다면 callback은 5번 호출된다.  

```javascript
arr.forEach((parameter) => {...})
```
콜백 함수가 받는 parameter 순서는 데이터, 인덱스, 객체이다.  
아래 예제를 통해 더 자세히 알아보자.  

```javascript
const arr = [1, 2, 3]

arr.forEach((a, b, c) => { console.log(`a: ${a}, b: ${b}, c: ${c}`) })
```
배열에 3개의 요소가 존재하고, 입력 받은 parameter는 총 3개이다.
console.log의 결과는 다음과 같다.

```
a: 1, b: 0, c: [ 1, 2, 3 ]
a: 2, b: 1, c: [ 1, 2, 3 ]
a: 3, b: 2, c: [ 1, 2, 3 ]
```

데이터, 인덱스, 객체 순서대로 전달된다고 했으니,  
a는 데이터(1, 2, 3), b는 인덱스(0, 1, 2), c는 객체([1, 2, 3])가 된다.

---

### forEach문과 map method의 차이

forEach와 map은 모두 배열의 각 요소를 순회하며 콜백 함수를 실행한다는 점에서 공통점을 가지고 있으나, **목적과 결과**에 차이가있다.  

**배열 셋팅**  
아래의 배열 하나에 forEach와 map을 적용해보자.    
```javascript
const arr = [1, 2, 3, 4, 5]
```

**forEach 실행 결과**  
1. 배열 arr의 첫 번째 요소 1을 꺼낸다. -> 콜백 실행 (a = 1)  
2. 콜백 안에서 `return a * 2`가 실행된다. -> forEach는 반환값을 저장하지 않아서 2가 버려짐  
3. 두번째 요소 2를 꺼낸다. -> 콜백 실행 후 반환값은 버려짐 반복  

위와 같은 과정을 거쳐서 결국에 반환값들은 모두 버려지기 때문에 forEach는 undefined를 반환한다.  

```javascript
const foreachArr = arr.forEach((a, b, c) => { return a * 2 })

console.log(`foreachArr: ${foreachArr}`)
```

**map 실행 결과**  
1. 배열 arr의 첫 번째 요소 1을 꺼낸다. -> 콜백 실행 (a = 1)  
2. 콜백 안에서 `return a * 2`가 실행된다. -> map은 새 배열을 만들어서 반환값을 첫 번째 값으로 저장한다.  
3. 두번째 요소 2를 꺼낸다. -> 콜백 실행 후 반환값을 두 번째 값으로 저장한다.  

위와 같은 과정을 거쳐서 map에는 각 요소에 2를 곱한 결과인 새배열 [2, 4, 6]이 저장된다.  

```javascript
const mapArr = arr.map((a, b, c) => { return a * 2 })

console.log(`mapArr: ${mapArr}`)
```

**여기서 잠깐! console 결과 출력시에는 mapArr: 2,4,6 이라고 출력된다.**  
콘솔 출력 명령어인 console.log()에 템플릿 문자열(` `)을 사용했기 때문이다.   

템플릿 문자열 안에 ${}를 사용하면, 그 안에 있는 변수나 표현식의 값을 문자열로 변환하여 출력한다.  
변수 mapArr에는 '배열'이 담겨있고, JS는 내부적으로 toString() 메서드를 실행한다.  
```javascript
mapArr.toString()
```
toString()으로 변환 시 각 요소를 쉼표로 구분한 문자열을 반환한다.  
