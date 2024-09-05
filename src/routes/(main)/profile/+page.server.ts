import type { PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'
import { fail } from '@sveltejs/kit'

async function getProfile(token: string) {
	const myHeaders = new Headers()
	myHeaders.append('Authorization', `Bearer ${token}`)

	const requestOptions = {
		method: 'GET',
		headers: myHeaders
	}

	const response = await fetch(API_URL + '/profile', requestOptions)
	if (!response.ok) return { profile: {} }
	return await response.json()
}

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('session') || null
	if (!token) return fail(400, { error: 'Unauthorized' })
	return {
		profile: await getProfile(token)
	}
}
