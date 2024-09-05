import { API_URL } from '$lib/stores'
import type { PageServerLoad } from './$types'

async function getJobListings(token: string, query: string) {
	const myHeaders = new Headers({
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	})

	const queryParams = new URLSearchParams({})
	if (query) queryParams.append('query', query)

	const requestOptions: RequestInit = {
		method: 'GET',
		headers: myHeaders
	}

	const response = await fetch(`${API_URL}/jobs/search?${queryParams.toString()}`, requestOptions)
	return await response.json()
}

export const load: PageServerLoad = async ({ cookies, url }) => {
	const token = cookies.get('session') || ''
	const query = url.searchParams.get('query') || ''

	if (!token) {
		return {
			status: 401,
			error: 'Unauthorized'
		}
	}
	return {
		jobs: await getJobListings(token, query),
		token: token
	}
}
