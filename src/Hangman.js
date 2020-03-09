import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import { randomWord } from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      primed: false
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleWin = this.handleWin.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    let doodle = this.state.answer
      .split('')
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
    return doodle;
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    console.log(this.state.answer);
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }
  handleWin() {
    if (this.guessedWord().join('') === this.state.answer) {
      return (
        <div>
          <h1>YOU WON!!!</h1>
          <button className='wacka' onClick={this.handleClick}>
            Play again
          </button>
        </div>
      );
    }
  }
  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    const myStr = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return myStr.map((ltr, idx) => (
      <button
        className='buttonx'
        key={idx}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  handleClick() {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  }
  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`Wrong guesses ${this.state.nWrong}/6`}
        />
        <h3>Wrong guesses: {this.state.nWrong}</h3>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {this.handleWin()}
        {this.state.nWrong !== this.props.maxWrong && (
          <p className='Hangman-btns'>{this.generateButtons()}</p>
        )}

        {this.state.nWrong === this.props.maxWrong && (
          <div>
            <p>You lose, the correct word was '{this.state.answer}'</p>
            <button className='wacka' onClick={this.handleClick}>
              Play again
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Hangman;
