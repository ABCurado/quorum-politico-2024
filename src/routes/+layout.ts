import mixpanel from 'mixpanel-browser';
import { browser } from '$app/environment';


export const load = async () => {
	type Config = {
		host: string;
		track_pageview: boolean;
	};

	if (browser) {
		mixpanel.init("e611f2810e5ef94ed59f38783c6b6ff9", {
			host: "api-eu.mixpanel.com",
			track_pageview: true
		} as Config);

		// Set the environment property
		mixpanel.set_config({
			properties: {
				environment: platform?.env.ENV
			}
		});
	}
	return
};
