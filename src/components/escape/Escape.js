import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import EscapeItemRunner from '../escapeItem/EscapeItemRunner';
import EscapeItemMonster from '../escapeItemMonster/EscapeItemMonster';
import './Escape.sass';

class Escape extends Component {
    state = {
        amountOfPlayers: localStorage.getItem("amountOfPlayers") ?? 5,
        initialDistanceToPlayers: localStorage.getItem("initialDistanceToPlayers") ?? 35,
        safeDistance: localStorage.getItem("safeDistance") ?? 45,
        deathDistance: localStorage.getItem("deathDistance") ?? 0,
        setInputsDisabled: false,
        continue: 0,
        runnersMove: this.continue % 2 !== 0,
        monstersDice: 0,
        runnerDisplay: 'block'
    }

    onMonstersMove = (meters) => {
        this.setState({ monstersDice: meters });
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    setInputsDisabled = () => {
        this.setState({
            setInputsDisabled: true
        })
    }

    createPlayers = () => {
        this.setInputsDisabled();
        localStorage.setItem('amountOfPlayers', this.state.amountOfPlayers);
        localStorage.setItem('safeDistance', this.state.safeDistance);
        localStorage.setItem('deathDistance', this.state.deathDistance);
        localStorage.setItem('initialDistanceToPlayers', this.state.initialDistanceToPlayers);

    }

    onContinue = () => {
        this.setState((state) => {
            return {
                continue: state.continue + 1,
                runnersMove: this.state.continue % 2 !== 0
            }
        })
    }

    render() {
        const { setInputsDisabled } = this.state;
        return (
            <>
                <Container>
                    <Row>
                        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                            <InputGroup className="mb-3 mt-4">
                            <InputGroup.Text id="running_players_amount">Amount of players</InputGroup.Text>
                                <Form.Control
                                    onChange={this.onValueChange}
                                    name='amountOfPlayers'
                                    disabled={this.state.setInputsDisabled}
                                    className='amount_of_players'
                                    placeholder={this.state.amountOfPlayers}
                                    aria-label="Amount of players"
                                    aria-describedby="running_players_amount"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                            <InputGroup className="mb-3">
                            <InputGroup.Text id="safe">Safe distance</InputGroup.Text>
                                <Form.Control
                                    onChange={this.onValueChange}
                                    name='safeDistance'
                                    disabled={this.state.setInputsDisabled}
                                    className='safe_distance'
                                    placeholder={this.state.safeDistance}
                                    aria-label="Safe distance"
                                    aria-describedby="safe"
                                />
                            </InputGroup>
                        </Col>                        
                    </Row>
                    <Row>
                        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                            <InputGroup className="mb-3">
                            <InputGroup.Text id="init_distance_to_players">Start point</InputGroup.Text>
                                <Form.Control
                                    disabled={this.state.setInputsDisabled}
                                    onChange={this.onValueChange}
                                    name='initialDistanceToPlayers'
                                    className='initial_distance_to_players'
                                    placeholder={this.state.initialDistanceToPlayers}
                                    aria-label="Start point"
                                    aria-describedby="init_distance_to_players"
                                />
                            </InputGroup>
                        </Col>                        
                    </Row>
                    <Row>
                        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                            <InputGroup className="mb-3">
                            <InputGroup.Text id="death_dist">Death distance</InputGroup.Text>
                                <Form.Control
                                    onChange={this.onValueChange}
                                    name='deathDistance'
                                    disabled={this.state.setInputsDisabled}
                                    className='death_distance'
                                    placeholder={this.state.deathDistance}
                                    aria-label="Death distance"
                                    aria-describedby="death_dist"
                                />
                            </InputGroup>
                        </Col>                        
                    </Row>
                    <Row sm={{ span: 10, offset: 1 }}>
                        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                            {setInputsDisabled ? 
                                <Button onClick={this.onContinue} className='btn_continue mb-4' variant="outline-light">Continue</Button>
                                : <Button onClick={this.createPlayers} className='btn_run mb-4' variant="outline-light">Run!</Button>
                            }                              
                        </Col>                                          
                    </Row>
                    <Row>
                        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                            <View setInputsDisabled={this.state.setInputsDisabled}
                                amountOfPlayers={this.state.amountOfPlayers}
                                initialDistanceToPlayers={this.state.initialDistanceToPlayers}
                                contin={this.state.continue}
                                onMonstersMove={this.onMonstersMove}
                                monstersDice={this.state.monstersDice}
                                safeDistance={this.state.safeDistance}
                                deathDistance={this.state.deathDistance}
                            >
                                </View>
                        </Col>                        
                    </Row>
                </Container>

            </>
        )
    }
}

const View = ({ amountOfPlayers, initialDistanceToPlayers, contin, setInputsDisabled, onMonstersMove, monstersDice, safeDistance, deathDistance}) => {
    if (setInputsDisabled) {
        const arr = [];
        for (let i = 0; i < amountOfPlayers; i++) {
            arr.push('');
        }

        const items = arr.map((items, i) => {
            return (
                <li key={i}>
                    <EscapeItemRunner initialDistanceToPlayers={initialDistanceToPlayers}
                        continue={contin}
                        monstersDice={monstersDice}
                        safeDistance={safeDistance}
                        deathDistance={deathDistance}
                        k={i} />
                </li>
            )
        })

        return (
                <ul className='list_item'>
                    {items}
                <EscapeItemMonster initialDistanceToPlayers={initialDistanceToPlayers} continue={contin} onMonstersMove={onMonstersMove} />
                </ul>
        )
    } else return null;
}

export default Escape;