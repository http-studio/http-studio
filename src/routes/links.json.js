import links from './_links';

const content = JSON.stringify(links);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(content);
}
