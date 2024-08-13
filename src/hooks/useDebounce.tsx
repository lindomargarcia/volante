import { useState, useRef } from "react";
import { Timeout } from "react-number-format/types/types";

const useDebounce = ({callback, timeout}: {callback?: (value: any) => void, timeout: number}) => {
    const [debouncedValue, setDebouncedValue] = useState()
    const debounceTimeoutId = useRef<Timeout | null>(null);

    const debounce = (value: any) => {
        if(debounceTimeoutId.current) {
            clearTimeout(debounceTimeoutId.current);
        }
        debounceTimeoutId.current = setTimeout(() => {
            setDebouncedValue(value)
            callback && callback(value);
        }, timeout)
    }

    return [debouncedValue, debounce] as const
}

export default useDebounce;