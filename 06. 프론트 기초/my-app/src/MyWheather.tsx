import { Component } from 'react';

interface MyProps{
    weather : string;
    children : React.ReactNode;
}

// const MyWeather : React.FC<MyProps> = (props) => {
//     const { weather, children } = props;

//     return(
//         <div>
//             오늘의 날씨는 {weather} 입니다.
//             {children}
//         </div>
//     )
// }

class MyWeather extends Component<MyProps>{
    render(){
        const { weather, children } = this.props;

        return(
            <div>
                오늘의 날씨는 {weather} 입니다.
                {children}
            </div>
        )
    }
}

export default MyWeather;