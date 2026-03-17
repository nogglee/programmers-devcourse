var stdId = 1111;
var stdName = "John";
var age = 20;
var gender = "male";
var course = "Computer Science";
var competed = false;
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
var GenderType;
(function (GenderType) {
    GenderType["Male"] = "male";
    GenderType["Female"] = "female";
    GenderType["Other"] = "other";
})(GenderType || (GenderType = {}));
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        var _this = this;
        this.stdId = 0;
        this.stdName = "";
        this.gender = GenderType.Male;
        this.course = "";
        this.completed = false;
        this.setName = function (name) {
            _this.stdName = name;
            console.log('이름 설정 : ' + _this.stdName);
        };
    }
    return MyStudent;
}());
var myInstance = new MyStudent();
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
