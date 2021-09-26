import inquirer from 'inquirer';
const { prompt } = inquirer;

const exercise = {
    question: ' 1. What is the output of below code',
    fullQuestion:
        ' 1. What is the output of below code\n\n```javascript\nvar car = new Vehicle("Honda", "white", "2010", "UK");\nconsole.log(car);\n\nfunction Vehicle(model, color, year, country) {\n    this.model = model;\n    this.color = color;\n    this.year = year;\n    this.country = country;\n}\n```\n\n',
    answer: {
        index: 4,
        full: "\n<p>\n\n##### Answer: 4\n\n   The function declarations are hoisted similar to any variables. So the placement for `Vehicle` function declaration doesn't make any difference.\n\n</p>\n",
    },
    options: [
        'Undefined',
        'ReferenceError',
        'null',
        '{model: "Honda", color: "white", year: "2010", country: "UK"}',
    ],
};

prompt([exercise.question])
    .then((answers) => {
        // Use user feedback for... whatever!!
        console.log(`answers`, answers)
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });
