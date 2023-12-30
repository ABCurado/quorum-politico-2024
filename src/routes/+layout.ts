import mixpanel from 'mixpanel-browser';
import { browser } from '$app/environment';

export const load = async () => {
	if (browser) {
		mixpanel.init("844e59eb323f60454c7224979d2aa457", {
			host: "api-eu.mixpanel.com",
			track_pageview: true
		});
	}
	return
};
