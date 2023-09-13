import { useState, useCallback, useContext } from 'react';
import { WORDS, randomWord } from '../utils/words';
import wordContext from '../utils/context';

export const usePlayer = () => {
  const {setCurrentWord} = useContext(wordContext);
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    word: WORDS[0].word,
    collided: false,
  });

  //update player position
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  //reset player position from top
  const resetPlayer = useCallback(() => {
    const newWord = randomWord().word;
    setPlayer({
      pos: { x: 30 / 2 - 3, y: 0 },
      word: newWord,
      collided: false,
    });
    setCurrentWord(newWord[0].join(''));
  }, [setCurrentWord]);

  return [player, updatePlayerPos, resetPlayer];
};