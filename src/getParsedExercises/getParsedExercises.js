import fetch from 'node-fetch';

const getParsedExercises = async (README_URL) => {
    const readme = await getFile(README_URL);
    const exercisesStrs = getExercisesStrs(readme);
    const exercises = exercisesStrs.map(parseExercise).filter(Boolean);
    return exercises;
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

        const options = getOptions(exerciseStr);

        return {
            question,
            fullQuestion,
            answer,
            options,
        };
    } catch (error) {
        // console.log(index, `error.message`, error.message);
        return null;
    }
};

const getOptions = (exerciseStr) => {
    const options = [];
    let iterator = 1;
    let shouldContinue = true;
    while (shouldContinue) {
        let option = exerciseStr
            ?.split(`- ${iterator}: `)?.[1]
            ?.split('\n')?.[0];
        if (!option) {
            shouldContinue = false;
        } else {
            options.push(option);
            iterator++;
        }
    }
    return options;
};

export default getParsedExercises;
