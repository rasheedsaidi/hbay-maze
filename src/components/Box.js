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
            break;
        case 1:
            return <img className="item-img" src={require('../images/ball.png')} />;
            break;
        case 2:
            return <img className="item-img doll" src={require('../images/doll.png')} />;
            break;
        default:
            return '';
            break;
    }
}

export default Box;