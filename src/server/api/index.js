import {Router} from 'express'
import chalk from 'chalk'
const router = Router()

router.get('/hello', (req, res) => {
	console.log(chalk.red`You find a secret location!`)
	res.send('You find a secret route!')
})

export default router
