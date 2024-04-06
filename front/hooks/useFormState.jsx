import { useState, useEffect, useRef } from 'react';

function UseFormState(
  answered,
  hasJoined,
  invalidInput,
  onEnter,
  playing,
  submitSignal
) {
  const inputBox = useRef(null);
  const NAME_MAX_LENGTH = 10;
  const ANSWER_MAX_LENGTH = 12; // see also app.go
  const INPUT_MIN_LENGTH = 2;
  const [inputText, setInputText] = useState('');
  const [maxLength, setMaxLength] = useState(NAME_MAX_LENGTH);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [isValidInput, setIsValidInput] = useState(true);
  const [badChar, setBadChar] = useState(null);

  useEffect(() => {
    const regex = /[^a-z '-]+/i;
    const test = inputText.match(regex);
    if (test) {
      setBadChar(test[0]);
    } else {
      setBadChar(null);
    }
    setIsValidInput(!test);
  }, [inputText]);

  useEffect(() => {
    if (answered) {
      inputBox.current.blur();
    }
  }, [answered]);

  useEffect(() => {
    if (hasJoined) {
      setMaxLength(ANSWER_MAX_LENGTH);
    }
  }, [hasJoined]);

  useEffect(() => {
    if (submitSignal) {
      onEnter(inputText.slice(0, ANSWER_MAX_LENGTH));
      setInputText('');
    }
  }, [inputText, onEnter, submitSignal]);

  useEffect(() => {
    setDisableSubmit(
      inputText.length < INPUT_MIN_LENGTH ||
        inputText.length > maxLength ||
        answered ||
        invalidInput ||
        !isValidInput ||
        (hasJoined && !playing)
    );
  }, [
    inputText,
    maxLength,
    answered,
    invalidInput,
    isValidInput,
    hasJoined,
    playing,
  ]);

  return {
    ANSWER_MAX_LENGTH,
    badChar,
    disableSubmit,
    inputBox,
    inputText,
    isValidInput,
    NAME_MAX_LENGTH,
    setInputText,
  };
}

export default UseFormState;
