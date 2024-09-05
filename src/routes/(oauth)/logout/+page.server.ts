import type { Actions, PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import { API_URL } from '$lib/stores'

async function logout(token: string) {
	const myHeaders = new Headers()

	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const requestOptions = {
		method: 'POST',
		headers: myHeaders
	}

	const response = await fetch(API_URL + '/auth/logout', requestOptions)
	await response.json()
}

export const load: PageServerLoad = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	throw redirect(302, '/')
}

export const actions: Actions = {
	async default({ cookies }) {
		try {
			// Extract the token from the cookies
			const token = cookies.get('session') || null

			if (token) {
				await logout(token)
			}
		} catch (error) {
			console.error(error)
		}

		// * eat the cookie
		cookies.delete('session', { path: '/' })

		// * redirect the user
		throw redirect(302, '/login')
	}
}
