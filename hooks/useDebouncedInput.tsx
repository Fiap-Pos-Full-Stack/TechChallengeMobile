import { useState, useEffect, useCallback, useRef } from 'react';

const useDebouncedInput = ( defaultInput = '', debounceTime = 750) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(defaultInput)
    const timerRef = useRef<NodeJS.Timeout>();
  
    const onChange = useCallback((text:any) => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setDebouncedValue(text), debounceTime);

    },[])
    const cancelAll = useCallback( ()=> {
      clearTimeout(timerRef.current)

    },[])
  
    return [debouncedValue, onChange,cancelAll] as const;
  }
  
  export default useDebouncedInput