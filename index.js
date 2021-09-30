#!/usr/bin/env node

import cliSpinners from 'cli-spinners';
import ora from 'ora';

import {
    getParsedExercises,
    handleExerciseQuestionnaire,
} from './src/index.js';

const README_URL_sudheerj =
    'https://raw.githubusercontent.com/sudheerj/javascript-interview-questions/master/README.md';

const README_URL_lydiahallie =
    'https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md';

const run = async () => {
    const spinner = ora({
        text: 'Fetching README.md',
        spinner: cliSpinners.dots,
    });
    spinner.start();
    const exercises = await getParsedExercises(README_URL_sudheerj);
    spinner.stop();
    let currentExerciseIndex = 0;
    let shouldContinue = await handleExerciseQuestionnaire(
        exercises[currentExerciseIndex]
    );
    while (shouldContinue) {
        currentExerciseIndex++;
        if (currentExerciseIndex === exercises.length) {
            console.log('Great Job! You finished all the exercies!');
            break;
        }
        shouldContinue = await handleExerciseQuestionnaire(
            exercises[currentExerciseIndex]
        );
    }
    console.log('See you next time!');
};

run();
