let stdId : number = 1111;
let stdName : string = "John";
let age : number = 20;
let gender : string = "male";
let course : string = "Computer Science";
let competed : boolean = false;

/*
function getInfo(id : number) : 
{
    stdId: number;
    stdName: string;
    age: number;
    gender: string;
    course: string;
    completed: boolean;
}
{
    return {
        stdId: id,
        stdName: "John",
        age: 20,
        gender: "male",
        course: "Computer Science",
        completed: false
    };
}

위의 함수를 아래와 같이 타입과 함수를 분리
*/

// enum은 상수를 정의할 때 사용
enum GenderType
{
    Male = "male",
    Female = "female",
    Other = "other"
}

// interface는 객체의 구조를 정의할 때 사용
interface Student
{
    stdId: number;
    stdName: string;
    age?: number; // 변수 뒤에 '?'를 붙이면 선택적 프로퍼티가 됨
    gender: GenderType;
    course: string;
    completed: boolean;

    // setName(name: string): void;        일반 함수
    setName : (name: string) => void;   // 화살표 함수
}

class MyStudent implements Student
{
    stdId = 0;
    stdName = "";
    gender = GenderType.Male;
    course = "";
    completed = false;

    setName = (name: string) : void => {
        this.stdName = name;
        console.log('이름 설정 : ' + this.stdName);
    };
}

const myInstance = new MyStudent();
myInstance.setName("nogglee");

// 가져오기
// function getInfo(id : number) : Student
// {
//     return{
//         stdId: id,
//         stdName: "John",
//         // age: 20, --> 선택적 프로퍼티이므로 생략 가능
//         gender: GenderType.Male,
//         course: "Computer Science",
//         completed: false
//     };
// }

// let std = {
//     stdId : 3333,
//     stdName : "Jane",
//     gender : GenderType.Female,
//     course : "Mathematics",
//     completed : true
// };

// 설정하기
// function setInfo(student : Student) : void
// {
//     console.log(student);
// }

// setInfo(std);
