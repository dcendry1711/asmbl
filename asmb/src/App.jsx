import { useState } from 'react'
import Header from './components/Header'
import { languages } from './languages'

function App() {

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

  //state trzymający dane dot. hasła w grze

  const [currentWord, setCurrentWord] = useState('react')

  const currentWordArr = currentWord.split('') //zmiana state current word na tablicę z elementami w postaci liter hasła

  const currentWordEl = currentWordArr.map((letter,index) => {
    return(
      <span key={index} className="single-letter">{letter}</span>
    )
  })

  // ustawienia dot. klawiatury w aplikacji

  const aplhabet = 'abcdefghijklmnopqrstuvwxyz'

  const alphabetArr = aplhabet.split('') // utworzenie tablicy ze zmiennej aplhabet

  const keyboardEl = alphabetArr.map( letter => {
    return(
      <button key={letter} className="keyboard-single-button">{letter}</button>
    )
  })

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

      <button className="new-game-button">NEW GAME</button>
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
  6. Utworzenie przycisku "New Game" umożliwiającego rozpoczęcie gry

B. Działanie
  1.do ustalenia
*/