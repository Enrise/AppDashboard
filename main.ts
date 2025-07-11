const dashboardPrefix = 'DASHBOARD_';

const env = (property: string, fallback: string): string => Deno.env.get(`${dashboardPrefix}${property}`) ?? fallback;

const buildLinkList = (): string => {
	const listItems: string[] = [];

	const envs = Deno.env.toObject();

	Object.keys(envs)
		.sort()
		.forEach(function (name) {
			if (name.startsWith(`${dashboardPrefix}LINK`)) {
				let link = envs[name];
				let cleanName = name.replace(`${dashboardPrefix}LINK_`, '').replaceAll('_', ' ').toLowerCase();
				if (envs[name].includes('|')) {
					const parts  = envs[name].split('|');
					link = parts[0];
					cleanName = parts[1];
				}
				listItems.push(`<a href="${link}">${cleanName}</a>`);
			}
		});

	return listItems.join('\n\t\t\t\t');
};

const buildDashboardPage = (): string => {
	let page = Deno.readTextFileSync('./resources/dashboard.html');

	page = page.replaceAll('$projectImage', env('IMAGE', '/enrise.svg'));
	page = page.replaceAll('$projectName', env('NAME', 'Dashboard'));
	page = page.replaceAll('$linkList', buildLinkList());

	return page;
};

const buildStylesheet = (): string => {
	let stylesheet = Deno.readTextFileSync('./resources/dashboard.css');

	stylesheet = stylesheet.replaceAll('var(text-color)', env('TEXT_COLOR', '#000000'));
	stylesheet = stylesheet.replaceAll('var(background-color)', env('BACKGROUND_COLOR', '#f29a00'));

	return stylesheet;
};

Deno.serve((request: Request) => {
	if (request.url.includes('.css')) {
		return new Response(
			buildStylesheet(),
			{
				status: 200,
				headers: { 'content-type': 'text/css' },
			},
		);
	}

	if (request.url.includes('.svg')) {
		return new Response(
			Deno.readTextFileSync('./resources/enrise.svg'),
			{
				status: 200,
				headers: { 'content-type': 'image/svg+xml' },
			},
		);
	}

	console.log(`Opened dashboard at %c${new Date().toLocaleTimeString()}%c.`, 'color: green', 'color: initial');

	return new Response(
		buildDashboardPage(),
		{
			status: 200,
			headers: { 'content-type': 'text/html' },
		},
	);
});
