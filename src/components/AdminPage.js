import React, { useState } from 'react';
import PhaserComponent from './PhaserComponent';

const AdminPage = ({ socket }) => {
  const [clickHistory, setClickHistory] = useState([]);

  const handleButtonClick = (direction) => {
    // Update click history
    setClickHistory((prev) => [...prev, direction]);

    // Notify server about button click
    socket.emit('buttonClick', direction);

    // Inform Phaser to move the ball
    const phaserScene = window.phaserGame?.scene.scenes[0];
    if (phaserScene) {
      phaserScene.bounceTowards(direction);
    }
  };

  return (
    <>
      <div className="game-container">
        <h1 className="game-title">Bouncing Game</h1>
        <div className="game-area">
          <div id="phaser-container" className="phaser-container">
            <PhaserComponent />
          </div>

          <button
            onClick={() => handleButtonClick('Button1')}
            style={{
              position: 'absolute',
              top: '-20px',
              left: '30%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Button 1
          </button>
          <button
            onClick={() => handleButtonClick('Button2')}
            style={{
              position: 'absolute',
              top: '-5%',
              right: '60px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Button 2
          </button>
          <button
            onClick={() => handleButtonClick('Button3')}
            style={{
              position: 'absolute',
              top: '30%',
              right: '-100px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Button 3
          </button>
          <button
            onClick={() => handleButtonClick('Button4')}
            style={{
              position: 'absolute',
              top: '70%',
              right: '-100px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Button 4
          </button>
          <button
            onClick={() => handleButtonClick('Button5')}
            style={{
              position: 'absolute',
              top: '105%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Button 5
          </button>
          <button
            onClick={() => handleButtonClick('Button6')}
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: '30%',
              transform: 'translate(-50%, 50%)',
            }}
          >
            Button 6
          </button>
          <button
            onClick={() => handleButtonClick('Button7')}
            style={{
              position: 'absolute',
              top: '70%',
              left: '-100px',
              transform: 'translate(50%, -50%)',
            }}
          >
            Button 7
          </button>
          <button
            onClick={() => handleButtonClick('Button8')}
            style={{
              position: 'absolute',
              top: '30%',
              left: '-40px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Button 8
          </button>
        </div>

        <div className="click-history">
          <h3>Click History:</h3>
          <p>{clickHistory.join(' -> ')}</p>
        </div>
      </div>
    </>
  );
};

export default AdminPage;