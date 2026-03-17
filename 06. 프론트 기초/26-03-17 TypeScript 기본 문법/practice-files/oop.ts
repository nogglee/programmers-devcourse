/*
01. 일반 함수

let empName : string;
let age : number;
let empJob : string;

function printEmp(empName : string, age : number, empJob : string) : void {
    console.log(`${empName}의 나이는 ${age}이고, 직업은 ${empJob}입니다.`);
}

printEmp('nogglee', 30, 'developer');
*/


/*
02. 클래스의 멤버변수(속성)와 멤버함수(메서드)를 활용하여 클래스 밖에서 객체 생성

class Employee
{
    empName : string;
    age : number;
    empJob : string;

    printEmp = () : void => {
        console.log(`${this.empName}의 나이는 ${this.age}이고, 직업은 ${this.empJob}입니다.`);
    }
}

let emp01 = new Employee();
emp01.empName = 'nogglee';
emp01.age = 30;
emp01.empJob = 'developer'
emp01.printEmp();
*/

/*
03. 생성자를 활용하여 객체 생성 시 초기값 설정
class Employee
{
    empName : string;
    age : number;
    empJob : string;

    constructor(empName : string, age : number, empJob : string) {
        this.empName = empName;
        this.age = age;
        this.empJob = empJob;
    }

    printEmp = () : void => {
        console.log(`${this.empName}의 나이는 ${this.age}이고, 직업은 ${this.empJob}입니다.`);
    }
}

let emp01 = new Employee('nogglee', 30, 'developer');
emp01.empName = 'lee';
emp01.printEmp();
*/

/*
04. 접근지정자를 활용한 캡슐화

class Employee
{
    // 접근지정자 private 변수는 앞에 '_'를 붙이는 관례가 있음
    private _empName : string;
    private _age : number;
    private _empJob : string;

    constructor(empName : string, age : number, empJob : string) {
        this._empName = empName;
        this._age = age;
        this._empJob = empJob;
    }

    printEmp = () : void => {
        console.log(`${this._empName}의 나이는 ${this._age}이고, 직업은 ${this._empJob}입니다.`);
    }
}

let emp01 = new Employee('nogglee', 30, 'developer');
// 에러 발생 - private 변수는 외부에서 직접 접근 불가
// --> getter, setter 메서드를 통해 접근해야 함
emp01.empName = 'lee'; // 에러 발생
emp01.printEmp();
*/

// 05. private 변수를 외부에서 읽거나 수정할 수 있도록 getter, setter 메서드 제공
class Employee
{
    // 멤버 변수 선언부를 생성자로 대체 (멤버 변수를 암묵적 선언)
    constructor(
        private _empName : string, 
        private _age : number, 
        private _empJob : string
    ) {
        // 접근지정자로 선언된 멤버 변수는 자동으로 초기화됨
    }

    // private 변수를 외부에서 읽거나 수정할 수 있도록 getter, setter 메서드 제공
    get empName(){
        return this._empName;
    }

    set empName(val : string){
        this._empName = val;
    }

    printEmp = () : void => {
        console.log(`${this._empName}의 나이는 ${this._age}이고, 직업은 ${this._empJob}입니다.`);
    }
}

let emp01 = new Employee('nogglee', 30, 'developer');
emp01.empName = 'lee';
emp01.printEmp();