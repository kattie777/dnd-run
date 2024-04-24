import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRifle } from '@fortawesome/free-solid-svg-icons'
import './EscapeItemMonster.sass';


class EscapeItemMonster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runnersMove: this.props.continue % 2 === 0,
            dice: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value            
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.continue !== prevProps.continue) {
            this.setState({ runnersMove: this.props.continue % 2 === 0 });
            this.onContinue();
        }
        if (this.state.dice !== prevState.dice) {
            this.props.onMonstersMove(this.state.dice);
        }
    }
    
    onContinue = () => {
        if (!this.state.runnersMove) {
            this.props.onMonstersMove(this.state.dice);
            this.setState({ dice: '' });
        } 
    }

    render() {       
        return (
            <div className="escape_items_wrapper">
                <div className='second_wrapper'>                
                    <FontAwesomeIcon className="monster" icon={faPersonRifle} size="2xl" style={{ color: "#ffffff", }} />
                    <input disabled={this.state.runnersMove}
                        name='dice'
                        type="text"
                        className="dice"
                        value={this.state.dice}
                        onChange={this.onValueChange}
                    /> 
                </div>
            </div>
        )
    }
}



export default EscapeItemMonster;