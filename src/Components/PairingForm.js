import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGameName } from '../redux/actions/boardGame'
import { setLiquorType } from '../redux/actions/liquorSearch'
import '../Styles/PairingForm.css'
import { useNavigate } from 'react-router'
import apiCalls from '../apiCalls'

const PairingForm = () => {

    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [ error, setError ] = useState('')

    const games = useSelector(state => state.boardGame.allGamesData.games)
    const type = useSelector(state => state.liquorSearch.liquorSearchWord)
    const gameName = useSelector(state => state.boardGame.currentGameName)

    const gameNames = games.map((game) => {
        return (
            <option key={game.id} value={game.name} />
        )
    })

    const findRandomDrink = (event) => {
        event.preventDefault()
        apiCalls.getDrinkByType(type)
            .then(data => {
                if (data.drinks) {
                    let randomNum = Math.floor(Math.random() * data.drinks.length)
                    const drinkObj = data.drinks[randomNum]
                    const gameObj = games.find(game => game.name === gameName)
                    navigate(`/${gameObj.id}/${drinkObj.idDrink}`)
                } else {
                    setError(data.message)
                }
            })
    }

    return (
        <div aria-label="Game and Drink Pairing Section" className='loading-page-bottom'>
            <div className='circular-image'>
                <img alt="Group of friends sitting at a table playing Jenga and drinking beers" src={require('../assets/anh1.png')} />
            </div>
            <form aria-label="Choose Your Game and Liquor" className='game-liquor-input pairing-form' data-cy='pairing-form' title='Game and Liquor Form'>
                <label htmlFor='game-choice' data-cy='pairing-form' className='game-input' title='Game Input'>
                    <input aria-required="true" className='game-dropdown' data-cy='game-choice' id='game-choice' placeholder='Choose Game!' list='games' onChange={(event) => dispatch(setGameName(event.target.value))}/>
                        <datalist id='games'>
                            {gameNames}
                        </datalist>
                </label>
                <label htmlFor='liquor-choice' data-cy='pairing-form' className='liquor-input'>
                    <input aria-required="true" className ='liquor-dropdown' data-cy='liquor-choice' list='liquors' id='liquor-choice' placeholder='Choose drinking?' onChange={(event) => dispatch(setLiquorType(event.target.value))}/>
                      <datalist id='liquors' >
                          <option value='Vodka' />
                          <option value='Gin' />
                          <option value='Rum' />
                          <option value='Whiskey' />
                          <option value='Bourbon' />
                          {/* <option value='Tequila' />
                          <option value='Scotch' /> */}
                      </datalist>
                </label>
                    <button aria-label="Pair" className='pair-button' data-cy='pair-button' onClick={(event) => findRandomDrink(event)}><span>Combine</span></button>
                    <button aria-label="View Favorites" className='favorites-button' data-cy='favorites-page-button' onClick={() => {navigate('/favorites')}}>Heart</button>
            </form>
        </div>
    )
}

export default PairingForm