import React from 'react';

let Box = (props) => {

    return (
        <button key={props.id} mode={props.mode} className="box">
            {setContent(props.mode)}
        </button>
    );
}

let setContent = (state) => {
    switch(state) {
        case 0:
            return '';
        case 1:
            return <img className="item-img" alt="Ball to be picked" src={require('../images/ball.png')} />;
        case 2:
            return <img className="item-img doll" alt="Doll object picking balls" src={require('../images/doll.png')} />;
        default:
            break;
    }
}

export default Box;