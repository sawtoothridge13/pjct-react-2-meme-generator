import './App.css';
import { saveAs } from 'file-saver';
import { useState } from 'react';

const baseURL = 'https://api.memegen.link/images/';

export default function App() {
  const [memeName, setMemeName] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  // function for clearing meme input field
  function clearTemplate(event) {
    event.currentTarget.value = '';
  }

  // function for handling enter key
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setMemeName(event.currentTarget.value);
    }
  }

  function download() {
    if (bottomText && topText && memeName) {
      saveAs(`${baseURL}${memeName}.jpg`, 'new-meme');
    }
  }

  return (
    <div className="App">
      <header>Meme Generator</header>
      <div className="userInput">
        <label>
          Meme template
          <input onClick={clearTemplate} onKeyDown={handleKeyDown} />
        </label>

        <label>
          Top text
          <input
            onChange={(event) => {
              setTopText(event.currentTarget.value);
            }}
          />
        </label>

        <label>
          Bottom text
          <input
            onChange={(event) => {
              setBottomText(event.currentTarget.value);
            }}
          />
        </label>
      </div>
      <div className="image">
        <img
          data-test-id="meme-image"
          src={
            memeName !== '' && topText === '' && bottomText === ''
              ? `${baseURL}${memeName}.jpg`
              : memeName === '' && topText !== '' && bottomText === ''
              ? `${baseURL}preview/${topText}.jpg`
              : memeName === '' && topText !== '' && bottomText !== ''
              ? `${baseURL}preview/${topText}/${bottomText}.jpg`
              : memeName !== '' && topText !== '' && bottomText === ''
              ? `${baseURL}${memeName}/${topText}.jpg`
              : memeName !== '' && topText !== '' && bottomText !== ''
              ? `${baseURL}${memeName}/${topText}/${bottomText}.jpg`
              : `${baseURL}preview.jpg`
          }
          alt="meme"
        />
      </div>
      <button onClick={download}>Download</button>
    </div>
  );
}

/* import './App.css';
import nodeEmoji from 'node-emoji';
import { useState } from 'react';

export default function App() {
  // 1. Create a state variable and setter, with
  // a default value of a random emoji
  const [emoji, setEmoji] = useState(nodeEmoji.random().emoji);
  const [emojiName, setEmojiName] = useState('');
  const hasError = emojiName !== '' && !nodeEmoji.hasEmoji(emojiName);

  // const [hasError, setHasError] = useState(false);

  return (
    <div className="App">
      <div>
        {emoji}
        <br />
        <button
          onClick={() => {
            // 3. Generate and set a new value for the emoji
            const newEmoji = nodeEmoji.random().emoji;
            setEmoji(newEmoji);
          }}
        >
          Generate
        </button>
        <br />
        <input
          value={emojiName}
          onChange={(event) => {
            setEmojiName(event.currentTarget.value);
            if (nodeEmoji.hasEmoji(event.currentTarget.value)) {
              // setHasError(false);
              setEmoji(nodeEmoji.find(event.currentTarget.value).emoji);
              // } else {
              //   setHasError(true);
            }
          }}
        />{' '}
        {hasError && 'x'}
      </div>
    </div>
  );
} */
