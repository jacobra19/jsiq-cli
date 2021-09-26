import cliMd from 'cli-markdown';
import inquirer from 'inquirer';
import chalk from 'chalk';

const getIsCorrectAnswer = (exercise, chosenAnswer) => {
    const chosenAnswerIndex =
        exercise.options.findIndex((opt) => opt === chosenAnswer) + 1;
    if (chosenAnswerIndex === exercise.answer.index) return true;
    return false;
};

const handleExerciseQuestionnaire = async (exercise) => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'chosenAnswer',
            message: cliMd(exercise.fullQuestion),
            choices: exercise.options,
        },
    ]);
    const isCorrectAnswer = getIsCorrectAnswer(exercise, answers.chosenAnswer);
    const userMessage = `You are ${isCorrectAnswer ? 'correct' : 'incorrect'}`;
    if (isCorrectAnswer) {
        console.log(chalk.green(userMessage));
    } else {
        console.log(chalk.red(userMessage));
    }
    console.log(cliMd(exercise.answer.full));

    const isAnotherOne = await inquirer.prompt([
        {
            type: 'list',
            name: 'chosenAnswer',
            message: 'Another one?',
            choices: ['Yes', 'No'],
        },
    ]);

    return isAnotherOne.chosenAnswer === 'Yes';
};

export default handleExerciseQuestionnaire;
