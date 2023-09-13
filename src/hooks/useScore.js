import { useState, useEffect, useCallback } from 'react';

export const useScore = phrasesFormed => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);

  const phrasePoints = [100, 200, 300, 400, 500, 500, 700, 800];

  const calcScore = useCallback(() => {
    // We have score
    if (phrasesFormed > 0) {
      // calculated score based on number of phrases formed
      setScore(prev => prev + phrasePoints[phrasesFormed - 1]);
      setRows(prev => prev + phrasesFormed);
    }
  }, [phrasePoints, phrasesFormed]);

  useEffect(() => {
    calcScore();
  }, [calcScore, phrasesFormed, score]);

  return [score, setScore, rows, setRows];
};