// import {
//   configureStore,
//   createSlice,
//   combineReducers,
//   PayloadAction
// } from '@reduxjs/toolkit'
// import {
//   useDispatch,
//   useSelector,
//   TypedUseSelectorHook
// } from 'react-redux'
// import _ from "lodash"
// import Config from "./../config"
// import $ from "jquery"

// export const appRedux = createSlice({
//   name: 'appConfig',
//   initialState: {
//     appState: Config.APP_LOADING_STATE,
//     windowState: Config.WINDOW_NOMAL_STATE,
//     token: null,
//     email: null,
//   },
//   reducers: {
//     setAppLoaded: (state) => {
//       state.appState = Config.APP_LOGIN_STATE
//     },
//     changeWindowState: (state, action) => {
//       let newState = action.payload
//       if ([Config.WINDOW_NOMAL_STATE, Config.WINDOW_MAX_STATE, Config.WINDOW_MIN_STATE].includes(newState)) {
//         newState = newState === state.windowState ? Config.WINDOW_NOMAL_STATE : newState
//         if (newState === Config.WINDOW_MAX_STATE) {
//           $("body").addClass("podorder-ext-app-max")
//         } else {
//           $("body").removeClass("podorder-ext-app-max")
//         }
//         state.windowState = newState
//       }
//     },
//     setToken: (state, action) => {
//       state.token = action.payload
//     },
//     setEmail: (state, action) => {
//       state.email = action.payload
//     }
//   },
// })

// export const {
//   setAppLoaded,
//   changeWindowState,
//   setToken,
//   setEmail
// } = appRedux.actions
// const store = configureStore({
//   reducer: {
//     appConfig: appRedux.reducer
//   },
// })


// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export default store