# 학습내용

### 01. CSS

> **CSS:**. 
> Cascading. Style Sheets의 약자로, HTML을 꾸며주는 언어이다.  
> HTML Element 단위로 스타일 요소를 적용할 수 있다.  

‘폭포처럼 위에서 아래로 흐른다’의 의미가 적용된 이유를 알아보자.  

CSS 적용 시 우리가 직접 작성한 ‘사용자 지정 스타일’ 외에도 브라우저(Chrome, Safari 등)가 제공하는 ‘기본 스타일’도 존재한다.  
다양한 선택자에 스타일을 부여 하면서 ‘사용자 지정 스타일’ 내에서도 규칙이 겹칠 수 있다.  

HTML Element에 직접 스타일을 적용하거나, class 또는 id 속성에 규칙을 준 것들이 겹쳐서 충돌이 일어날 수 있다. 이러한. 충돌을 해결하기 위해 우선순위가 필요했고, 마지막으로 선언된 최종 스타일이 최우선순위로 적용된다.  
위와 같은 철학이 담겨있기 때문에 ‘Cascading’ 이라는 단어와 Style Sheets가 조합된 ‘CSS’라는 하나의 언어가 탄생했다.  

**HTML에 CSS를 적용하는 방법**

- inline: HTML Element에 직접 style을 선언한다.
    
    ```jsx
    <Tag style="color: red; font-size: 25px;">태그에 스타일을 직접 선언해요.</Tag>
    ```
    
- internal style sheets: HTML 문서에 style 태그를 선언하고 style태그 내에 작성한다.
    
    ```jsx
    <!DOCTYPE html>
    <html>
    	<head>
    		<meta charset="UTF-8">
    		<title>제목 영역이에요.</title>
    		<style>
    			TagName {
    				color: red;
    				font-size: 25px;
    			}
    			.ClassName {
    				padding: 10px;
    			}
    			#IdName {
    				margin: 10px;
    			}
    		</style>
    	</head>
    </html>
    ```
    
- external style sheets: HTML 문서 밖에 css 포맷 파일을 작성하고 HTML파일과 연결한다.
    
    ```jsx
    <!DOCTYPE html>
    <html>
    	<head>
    		<meta charset="UTF-8">
    		<title>제목 영역이에요.</title>
    		<link rel="stylesheet" href="fileName.css">
    		</style>
    	</head>
    </html>
    ```
    

### 02. Javasciprt

**Javascript:**  
> 특정 HTML 요소를 선택하여 제어할 수 있는 스크립트 언어  

스크립트 언어란, 독립적인 프로그램을 개발할 수 있는 언어가 아닌, 프로그램을 ‘컨트롤’ 하는 스크립트 역할을 하는 언어이다.  
최근 빠르게 발전하는 프로그램 실행환경 덕분에 스크립트 언어 만으로도 충분히 프로그래밍이 가능하게 되었다.  

JS도 CSS와 마찬가지로, HTML에 적용하는 방법은 총 3가지. 

- inline
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>로그인</title>
    </head>
    <body>
        <div class="container">
            <h1>로그인</h1>
            <form>
    						...
                <input type="button" value="로그인" id="login_button" class="login_button" onclick="alert('로그인 버튼 클릭')">
            </form>
        </div>
    </body>
    </html>
    ```
    
- internal style sheets
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>로그인</title>
    </head>
    <body>
        <div class="container">
            <h1>로그인</h1>
            <form>
                ...
    	            <input type="button" value="로그인" id="login_button" class="login_button" onclick="login()">
            </form>
            <script>
                function login() {
                    alert("로그인 버튼 클릭");
                }
            </script>
        </div>
    </body>
    </html>
    ```
    
- external style sheets
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>로그인</title>
        <script type="text/javascript" src="loginFunction.js"></script>
    </head>
    <body>
        <div class="container">
            <h1>로그인</h1>
            <form>
                ...
    	            <input type="button" value="로그인" id="login_button" class="login_button" onclick="login()">
            </form>
        </div>
    </body>
    </html>
    ```
    

JS에서 특정 태그를 찾는 방법은 아래와 같다.  

- class로 찾기: document.getElementByClassName(’클래스. 이름’)
- id로 찾기: document.getElementById(’아이디’)
- tagName으로 찾기: document.getElementByTagName(’태그. 이름’)

---

### 03. Function

> **function:**. 
> 특정 기능을 수행하는 코드 덩어리. 

JS 함수 작성 시 변수를 선언하여 조건문을 작성할 수 있다.  
긴 코드 조각을 변수에 담아서 사용하면, 중복으로 코드를 작성할 필요가 없어서 가독성이 좋아지고, 코드 재사용으로 효율성이 높아진다.  

JS에서 사용 가능한 변수 선언 키워드는 총 3가지(var, let, const)이다. 각 키워드의 특징은 아래와 같다.  
- var: 중복 선언과 재할당 가능. 마지막에 할당된 값이 변수에 저장됨
- let: 중복 선언 불가능. 재할당 가능.
- const: 중복 선언 불가능. 재할당 불가능. 첫 선언 시 초기화 값을 반드시 입력해야 함.

## 실습결과

1. myFunction code

   <img width="589" height="357" alt="image" src="https://github.com/user-attachments/assets/e1617c19-5b08-4bbd-9ce5-8d8c08ab4bec" />

2. popId result

   <img width="895" height="881" alt="image" src="https://github.com/user-attachments/assets/3c8983de-20c2-4230-b4b7-9e5737c4d1d4" />

