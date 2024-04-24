import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import { faSkull } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import './EscapeItemRunner.sass';


class EscapeItemRunner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remain: this.props.initialDistanceToPlayers,
            runnersMove: this.props.continue % 2 === 0,
            dice: '',
            monstersDice: 0,
            escaped: false,
            dead: false
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.continue !== prevProps.continue) {
            this.onContinue();
        }
        if (this.props.monstersDice !== prevProps.monstersDice) {
            this.setState({ monstersDice: this.props.monstersDice });
        }
        if (this.state.remain !== prevState.remain) {
            if (this.state.remain >= this.props.safeDistance) {
                this.setState({ escaped: true });
            } else if (this.state.remain <= this.props.deathDistance) {
                this.setState({ dead: true });
            }
        }
    }

    onContinue = () => {
        if (this.state.runnersMove) {
            this.setState((state) => {
                return {
                    runnersMove: this.props.continue % 2 === 0,
                    remain: Number(state.remain) + Number(state.dice),
                    dice: '',
                }
            }) 
        } else {            
            this.setState((state) => {
                return {
                    runnersMove: this.props.continue % 2 === 0,
                    remain: Number(state.remain) - this.state.monstersDice,
                    dice: '',
                }
            })    
        }
    }

    render() {  
        return (
            <div className="escape_items_wrapper">
                <div className='second_wrapper'>                
                    <Icon remain={this.state.remain}
                        disabled={!this.state.runnersMove}
                        value={this.state.dice}
                        onChange={this.onValueChange} 
                        deathDistance={this.props.deathDistance}
                        safeDistance={this.props.safeDistance}
                        dead={this.state.dead}
                        escaped={this.state.escaped}
                    />
                </div>
            </div>
        )
    }
}

const Icon = ({ remain, disabled, value, onChange, deathDistance, safeDistance, dead, escaped }) => {
    if (escaped) {
        return (
            <>
                <FontAwesomeIcon className="escaped" icon={faThumbsUp} size="2xl" style={{ color: "#ffffff", }} />
                <label className='remain label' htmlFor="">{remain}</label>
                <input
                    disabled={true}
                    name='dice'
                    type="text"
                    className="dice"
                    value=''
                /> 
            </>
        )
    } else if (dead) {
        return (
            <>
                <FontAwesomeIcon className="dead" icon={faSkull} size="2xl" style={{ color: "#ffffff", }} />
                <label className='remain label' htmlFor="">{remain}</label>
                <input
                    disabled={true}
                    name='dice'
                    type="text"
                    className="dice"
                    value=''
                /> 
            </>
        )
    } else return (
        <>
            <FontAwesomeIcon className="runner" icon={faPersonRunning} size="2xl" style={{ color: "#ffffff", }} />
            <label className='remain' htmlFor="">{remain}</label>
            <input disabled={disabled}
                    name='dice'
                    type="text"
                    className="dice"
                    value={value}
                    onChange={onChange}
            /> 
        </>
    )   
}


export default EscapeItemRunner;
