import * as React from 'react'
import { AxiosRequestConfig } from 'axios'
import axios from '@/utils/axios'
const { useState, useEffect, useReducer, useRef } = React
interface State {
  isLoading: boolean
  isError: boolean
  data: any
}

interface Action {
  type: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE'
  payload?: any
}

const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      throw new Error()
  }
}

/**
 * 使用useFetchData请求，维护当前请求内部的一个reducer
 * @param initialAxiosOptions
 * @param initialData
 *
 * @returns [State, Function]
 * state:reducer对象，维护请求状态，包含isLoading,isError,data三个属性
 * Function:请求的方法，实例化后可以在外部调用
 */
const useFetchData = <U, T>(
  initialAxiosOptions: AxiosRequestConfig,
  initialData?: T
): [State, Function] => {
  const [axiosOptions, setAxiosOptions] = useState(initialAxiosOptions)
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData === undefined ? {} : initialData,
  })
  const [sign, setSign] = useState(0)
  const [loop, setLoop] = useState(0)
  const timer = useRef(0)

  useEffect(() => {
    return () => {
      if (loop) {
        clearInterval(timer.current)
        setLoop(0)
      }
    }
  }, [sign])

  const doFetch = (options: AxiosRequestConfig, loop: number = 0) => {
    return new Promise((resolve, reject) => {
      const currSign = sign
      const currOptions = Object.assign(axiosOptions, options)
      const fetchData = async () => {
        dispatch({ type: 'FETCH_INIT' })
        try {
          const result = await axios(currOptions)
          if (sign === currSign) {
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            resolve(result.data)
          }
        } catch (e) {
          if (sign === currSign) {
            dispatch({ type: 'FETCH_FAILURE' })
            reject(e)
          }
        }
      }
      if (loop) {
        fetchData()
        timer.current = window.setInterval(fetchData, loop)
      } else {
        fetchData()
      }
      setAxiosOptions(currOptions)
      setLoop(loop)
      setSign(sign + 1)
    })
  }

  return [state, doFetch]
}

export default useFetchData
