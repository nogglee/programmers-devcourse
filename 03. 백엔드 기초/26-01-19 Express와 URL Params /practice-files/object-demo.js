let nodejsBook = 
{
    title: "Node.js를 공부해보자",
    price: 20000,
    description: "Node.js를 공부하는 데 필요한 모든 것을 포함한 책"
};

function print(book)
{
    console.log("책 제목: " + book.title);
    console.log("책 가격: " + book.price + "원");
    console.log("책 설명: " + book.description);
}

print(nodejsBook);