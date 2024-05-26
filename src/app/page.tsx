'use client'
import { useCallback, useEffect } from 'react'
import './globals.css'
import { useWordleStore } from './store'

export default function Home() {
  const { chances, update, submit } = useWordleStore()

  const cells = new Array( 5 ).fill( '' ), rows = new Array( 6 ).fill( '' )

  // console.log( 33 )

  const handleKeyPress = useCallback( ( e: KeyboardEvent ) => {
    if( /^[a-zA-Z]$/.test( e.key ) ) {
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
  }, [ update, submit ] )

  useEffect( () => {
    document.addEventListener( 'keyup', handleKeyPress )

    return () => {
      document.removeEventListener( 'keyup', handleKeyPress )
    }
  }, [ handleKeyPress ] )

  return (
    <main className='h-screen flex flex-col'>
      <header className='header'>WORDLE</header>

      <section className='app-container'>
        {
          rows.map( ( r, i ) => (
            <div className='row' key={ i }>
              {cells.map( ( c, j ) => (
                <div className='cell' key={ j }>{chances[i][j] ?? ''}</div>
              ) )}
            </div>
          ) )
        }
      </section>
    </main>
  )
}
