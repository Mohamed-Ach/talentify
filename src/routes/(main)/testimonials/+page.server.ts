import { API_URL } from '$lib/stores'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const token = cookies.get('session') || ''
	if (!token) {
		throw new Error('Unauthorized')
	}

	const getTestimonials = async (token: string) => {
		const response = await fetch(API_URL + '/feedbacks', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		return await response.json()
	}
	return {
		testimonials: await getTestimonials(token)
	}
}
