import { create } from 'zustand'

interface StoreState {
  chances: string[];
  indexToUpdate: number;
  gameOver: boolean;
  solution: string;
  update: (word: string | null) => void; // eslint-disable-line
  submit: () => void;
}

export const useWordleStore = create<StoreState>()( ( set ) => ( {
  chances: new Array( 6 ).fill( '' ),
  gameOver: false,
  indexToUpdate: 0,
  solution: 'fruit',
  submit: () =>
    set( ( state ) => {
      if ( 5 !== state.chances[state.indexToUpdate].length || 5 === state.indexToUpdate ) {
        return state
      }
      return ( {
        gameOver: 4 === state.indexToUpdate,
        indexToUpdate: state.indexToUpdate + 1,
      } )
    } ),
  update: ( letter: string | null ) =>
    set( ( state ) => {
      if ( 5 === state.chances[state.indexToUpdate].length ) {
        return state
      }

      if ( !letter ) {
        state.chances[state.indexToUpdate] = state.chances[
          state.indexToUpdate
        ].slice( state.chances[state.indexToUpdate].length - 1 )
        return { chances: [ ...state.chances ] }
      }

      state.chances[state.indexToUpdate] += letter

      return { chances: [ ...state.chances ] }
    } ),
} ) )
