function myFunction() {
    alert("myFunction 버튼 클릭(1)");
    alert("myFunction 버튼 클릭(2)");
    alert("myFunction 버튼 클릭(3)");
}

function popId() {
    const id = document.querySelectorAll(".login_input")[0];
    
    if(!id.value) { alert("아이디를 입력해주세요."); return; }
    alert(id.value);
}

function login() {
    alert("로그인 버튼 클릭");
}