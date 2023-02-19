import React from 'react';
import { uniqueNamesGenerator, names, adjectives, colors, starWars, animals } from 'unique-names-generator';

function GenerateRandomNameButton({ setFormInput, type, wordSize }) {

  const config = {
  dictionaries: [names, adjectives, starWars, animals, colors],
  style: 'lowerCase',
  separator: '-',
  length: wordSize,
}

  const generate = () => {
    const randomName = uniqueNamesGenerator(config);
    setFormInput((oldFormInput) => {
      return {
        ...oldFormInput,
        [type]: randomName
      }});
    console.log(randomName);
  }

  return (
    <button type="button" onClick={generate} className='generate-btn'>Generate</button>
  );
}

export default GenerateRandomNameButton;