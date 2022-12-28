import {keyboard} from "@testing-library/user-event/dist/keyboard";
import axios from "axios";

const SET_TIMEZONES = "SET-TIMEZONES"
const UPDATE_CURRENT_TIME = "UPDATE-CURRENT-TIME"
const CHANGE_TIMEZONE = "CHANGE-TIMEZONE"
const ADD_WATCH = "ADD-WATCH"
const DELETE_WATCH = "DELETE-WATCH"
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";

let initialState = {
    currentTime: {
        hours: 0,
        minutes: 0,
        seconds: 0
    },
    maxWatchesAmount: 24,
    watchesData: [
        {id: 1, curTimezone: 2},
        {id: 2, curTimezone: 2}
    ],
    timezonesData: [],
    isFetching: true
}

const WatchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TIMEZONES:
            let iD = 1
            const arrTimezones = [...action.timezones]
            arrTimezones.map(t => {
                t.id = iD++
            })
            return {
                ...state,
                timezonesData: arrTimezones
            }
        case ADD_WATCH:
            const length = state.watchesData.length
            //если watchesData пустой, то последний id = 0, иначе id = id последнего эл-та массива
            const last_id = length === 0 ? 0 : state.watchesData[length - 1].id
            let newWatch = {
                id: last_id + 1,
                curTimezone: 2,
            }
            return {
                ...state,
                watchesData: [...state.watchesData, newWatch]
            }
        case DELETE_WATCH:
            const arr = state.watchesData
            arr.map(w => {
                if (w.id === action.id) {
                    arr.splice(arr.indexOf(w), 1)
                }
            })
            return {
                ...state,
                watchesData: arr
            }
        case UPDATE_CURRENT_TIME:
            return {
                ...state,
                currentTime: {...action.object},
            }
        case CHANGE_TIMEZONE:
            const mas = state.watchesData.map((w) => ({
                ...w,
                curTimezone: w.id === action.id ? action.timezone : w.curTimezone
            }))
            return {
                ...state,
                watchesData: mas
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

//блок actionCreators
export const setTimezonesActionCreator = (timezones) => ({type: SET_TIMEZONES, timezones})
export const addWatchActionCreator = () => ({type: ADD_WATCH})
export const deleteWatchActionCreator = (id) => ({type: DELETE_WATCH, id})
export const updateCurrentTimeActionCreator = (object) => ({type: UPDATE_CURRENT_TIME, object})
export const changeTimezoneActionCreator = (timezone, id) => ({type: CHANGE_TIMEZONE, timezone, id})
export const toggleIsFetchingActionCreator = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

//блок thunkCreators
export const getTimezonesThunkCreator = () => {
    alert("Внимание, будет осуществоена загрузка данных.");
    //Thunk
    return (dispatch) => {
        dispatch(toggleIsFetchingActionCreator(true))
        axios.get("https://docs.google.com/document/d/1RaNSSk3yasNttrsyQxjc--60p6aR_BSB8cIDFch2pd8/export?format=txt")
            .then(response => {
                dispatch(setTimezonesActionCreator(response.data))
                dispatch(toggleIsFetchingActionCreator(false))
            })
    }
}
export default WatchReducer