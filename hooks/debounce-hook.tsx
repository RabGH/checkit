import { useEffect, useState } from "react";

interface useDelayStateProps {
  initialValue: string;
  delay: number;
  callback?: (value: string) => void;
}

// A custom hook that updates the state after a delay
export function useDelayedState({
  initialValue,
  delay,
  callback,
}: useDelayStateProps) {
  // Use the useState hook to store the current value and the setter function
  const [value, setValue] = useState(initialValue);

  // Use the useEffect hook to handle the timeout logic
  useEffect(() => {
    // Create a timer that will update the value after the delay
    const timer = setTimeout(() => {
      // Update the value
      setValue(value);
      // Call the callback function if provided
      if (callback) {
        callback(value);
      }
    }, delay);

    // Return a cleanup function that will clear the timer
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, callback]);

  // Return the current value and the setter function
  return [value, setValue];
}
