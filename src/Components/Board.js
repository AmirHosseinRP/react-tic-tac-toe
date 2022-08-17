import React, {createContext, useEffect, useState} from "react";
import {Box, Grid, Stack} from "@mui/material";
import './boardStyleSheet.css';
import Place from "./Place";
import Piece from "./Piece";

export const PiecesContext = createContext(undefined);
export const XTurnContext = createContext(undefined);
export const IsGameOver = createContext(undefined);
export const PiecesCount = createContext(undefined);

const Board = () => {

    const [insidePieces, setInsidePieces] = useState([
        <Piece pos={1} type={'e0'}/>, <Piece pos={2} type={'e1'}/>, <Piece pos={3} type={'e2'}/>,
        <Piece pos={4} type={'e3'}/>, <Piece pos={5} type={'e4'}/>, <Piece pos={6} type={'e5'}/>,
        <Piece pos={7} type={'e6'}/>, <Piece pos={8} type={'e7'}/>, <Piece pos={9} type={'e8'}/>
    ]);
    const [xTurn, setXTurn] = useState(true);
    const [winner, setWinner] = useState('');
    const [piecesCount, setPiecesCount] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkWin = () => {
        if (!winner) {
            for (let i = 0; i < 9; i++) {
                if (
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[0].props.type === insidePieces[1].props.type &&
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[1].props.type === insidePieces[2].props.type ||
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[3].props.type === insidePieces[4].props.type &&
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[4].props.type === insidePieces[5].props.type ||
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[6].props.type === insidePieces[7].props.type &&
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[7].props.type === insidePieces[8].props.type ||
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[0].props.type === insidePieces[3].props.type &&
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[3].props.type === insidePieces[6].props.type ||
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[1].props.type === insidePieces[4].props.type &&
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[4].props.type === insidePieces[7].props.type ||
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[2].props.type === insidePieces[5].props.type &&
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[5].props.type === insidePieces[8].props.type ||
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[0].props.type === insidePieces[4].props.type &&
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[4].props.type === insidePieces[8].props.type ||
                    // eslint-disable-next-line no-mixed-operators
                    insidePieces[2].props.type === insidePieces[4].props.type &&
                    insidePieces[4].props.type === insidePieces[6].props.type
                ) {
                    if (xTurn) {
                        setWinner('O Won');
                    } else {
                        setWinner('X Won');
                    }
                } else if (piecesCount === 9) {
                    setWinner('Draw');
                }
            }
        }
    }

    useEffect(() => {
        checkWin()
    },);

    return (
        <>
            <Box sx={{padding: '2rem'}}>
                <Stack spacing={2}>
                    <Stack className={'board'}>
                        <PiecesCount.Provider value={[piecesCount, setPiecesCount]}>
                            <PiecesContext.Provider value={[insidePieces, setInsidePieces]}>
                                <XTurnContext.Provider value={[xTurn, setXTurn]}>
                                    <IsGameOver.Provider value={winner}>
                                        <Grid container>
                                            <Place placeNum={0}>{insidePieces[0]}</Place>
                                            <Place placeNum={1}>{insidePieces[1]}</Place>
                                            <Place placeNum={2}>{insidePieces[2]}</Place>
                                        </Grid>
                                        <Grid container>
                                            <Place placeNum={3}>{insidePieces[3]}</Place>
                                            <Place placeNum={4}>{insidePieces[4]}</Place>
                                            <Place placeNum={5}>{insidePieces[5]}</Place>
                                        </Grid>
                                        <Grid container>
                                            <Place placeNum={6}>{insidePieces[6]}</Place>
                                            <Place placeNum={7}>{insidePieces[7]}</Place>
                                            <Place placeNum={8}>{insidePieces[8]}</Place>
                                        </Grid>
                                    </IsGameOver.Provider>
                                </XTurnContext.Provider>
                            </PiecesContext.Provider>
                        </PiecesCount.Provider>
                    </Stack>
                    <Box>
                        {!winner && <h1>{xTurn ? "its X turn" : 'its O turn'}</h1>}
                        {winner && <h1>{winner}</h1>}
                    </Box>
                </Stack>
            </Box>
        </>
    )
}

export default Board;