export const loadGameData = (data) => {
    return {
        type: "LOAD_GAME_DATA",
        payload: data
    }
}

export const findGame = (data) => {
    return {
        type: "FIND_GAME",
        payload: data
    }
}

export const setGameName = (data) => {
    return {
        type: "SET_GAME_NAME",
        payload: data
    }
}

