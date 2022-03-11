import { useLayoutEffect } from 'react'
import create from 'zustand'
import createContext from 'zustand/context'
import shallow from 'zustand/shallow'

type TStoreState = {
  error: any
  loading: boolean
}

let store

const initialState: TStoreState = {
  error: {},
  loading: false,
}
const zustandContext = createContext()

export const Provider = zustandContext.Provider
export const useStore = zustandContext.useStore

export const initializeStore = (preloadedState = {}) => {
  return create((set: any, get: any) => ({
    ...initialState,
    ...preloadedState,
    setError: (error: any) => {
      set({ error })
    },
    resetError: () => {
      set({ error: {} })
    },
    toggleLoading: (loading: boolean) => {
      set({
        loading: !!loading,
      })
    },
  }))
}

export const useCreateStore = (initialState) => {
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState)
  }

  store = store ?? initializeStore(initialState)

  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      })
    }
  }, [initialState])

  return () => store
}

export const useLoading = () => {
  return useStore(
    (store: any) => ({
      loading: store.loading,
      toggleLoading: store.toggleLoading,
    }),
    shallow
  )
}

export const useError = () => {
  return useStore(
    (store: any) => ({
      error: store.error,
      setError: store.setError,
      resetError: store.resetError,
    }),
    shallow
  )
}
