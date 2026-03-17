// 열거형 정의
enum GenderType
{
    Male = "male",
    Female = "female",
    Other = "other"
}

function getInfo(id : number) : Student
{
    console.log('학생 정보 가져오기 : ID - ' + id);

    return{
        stdId: id,
        stdName: "John",
        // age: 20, --> 선택적 프로퍼티이므로 생략 가능
        gender: GenderType.Male, // 열거형 사용
        course: "Computer Science",
        completed: false
    };
}

getInfo(1234);

// Student 인터페이스 정의
interface Student
{
    stdId : number;
    stdName? : string;
    age? : number; // 변수 뒤에 '?'를 붙이면 선택적 프로퍼티가 됨
    gender? : 'male' | 'female'; // 리터럴 타입
    course? : string;
    completed? : boolean;

    setName? : (name : string) => void;   // 화살표 함수
    getName? : () => void;
}

// Student 인터페이스 구현
class MyStudent implements Student
{
    stdId = 9999;
    stdName = 'lee';
    gender : 'male' | 'female' = 'male';
    course = 'Computer Science';
    completed = true;

    setName(name : string) : void {
        this.stdName = name;
        console.log('이름 설정 : ' + this.stdName);
    }
    getName() : void {
        console.log('이름 가져오기 : ' + this.stdName);
    }
}

const myInstance = new MyStudent();
myInstance.setName("nogglee");
myInstance.getName();

// 유니온 타입
type StrOrNum = number | string;
let item : number;

function convertToString(value : StrOrNum) : string {
    
    // 타입 가드
    if(typeof value === 'string') {
        item = 0;
    }else{
        item = value;
    }
    console.log(String(item));

    return String(item);
}

function convertToNumber(value : StrOrNum) : number {
    return Number(value);
}

convertToString(123);
convertToString("123");

// 배열 타입
let numArray : number[] = [1, 2, 3, 4, 5];
let strArray : string[] = ["a", "b", "c"];

// 배열의 유니온 타입
let mixedArray : (number | string)[] = [1, "a", 2, "b"];

// 읽기 전용 배열 (수정 불가)
let readOnlyArray : ReadonlyArray<number> = [1, 2, 3, 4, 5];

// 튜플 (타입 순서 지정)
let greeting : [number, string, boolean] = [1, "hello", true];

// 인덱스로 접근
for(let i = 0; i < greeting.length; i++) {
    console.log(greeting[i]);
}

// 스프레드 연산자
let firstArray : number[] = [1, 2, 3];
let secondArray : number[] = [4, 5, 6];
let thirdArray = [...firstArray, ...secondArray];
console.log(thirdArray);
