var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 열거형 정의
var GenderType;
(function (GenderType) {
    GenderType["Male"] = "male";
    GenderType["Female"] = "female";
    GenderType["Other"] = "other";
})(GenderType || (GenderType = {}));
function getInfo(id) {
    console.log('학생 정보 가져오기 : ID - ' + id);
    return {
        stdId: id,
        stdName: "John",
        // age: 20, --> 선택적 프로퍼티이므로 생략 가능
        gender: GenderType.Male, // 열거형 사용
        course: "Computer Science",
        completed: false
    };
}
getInfo(1234);
// Student 인터페이스 구현
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 9999;
        this.stdName = 'lee';
        this.gender = 'male';
        this.course = 'Computer Science';
        this.completed = true;
    }
    MyStudent.prototype.setName = function (name) {
        this.stdName = name;
        console.log('이름 설정 : ' + this.stdName);
    };
    MyStudent.prototype.getName = function () {
        console.log('이름 가져오기 : ' + this.stdName);
    };
    return MyStudent;
}());
var myInstance = new MyStudent();
myInstance.setName("nogglee");
myInstance.getName();
var item;
function convertToString(value) {
    // 타입 가드
    if (typeof value === 'string') {
        item = 0;
    }
    else {
        item = value;
    }
    console.log(String(item));
    return String(item);
}
function convertToNumber(value) {
    return Number(value);
}
convertToString(123);
convertToString("123");
// 배열 타입
var numArray = [1, 2, 3, 4, 5];
var strArray = ["a", "b", "c"];
// 배열의 유니온 타입
var mixedArray = [1, "a", 2, "b"];
// 읽기 전용 배열 (수정 불가)
var readOnlyArray = [1, 2, 3, 4, 5];
// 튜플 (타입 순서 지정)
var greeting = [1, "hello", true];
// 인덱스로 접근
for (var i = 0; i < greeting.length; i++) {
    console.log(greeting[i]);
}
// 스프레드 연산자
var firstArray = [1, 2, 3];
var secondArray = [4, 5, 6];
var thirdArray = __spreadArray(__spreadArray([], firstArray, true), secondArray, true);
console.log(thirdArray);
