import React, {useEffect} from 'react'
import {BrowserRouter, useParams} from 'react-router-dom'
import logo from './logo-1.png';
import cn from 'classnames'
import './App.css';
import AppRoutes from "./routes";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <header className={cn('header pr-4 pl-4 flex relative flex-wrap')}>
                    <div className="flex-initial w-auto  mr-16">
                        <div className="flex relative flex-wrap  h-full  content-center"><img className={"h-16"}
                                                                                              src={logo} alt="XM"/>
                        </div>
                    </div>
                </header>
                <div className="App">
                    <AppRoutes/>
                </div>
            </BrowserRouter>


        </div>

    );
}

export default App;
