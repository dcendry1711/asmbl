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

    </main> 
  )
}

export default App

/*
Przegląd projektu:

A. Layout
  1. utworzenie nagłowka zgodnego z projektem na FIGMA (ZROBIONE)
  2. Utworzenie sekcji ze statusem gry (na ten moment dane dot. statusu gry będą wprowadzone na sztywno) (ZROBIONE)
  3. Utworzenie sekcji z językami programowania 
  4. Utowrzenie sekcji z hasłem do odgadnięcia
  5. Utworzenie klawiatury do podawania liter
  6. Utworzenie przycisku "New Game" umożliwiającego rozpoczęcie gry

B. Działanie
  1.do ustalenia
*/