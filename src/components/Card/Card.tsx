import { FC } from 'react';
import { ICard } from '../../types';
import './Card.css';
import back from '/src/images/cover.svg'

interface Props {
    card: ICard,
    flipped: boolean,
    disabled: boolean,
    handleChoice: (card: ICard) => void;
}

const Card: FC<Props> = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }

    return (
        <div className="card">
            {!card.matched ? (
                <>
                    <div className={flipped ? "flipped" : ""}>
                        <img className="front" src={card.src} alt="card front" />
                        <img
                            className="back"
                            onClick={handleClick}
                            src={back}
                            alt="card back" />
                    </div>
                </>
            ) : null}
        </div>
    )
};

export default Card;