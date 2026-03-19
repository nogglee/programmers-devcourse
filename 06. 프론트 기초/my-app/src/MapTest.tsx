const MapTest = () =>
{
    const fruits = ['apple', 'banana', 'orange'];
    const title : string = '과일 목록';

    return(
        <div className="container">
            <h1>{title}</h1>
            <div className="board">
                <ul>
                    {fruits.map((fruit, index) => <li key={index}>{fruit}</li>)}
                </ul>        
            </div>
        </div>
    );
}

export default MapTest;