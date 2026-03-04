const string = '{ "username" : "nogglee" }';

try 
{ 
    const json = JSON.parse(string); 
    if(!json.name) { throw new SyntaxError("입력 값에 이름이 없습니다.") }
    else { console.log(json.name) }

    let name = json.name;
    console.log(json); 

}
catch (err) { console.log(`name : ${err.name}`); console.log(`message : ${err.message}`) }