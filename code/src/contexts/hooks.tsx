import { useEffect, useRef } from 'react'
import {
    useMeQuery,
} from './../graphql/graphql'
import { find } from 'lodash'

export function usePreviousValue(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export const useCheckAuth = (pollInterval: number = 0) => {
    const { data, loading, error } = useMeQuery({
        pollInterval
    })

    if (error && error?.graphQLErrors && find(error?.graphQLErrors, s => s.message === 'unauthorized')) {
        return { data: null, loading }
    }

    return { data, loading, error }
}