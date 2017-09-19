const IndexHTMLComponent = ({App, assets}) => {
	const createBody = () => {
		const html = `
			<div id="app">${App}</div>
		${Object.keys(assets)
		.filter(bundleName => assets[bundleName].js)
		.map(bundleName => {
			const path = assets[bundleName].js
			return `<script src="${path}" type="text/javascript"></script>`
		})
		.join('')}`
		return html
	}

	const createHead = () => {
		const html = `
			<meta charset="utf-8" />
		<title>Tiny-universal-skeleton</title>
		<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta
			name="description"
			content="Tiny universal skeleton"
		/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<base href="/" />
		<meta name="msapplication-tap-highlight" content="no" />`
		return html
	}

	const itIsUniversal = false
	const hello = itIsUniversal ? '<h2>Hello from hot-reloaded server!</h2>' : ''

	return `<html>
			<head>${createHead()}<head>
			<body>
				${hello}
				${createBody()}
			</body>
		</html>`
}

export default IndexHTMLComponent
