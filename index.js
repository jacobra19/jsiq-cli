import fetch from 'node-fetch';
import cliMd from 'cli-markdown';
import fs from 'fs';

const README_URL =
    'https://raw.githubusercontent.com/sudheerj/javascript-interview-questions/master/README.md';

const run = async () => {
    const readme = await getFile(README_URL);
    const exercisesStrs = getExercisesStrs(readme);
    const exercises = exercisesStrs.map(parseExercise).filter(Boolean);
    const json = JSON.stringify(exercises, null, 4);
    console.log(`exercises.length`, exercises.length);
    fs.writeFile('output.json', json, 'utf8', (err) => {
        if (err) {
            console.log(`error`, err);
        }
        fs.readFile('output.json', 'utf8', (err, data) => {
            if (err) {
                console.log(`error`, err);
            }
            const exercises = JSON.parse(data);
            console.log(`exercises length`, exercises.length);
            console.log(cliMd(exercises[50].fullQuestion));
            exercises[50].options.map((option) => console.log(cliMd(option)));
            console.log(`exercises[50]`, cliMd(exercises[50].answer.full));
        });
    });
};

const getFile = async (url) => {
    const response = await fetch(url);
    const text = await response.text();
    return text;
};

const getExercisesStrs = (readme) => {
    const exercisesSection = readme.split('### Coding Exercise')[1];
    const exercises = [
        ...exercisesSection.split('**[⬆ Back to Top](#table-of-contents)**'),
    ];
    return exercises;
};

const getOptions = (exerciseStr) => {
    const options = [];
    let iterator = 1;
    let shouldContinue = true;
    while (shouldContinue) {
        let option = exerciseStr
            ?.split(`- ${iterator}: `)?.[1]
            ?.split('\n')?.[0];
        console.log(`option`, option);
        if (!option) {
            shouldContinue = false;
        } else {
            options.push(option);
            iterator++;
        }
    }
    return options;
};

const parseExercise = (exerciseStr, index) => {
    try {
        const question = exerciseStr.split('####')[1].split('\n')[0];
        const fullQuestion = exerciseStr.split('####')[1].split('- 1:')[0];
        const answer = {
            index: parseInt(
                exerciseStr.split('##### Answer:')[1].split('\n')[0]
            ),
            full: exerciseStr.split('</summary>')[1].split('</details>')[0],
        };
        // TODO: add logic to parse options with defferent options sizes

        const options = getOptions(exerciseStr);

        return {
            question,
            fullQuestion,
            answer,
            options,
        };
    } catch (error) {
        console.log(index, `error.message`, error.message);
        return null;
    }
};

run();
