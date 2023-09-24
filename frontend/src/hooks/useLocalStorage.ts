import { useState } from 'react'

function useLocalStorage<T>(keyName: string, defaultValue: T | null) {
	
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = window.localStorage.getItem(keyName)
			if (value) {
				return JSON.parse(value)
			} else {
				window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
				return defaultValue
			}
		} catch (err) {
			return defaultValue
		}
	})

	function setValue(newValue: T) {
		window.localStorage.setItem(keyName, JSON.stringify(newValue))
		setStoredValue(newValue)
	}

	return [storedValue, setValue]
}

export default useLocalStorage