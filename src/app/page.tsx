import './globals.css'

export default function Home() {
  const cells = new Array( 5 ).fill( '' ), rows = new Array( 6 ).fill( '' )

  return (
    <main className='h-screen flex flex-col'>
      <header className='header'>WORDLE</header>

      <section className='app-container'>
        {
          rows.map( ( r, i ) => (
            <div className='row' key={ i }>
              {cells.map( ( c, j ) => (
                <div className='cell' key={ j }></div>
              ) )}
            </div>
          ) )
        }
      </section>
    </main>
  )
}
