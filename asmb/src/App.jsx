import { useState } from 'react'
import Header from './components/Header'
import { languages } from './languages'
import { clsx } from 'clsx'

function App() {

  //state trzymający dane dot. hasła w grze

  const [currentWord, setCurrentWord] = useState('react')

  //utworzenie state przetrzymującego litery podawane przez gracza w trakcie rozgrywki
  
  const [guessedLetters, setGuessedLetters] = useState([])

  //zmienna przetrzymująca ilość błędnie podanych liter

  const wrongLetterCount = guessedLetters.filter( letter => !currentWord.includes(letter)).length

  // języki programowania wyświetlane na froncie apliakcji

  const langEl = languages.map( (langObj,index) => {

    const langLost = index < wrongLetterCount

    const displayStyle = {
      background: langObj.backgroundColor,
      color: langObj.color
    }

    return(
      <span key={langObj.name} style={displayStyle} className={clsx("single-language", langLost && 'lost')}>{langObj.name}</span>
    )
  })

  //tworzenie elementu wyświetlającego hasło w grze

  const currentWordArr = currentWord.split('') //tworzenie tablicy na podstawie state podanego dla currentWord

  const currentWordEl = currentWordArr.map((letter,index) => {

    return(
      <span key={index} className="single-letter">{guessedLetters.includes(letter) ? letter : null}</span>
    )
  })

  //funkcja obsługująca dodawanie litery do tablicy guessedLetters, zabezpieczenie na możliwość pojedynczego podania litery

  function selectLetter(letter){
    if(!guessedLetters.includes(letter))
    setGuessedLetters(prevGuessedLetters => {
      return [...prevGuessedLetters, letter]
      })
  }

  //zmienna określająca warunek kiedy gra jest przegrana

  const isGameLost = wrongLetterCount === languages.length - 1

  //zmienna określająca kiedy gra jest wygrana

  const isGameWin = !isGameLost && currentWordArr.every( letter => guessedLetters.includes(letter))

  //zmienna określająca warunkowe wyświetlanie przycisku NEW GAME (kiedy jest koniec gry)

  const isGameOver = isGameLost || isGameWin

  // ustawienia dot. klawiatury w aplikacji

  const aplhabet = 'abcdefghijklmnopqrstuvwxyz'

  const alphabetArr = aplhabet.split('') // utworzenie tablicy ze zmiennej aplhabet

  const keyboardEl = alphabetArr.map( letter => {

    const isLetterGuessed = guessedLetters.includes(letter)
    const isLetterCorrect = isLetterGuessed && currentWord.includes(letter)
    const isLetterWrong = isLetterGuessed && !currentWord.includes(letter)

    return(
      <button 
        onClick={() => selectLetter(letter)} 
        key={letter} 
        className={clsx("keyboard-single-button", isLetterCorrect && 'correct', isLetterWrong && 'wrong')} 
        disabled={isGameOver}
      >
          {letter}
      </button>
    )
  })

  //funkcja obsługująca rozpoczęcie nowej gry

  function newGame(){
    setGuessedLetters([])
  }

  //funkcja obsługująca status gry

  function renderStatusGame(){

    if(!isGameOver){
      return null
    }

    if(isGameWin){
      return(
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    } else {
      return(
        <>
          <h2>Game Over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    }
  }

  return (
    <main>
      <Header />

      <section className={clsx("game-status", isGameWin && 'win', isGameLost && 'lost')}>
        {renderStatusGame()}
      </section>

      <section className="languages">
        {langEl}
      </section>

      <section className="current-word">
        {currentWordEl}
      </section>

      <section className="keyboard-section">
        {keyboardEl}
      </section>

      {isGameOver && <button onClick={newGame} className="new-game-button">NEW GAME</button>}
    </main> 
  )
}

export default App

/*
Przegląd projektu:

A. Layout
  1. utworzenie nagłowka zgodnego z projektem na FIGMA (ZROBIONE)
  2. Utworzenie sekcji ze statusem gry (na ten moment dane dot. statusu gry będą wprowadzone na sztywno) (ZROBIONE)
  3. Utworzenie sekcji z językami programowania (ZROBIONE)
  4. Utowrzenie sekcji z hasłem do odgadnięcia(na ten moment hasło wprowadzono na sztywno) (ZROBIONE)
  5. Utworzenie klawiatury do podawania liter (ZROBIONE)
  6. Utworzenie przycisku "New Game" umożliwiającego rozpoczęcie gry (ZROBIONE)

B. Działanie
  1.kliknięcie wybranej litery z klawiatury zapisuje ją w tablicy do tego stworzonej (ZROBIONE)
  2.można podać jedną literę z klawiatury tylko raz (ZROBIONE)
  3.jeżeli litera jest poprawna klawisz zmienia tło na zielone, jeżeli jest błędna to zmienia kolor na czerwony (ZROBIONE)
  4. Jeżeli litera jest poprawna to wyświetla się w polu hasła, jeżeli jest błędna w polu hasła nic nie zostaje wyświetlone. (ZROBIONE)
  5. Utworzenie zmiennej przetrzymującej ilość błędnie typowanych liter (ZROBIONE)
  7. Jeżeli błędnie podano literę to tracony jest kolejny język programowania (ZROBIONE)
  8. Po podaniu określonej ilości błędnych liter gra zostaje zakończona (GameOver) (ZROBIONE)
  9. Określenie warunku kiedy gra jest wygrana (ZROBIONE)
  10. Blokowanie klawiatury w momencie gdy isGameOver === true (ZROBIONE)
  11. Warunkowe wyświetlanie przycisku NEW GAME (ZROBIONE)
  12. Możliwość rozpoczęcia nowej gry po naciśnięciu przycisku "NEW GAME" (ZROBIONE)
  13. W momencie podania błędnej litery oprócz utraty języka, w sekcji statusu gry wyświetlane jest pożegnanie danego języka 
  14. Jeżeli gra jest wygrana okno statusu gry jest odpowiednio obsłużone
  15. Jeżeli gra jest przegrana okno statusu gry jest odpowiednio obsłużone
  16. Słowo do odgadnięcia jest losowane i przy każdej grze jest inne
*/