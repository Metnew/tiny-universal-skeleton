import chalk from 'chalk'
const str1 = `Do you search for the awesomest boilerplate with HMR/Tests/Redux/Server Push/<another-cool-thing>?`
const link = 'https://github.com/Metnew/react-semantic.ui-starter'
const str2 = `Try Noir! `

const banner1 = chalk.green(str1)
const banner2 = chalk.yellow(str2)
describe(`Where are tests?`, () => {
	it(`You can find tests for the same but more advanced setup: ${link}`, () => {
		console.log(banner1 + '\n' + banner2 + chalk.underline.red(link))
		const NoirIsAwesome = true
		expect(true).toEqual(NoirIsAwesome)
	})
})
