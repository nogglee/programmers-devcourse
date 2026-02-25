let promise = new Promise(function(resolve, reject){ 
    return setTimeout(() => resolve("완료!"), 3000);
 });

promise.then
(
    function(result) { console.log(result) },
    function(error) {  }
)