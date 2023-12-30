import mixpanel from 'mixpanel-browser';
import { browser } from '$app/environment';

export const load = async () => {
	if (browser) {
		mixpanel.init("e611f2810e5ef94ed59f38783c6b6ff9", {
			host: "api-eu.mixpanel.com",
			track_pageview: true
		});
	}
	return
};
