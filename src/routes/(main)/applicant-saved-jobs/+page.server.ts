import type { PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const getSavedJobs = async (token: string) => {
		const myHeaders = new Headers()
		myHeaders.append('Accept', 'application/json')
		myHeaders.append('Authorization', `Bearer ${token}`)

		const requestOptions = {
			method: 'GET',
			headers: myHeaders
		}

		const response = await fetch(API_URL + '/bookmarks', requestOptions)
		return await response.json()
	}

	const token = cookies.get('session') || ''
	if (!token) {
		return {
			status: 401,
			error: 'Unauthorized'
		}
	}

	return {
		bookmarks: getSavedJobs(token),
		token: token
	}
}
