import { create } from 'zustand'
import { GameStateEnum } from './enums'

interface StoreState {
  chances: string[];
  indexToUpdate: number;
  gameState: GameStateEnum;
  solution: string;
  update: (word: string | null) => void; // eslint-disable-line
  submit: () => void;
}

export const useWordleStore = create<StoreState>()( ( set ) => ( {
  chances: new Array( 6 ).fill( '' ),
  gameState: GameStateEnum.IN_PROGRESS,
  indexToUpdate: 0,
  solution: 'fruit',
  submit: () =>
    set( ( state ) => {
      if (
        5 !== state.chances[state.indexToUpdate].length
        || 5 === state.indexToUpdate || state.gameState !== GameStateEnum.IN_PROGRESS
      ) {
        return { gameState: GameStateEnum.LOSE }
      }

      let _gameState: GameStateEnum = state.gameState

      if ( state.solution === state.chances[state.indexToUpdate] ) {
        _gameState = GameStateEnum.WIN
      }

      if ( 5 === state.indexToUpdate ) {
        _gameState = GameStateEnum.LOSE
      }

      return {
        gameState: _gameState,
        indexToUpdate: state.indexToUpdate + 1,
      }
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
