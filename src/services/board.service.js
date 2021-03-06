import axios from 'axios'
import API_URL from '../config'

export const getBoard = async (boardId) => {
    try {
        const board = await axios.get(`${API_URL}/api/boards/${boardId}`)
        return board.data
    }
    catch (error) {
        throw error.response
    }
}

export const postBoard = async (board) => {
    try {
        const newBoard = await axios.post(`${API_URL}/api/boards/`, board)
        return newBoard.data
    }
    catch (error) {
        throw error.response
    }
}

export const addMemberBoard = async (boardId, username) => {
    try {
      const addedMember = await axios.put(`${API_URL}/api/boards/addMember`, {boardId, username})
      return addedMember.data
    }
    catch (error) {
      throw error.response
    }
  }

export const addTeamBoard = async (boardId, name) => {
    try {
      const addedTeam = await axios.put(`${API_URL}/api/boards/addTeam`, {boardId, name})
      return addedTeam.data
    }
    catch (error) {
      throw error.response
    }
  }