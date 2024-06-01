'use client'
/* eslint-disable sort-keys */
import { useCallback, useEffect } from 'react'
import classNames from 'classnames'

import './globals.css'

import { useWordleStore } from './store'
import { GameStateEnum } from './enums'

export default function Home() {
  const { chances, update, submit, solution, indexToUpdate, gameState }
    = useWordleStore()

  const cells = new Array( 5 ).fill( '' ),
        rows = new Array( 5 ).fill( '' )

  // console.log( 33 )

  const handleKeyPress = useCallback(
    ( e: KeyboardEvent ) => {
      if ( gameState !== GameStateEnum.IN_PROGRESS ) {
        return
      }

      if ( /^[a-zA-Z]$/.test( e.key ) ) {
        update( e.key )
        return
      }

      if ( 'Enter' === e.key ) {
        submit()
        return
      }

      if ( 'Backspace' === e.key ) {
        update( null )
        return
      }
    },
    [ update, submit, gameState ],
  )

  useEffect( () => {
    document.addEventListener( 'keyup', handleKeyPress )

    return () => {
      document.removeEventListener( 'keyup', handleKeyPress )
    }
  }, [ handleKeyPress ] )

  useEffect( () => {
    if ( gameState !== GameStateEnum.IN_PROGRESS ) {
      if ( gameState === GameStateEnum.WIN ) {
        setTimeout( () => {
          alert( 'You win!' )
        }, 400 )
      } else {
        setTimeout( () => {
          alert( 'No Guesses left' )
        }, 400 )
      }
    }
  }, [ gameState ] )

  const x = () => {
    fetch( 'http://localhost:8080/ping' )
      .then( ( res ) => res.json() )
      .then( ( data ) => console.log( { data } ) )
  }

  return (
    <main className='h-screen flex flex-col'>
      <header className='header' onClick={ x }>
        WORDLE
      </header>

      <section className='app-container'>
        {rows.map( ( r, i ) => (
          <div className='row l-s' key={ i }>
            {cells.map( ( c, j ) => (
              <div
                className={ classNames( 'cell', {
                  'l-s': 0 === j,
                  'lm-s': 1 === j,
                  'm-s': 2 === j,
                  'rm-s': 4 === j,
                  'r-s': 5 === j,
                  close:
                    indexToUpdate > i
                    && chances[i][j] !== solution[j]
                    && solution.includes( chances[i][j] ),
                  correct: indexToUpdate > i && chances[i][j] === solution[j],
                } ) }
                key={ j }
              >
                {chances[i][j] ?? ''}
              </div>
            ) )}
          </div>
        ) )}
      </section>
    </main>
  )
}
