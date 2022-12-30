import {useEffect, useState} from 'react';
import './App.css';
import Card from '../Card/Card';
import Popup from '../Popup/Popup';
import { ICard } from '../../types';

import nginx from '../../images/Nginx.svg';
import nodejs from '../../images/NodeJS.svg';
import react from '../../images/React.svg';
import redux from '../../images/Redux.svg';
import square from '../../images/Square.svg';
import ts from '../../images/TS.svg';
import tulip from '../../images/Tulip.svg';
import ws from '../../images/Webstorm.svg';


const cardImages = [nginx, nodejs, react, redux, square, ts, tulip, ws]

const MAX_MOVES = 40;

const App = () => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [moves, setMoves] = useState(0);
    const [choiceOne, setChoiceOne] = useState<ICard | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<ICard | null>(null);
    const [disabled, setDisabled] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => 0.5 - Math.random())
            .map((url, index) => ({id: index + 1, src: url,  matched: false }))

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setMoves(0);
        setMessages([]);
    }

    const handleChoice = (card: ICard) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                const updatedCards = cards.map((card) => {
                    return card.src === choiceOne.src ? {...card, matched: true} : {...card};
                })
                setTimeout(() => {
                    setCards(updatedCards);
                    resetMove();
                }, 1000)
            } else {
                setTimeout(resetMove, 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    useEffect(() => {
        if (moves >= MAX_MOVES) {
            setMessages(['Увы, вы проиграли', 'У вас закончились ходы']);
        }
    }, [moves]);

    useEffect(() => {
        if (cards.length > 0 && cards.every((card) => card.matched)) {
            setMessages(['Ура, вы выиграли!', `это заняло ${moves} ходов`]);
        }
    }, [cards]);


    const resetMove = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setMoves(prevMoves => prevMoves + 1);
        setDisabled(false);
    }

    useEffect(() => {
        shuffleCards()
    }, [])


    return (
        <div className="App">
            {messages.length > 0 && (
                <Popup messages={messages} onClick={shuffleCards}/>)}
            <header className="header">
                <h1 className="title">Memory</h1>
            </header>
            <main className="main">
                <div className="counter">
                    <p>Сделано ходов</p>
                    <p className="counter__number">{moves}</p>
                </div>
                <div className="cards">
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            flipped={card === choiceOne || card === choiceTwo || card.matched}
                            disabled={choiceOne !== null && choiceTwo !== null}
                        />
                    ))}
                </div>
                <div className="counter">
                    <p>Осталось попыток </p>
                    <p className="counter__number">{MAX_MOVES - moves}</p>
                </div>
            </main>
        </div>
    )
}

export default App;