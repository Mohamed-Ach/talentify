import { API_URL } from '$lib/stores'
import type { PageServerLoad } from './$types'

const getJobListings = async (token: string, id: string) => {


	const response = await fetch(`${API_URL}/job-posts/employer/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
	return await response.json()
}

export const load: PageServerLoad = async ({ cookies, locals }) => {
	const token = cookies.get('session') || ''
	const id = locals.user?.id || ''

	if (!token) {
		return {
			status: 401,
			error: 'Unauthorized'
		}
	}
	return {
		jobs: await getJobListings(token, id),
		token: token
	}
}
