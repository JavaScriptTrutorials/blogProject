import { MainPage, Menu, MainContent } from "./MainPageStyles";

const MainPageComponent = (props) => {

    return (
        <MainPage>
            <div className="container">
            <Menu />
            <MainContent className='main'>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
            </MainContent>
            </div>
        </MainPage>
    );
};

export default MainPageComponent;