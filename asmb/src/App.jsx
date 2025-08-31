import { useState } from 'react'
import Header from './components/Header'
import { languages } from './languages'
import { clsx } from 'clsx'

function App() {

  //state trzymający dane dot. tego czy gra jest zakończona

  const [isGameOver, setIsGameOver] = useState(false)

  //state trzymający dane dot. hasła w grze

  const [currentWord, setCurrentWord] = useState('react')

  //utworzenie state przetrzymującego litery podawane przez gracza w trakcie rozgrywki
  
  const [guessedLetters, setGuessedLetters] = useState([])

  // języki programowania wyświetlane na froncie apliakcji

  const langEl = languages.map( langObj => {

    const displayStyle = {
      background: langObj.backgroundColor,
      color: langObj.color
    }

    return(
      <span key={langObj.name} style={displayStyle} className="single-language">{langObj.name}</span>
    )
  })

  //tworzenie elementu wyświetlającego hasło w grze

  const currentWordArr = currentWord.split('') //tworzenie tablicy na podstawie state podanego dla currentWord

  const currentWordEl = currentWordArr.map((letter,index) => {

    return(
      <span key={index} className="single-letter">{guessedLetters.includes(letter) ? letter : null}</span>
    )
  })

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
      >
          {letter}
      </button>
    )
  })

  //funkcja obsługująca dodawanie litery do tablicy guessedLetters, zabezpieczenie na możliwość pojedynczego podania litery

  function selectLetter(letter){
    if(!guessedLetters.includes(letter))
    setGuessedLetters(prevGuessedLetters => {
      return [...prevGuessedLetters, letter]
      })
  }

  return (
    <main>
      <Header />

      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
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

      {isGameOver && <button className="new-game-button">NEW GAME</button>} 
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
*/