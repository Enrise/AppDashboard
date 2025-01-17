const dashboardPrefix = 'DASHBOARD_';

const env = (property: string, fallback: string): string => Deno.env.get(`${dashboardPrefix}${property}`) ?? fallback;

const buildLinkList = (): string => {
	const listItems: string[] = [];

	const envs = Deno.env.toObject();

	Object.keys(envs)
		.sort()
		.forEach(function (name) {
			if (name.startsWith(`${dashboardPrefix}LINK`)) {
				const cleanName = name.replace(`${dashboardPrefix}LINK_`, '').replace('_', ' ');
				listItems.push(`<a href="${envs[name]}">${cleanName}</a>`);
			}
		});

	return listItems.join('');
};

const buildDashboardPage = (): string => {
	let page = Deno.readTextFileSync('./dashboard.html');

	page = page.replaceAll('$projectImage', env('IMAGE', '/enrise.svg'));
	page = page.replaceAll('$projectName', env('NAME', 'Dashboard'));
	page = page.replaceAll('$linkList', buildLinkList());

	return page;
};

const buildStylesheet = (): string => {
	let stylesheet = Deno.readTextFileSync('./dashboard.css');

	stylesheet = stylesheet.replaceAll('$textColor', env('TEXT_COLOR', '#000000'));
	stylesheet = stylesheet.replaceAll('$backgroundColor', env('BACKGROUND_COLOR', '#f29a00'));

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
			Deno.readTextFileSync('./enrise.svg'),
			{
				status: 200,
				headers: { 'content-type': 'image/svg+xml' },
			},
		);
	}

	return new Response(
		buildDashboardPage(),
		{
			status: 200,
			headers: { 'content-type': 'text/html' },
		},
	);
});
