import { AddToCartReturn } from "@commercelayer/react-components/lib/reducers/OrderReducer"
import { useState, useRef, useEffect } from "react"

export const useAddToCartFeedback = (feedbackDelay = 3000) => {
  const [justAdded, setJustAdded] = useState(false)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  // temporarly disabling button to trigger some UI feedback
  useEffect(() => {
    if (justAdded) {
      timeoutId.current = setTimeout(() => {
        setJustAdded(false)
      }, feedbackDelay)
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [justAdded])

  // we take the handleClick function from react-components in order
  // to handle some async feedback
  const handleOnAddFeedback = async (addToCartFn: () => AddToCartReturn) => {
    const { success } = await addToCartFn()
    setJustAdded(Boolean(success))
  }

  return {
    justAdded,
    handleOnAddFeedback,
  }
}
