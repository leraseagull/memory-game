import { FC } from "react";
import './Popup.css';

interface Props {
    messages: string[];
    onClick: () => void;
}


const Popup: FC<Props> = ({ messages, onClick }) =>  {
    return (
        <div className="overlay">
            <div className="popup">
                {messages.map((text) => (
                    <p key={text} className="popup__message">{text}</p>
                ))}
                <button className="popup__button" type="button" onClick={onClick}>
                    Сыграть еще
                </button>
            </div>
        </div>
    );

}

export default Popup;