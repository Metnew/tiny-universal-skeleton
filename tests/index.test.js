import chalk from 'chalk'
const str1 = `Do you search for the awesomest boilerplate with HMR/Tests/Redux/<another-cool-thing>?`
const link = 'https://github.com/Metnew/react-semantic.ui-starter'
const str2 = `Try it! `

const chaslkStr1 = chalk.green(str1)
const chalkStr2 = chalk.yellow(str2)
describe(`Where are tests?`, () => {
	it(`You can find tests for the same but more advanced setup: ${link}`, () => {
		console.log(chaslkStr1 + '\n' + chalkStr2 + chalk.underline.red(link))
		expect(true).toEqual(true)
	})
})
