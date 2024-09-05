// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			theme: string
			user: {
				id: string
				email: string
				first_name: string
				last_name: string
				user_type: string
				avatar: string
				is_onboarding: number
			} | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { }
