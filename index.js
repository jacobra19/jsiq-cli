import fetch from 'node-fetch';
import cliMd from 'cli-markdown';

const README_URL =
    'https://raw.githubusercontent.com/sudheerj/javascript-interview-questions/master/README.md';

const run = async () => {
    const readme = await getFile(README_URL);
    const exercisesStrs = getExercisesStrs(readme);
    const exercises = exercisesStrs.map(parseExercise).filter(Boolean);
    console.log(`exercises.length`, exercises.length)
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

const parseExercise = (exerciseStr,index) => {
    try {
        const question = exerciseStr.split('####')[1].split('\n')[0];
        const answer = {
            index: parseInt(exerciseStr.split('##### Answer:')[1].split('\n')[0]),
            full: exerciseStr.split('</summary>')[1].split('</details>')[0],
        };
        // TODO: add logic to parse options with defferent options sizes
        const options = [
            exerciseStr.split('- 1: ')[1].split('\n')[0],
            exerciseStr.split('- 2: ')[1].split('\n')[0],
            exerciseStr.split('- 3: ')[1].split('\n')[0],
            exerciseStr.split('- 4: ')[1].split('\n')[0],
        ];
    
        return {
            question,
            answer,
            options,
        };
    } catch (error) {
        console.log(index,`error.message`, error.message)
        return null
    }

};

run();

// fetch(
//     `https://raw.githubusercontent.com/sudheerj/javascript-interview-questions/master/README.md`
// )
//     .then((res) => {
//         // console.log(`res`, res)
//         return res.text();
//     })
//     .then((text) => {
//         // console.log(`text`, text);

//         const parsed = [exercises[54]].map(parseExercise);
//         console.log(`parsed`, parsed);
//         console.log(`exercises.length`, exercises.length);
//         // console.log(`exercises[55]`, exercises[55])
//         // console.log(cliMd(exercises[14]));
//     })

//     .then((article) => {
//         console.log(`article`, article);
//     })
//     .catch((err) => {
//         console.log(`err`, err);
//     });
