import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { API_URL } from '$lib/stores'

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const getJobListing = async (token: string, id: string) => {
		const myHeaders = new Headers({
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		})

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders
		}

		const response = await fetch(`${API_URL}/job-posts/details/${id}`, requestOptions)
		if (!response.ok) return ''
		return await response.json()
	}

	const token = cookies.get('session') || ''
	const id = params.id || ''

	if (!token || !id) throw error(401, 'Page 404 not found')
	return {
		job: await getJobListing(token, id)
	}
}
