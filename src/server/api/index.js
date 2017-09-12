import {Router} from 'express'
import chalk from 'chalk'
const router = Router()

router.get('/hello', (req, res) => {
	res.send('You find a secret route!')
})

export default router
