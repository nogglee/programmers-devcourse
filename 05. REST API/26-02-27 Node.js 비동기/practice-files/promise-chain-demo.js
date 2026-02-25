let promise = new Promise((resolve, reject) => { setTimeout(() => resolve("완료!"), 3000) })
.then
(
    (result) => 
    {
        console.log(result)
        return result + "!!!";
    },
    (error) => console.log(error)
)
.then
(
    (result) => 
    {
        console.log(result)
        return result + "!!!!!!";
    },
    (error) => console.log(error)
)
.then
(
    (result) => console.log(result),
    (error) => console.log(error)
)