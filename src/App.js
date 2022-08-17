import React, {useEffect} from "react";
import Board from "./Components/Board";

const App = () => {
    useEffect(()=>{
        document.body.style.backgroundColor='cyan';
        document.body.style.display='flex';
        document.body.style.justifyContent='center';
        document.body.style.alignItems='center';

    })
    return (
        <Board/>
    );
}

export default App;