import { browser } from '$app/environment';
import mixpanel from 'mixpanel-browser';

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
		if (window.location.hostname.toLowerCase().search('dev.') < 0) {
			mixpanel.set_config({
				properties: {
					environment: 'dev'
				}
			});
		} else {
			mixpanel.set_config({
				properties: {
					environment: 'prod'
				}
			});
		}

	}
	return
};
