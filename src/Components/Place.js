import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import './placeStyleSheet.css';
import {PiecesContext, PiecesCount} from "./Board";
import {XTurnContext} from "./Board";
import {IsGameOver} from "./Board";
import Piece from "./Piece";

let tempPiecesCount = 0;

const Place = (props) => {
    const [insidePieces, setInsidePieces] = useContext(PiecesContext);
    const [xTurn, setXTurn] = useContext(XTurnContext);
    const winner = useContext(IsGameOver);
    const [oTurn, setOTurn] = useState(false);
    const pieceNum = props.placeNum;
    // eslint-disable-next-line no-unused-vars
    let [piecesCount,setPiecesCount] = useContext(PiecesCount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const randomPlacement = () => {
        let rndPlace = Math.floor(Math.random() * 9);
        if (insidePieces[rndPlace].props.type !== 'x' && insidePieces[rndPlace].props.type !== 'o') {
            putPiece(rndPlace);
        } else randomPlacement();
    }

    useEffect(() => {
        setTimeout(function() {
            if (oTurn && !winner && piecesCount < 9) {
                randomPlacement();
            }
        }, 200);
    }, [insidePieces, oTurn, piecesCount, randomPlacement, winner]);


    const putPiece = (loc) => {
        if (!winner && insidePieces[loc].props.type !== 'x' && insidePieces[loc].props.type !== 'o') {
            if (xTurn) {
                const newArr = {...insidePieces};
                newArr[loc] = <Piece pos={loc} type={'x'}/>
                setInsidePieces(newArr);
                setXTurn(false);
                setOTurn(true);
            } else {
                const newArr = {...insidePieces};
                newArr[loc] = <Piece pos={loc} type={'o'}/>
                setInsidePieces(newArr);
                setXTurn(true);
                setOTurn(false);
            }
            tempPiecesCount++;
            setPiecesCount(tempPiecesCount);
        }
    }
    return (
        <Grid
            className={'place'}
            item xs={4}
            onClick={() => putPiece(pieceNum)}
        >{props.children}</Grid>
    );
}

export default Place;