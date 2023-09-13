import React, { useEffect, useState } from "react";

import { createStage, checkCollision } from "../utils/helper";
import styled from "styled-components";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useScore } from "../hooks/useScore";

// Components
import { Footer, Header, Stage } from "../components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useStopwatch } from "../hooks/useStopwatch";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [minutes, seconds] = useStopwatch();

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage, phrasesFormed] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows] = useScore(phrasesFormed);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
      setGameOver(true);
      setDropTime(null);
    }
  }, [minutes, seconds]);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (rows + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setRows(0);
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
    }
  };

  return (
    <TetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <Header score={score} />
      <Stage stage={stage} />
      <Footer
        moveDown={() => drop()}
        moveLeft={() => movePlayer(-1)}
        moveRight={() => movePlayer(1)}
        startGame={() => startGame()}
        openHint={() => handleOpen()}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You need to form following phrases to earn{" "}
            <span style={{ color: "green" }}>score</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul>
              <li>WE DESIGN AND DEVELOP APPLICATIONS</li>
              <li>THAT RUN THE WORLD AND</li>
              <li>SHOWCASE THE FUTURE</li>
            </ul>
          </Typography>
        </Box>
      </Modal>
      {/* game over modal */}
      <Modal
        open={gameOver}
        onClose={() => setGameOver(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, textAlign: "center" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p style={{ color: "red" }}>GAME OVER!!</p>
            Your score is: {score}
          </Typography>
        </Box>
      </Modal>
    </TetrisWrapper>
  );
};

export default Tetris;

const TetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0d252c;
  background-size: cover;
`;
