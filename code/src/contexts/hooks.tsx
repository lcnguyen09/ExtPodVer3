import { useEffect, useRef } from 'react'
import { find } from 'lodash'

export function usePreviousValue(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
