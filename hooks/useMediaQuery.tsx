'use client'
import { useState, useEffect } from 'react';

function useMediaQuery(query:string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a media query list for the specified query
    const mediaQueryList = window.matchMedia(query);

    // Update matches state based on the media query's current value
    const updateMatch = () => setMatches(mediaQueryList.matches);
    updateMatch();

    // Listen for changes to the media query's evaluation
    mediaQueryList.addEventListener('change', updateMatch);

    // Cleanup function to remove the event listener on component unmount
    return () => mediaQueryList.removeEventListener('change', updateMatch);
  }, [query]); // Re-run the effect only if the query changes

  return matches;
}

export default useMediaQuery;
