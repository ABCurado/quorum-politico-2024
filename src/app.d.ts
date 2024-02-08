// See https://kit.svelte.dev/docs/types#app

import type { Ai } from "@cloudflare/ai";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface Platform {
			env: {
				AI?: unknown;				
				BUCKET: R2Bucket;
				DB: R2DB;
				ENV: string;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache }
		}
	}
}

export { };
