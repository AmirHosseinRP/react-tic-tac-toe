import React from 'react';
import './pieceStyleSheet.css';

const Piece = (props) => {
    return (
        <>
            {props.type === 'x' && <h1 className={'piece'}>X</h1>}
            {props.type === 'o' && <h1 className={'piece'}>O</h1>}
        </>
    );
}

export default Piece;