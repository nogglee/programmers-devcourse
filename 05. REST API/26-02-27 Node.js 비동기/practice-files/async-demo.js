async function f() { return 3; }

f().then
(
    (result) => console.log("promise resolve : ", result),
    (error) => console.log("promise reject : ", error)
)