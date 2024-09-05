import type { PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
	const getSurvey = async (token: string, id: string) => {
		const response = await fetch(`${API_URL}/questionnaire/${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})

		return await response.json()
	}

	const token = cookies.get('session') || ''
	const id = params.id

	return {
		survey: getSurvey(token, id)
	}
}
