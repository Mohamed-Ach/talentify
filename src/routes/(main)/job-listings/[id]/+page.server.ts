import type { PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'

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

const getRecommendations = async (token: string, id: string) => {
	const myHeaders = new Headers({
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	})

	const requestOptions: RequestInit = {
		method: 'GET',
		headers: myHeaders
	}

	const response = await fetch(`${API_URL}/job-posts/recommend/${id}`, requestOptions)
	if (!response.ok) return []
	return await response.json()
}

const getSavedJobs = async (token: string) => {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const requestOptions = {
		method: 'GET',
		headers: myHeaders
	}

	const response = await fetch(API_URL + '/bookmarks', requestOptions)
	return response.json()
}

const getAppliedJobs = async (token: string) => {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const requestOptions = {
		method: 'GET',
		headers: myHeaders
	}

	const response = await fetch(API_URL + '/job-applications', requestOptions)
	return response.json()
}

export const load: PageServerLoad = async ({ cookies, params }) => {
	const token = cookies.get('session') || ''
	const id = params.id || ''

	if (!token) throw new Error('Unauthorized')

	if (!id) throw new Error('Not Found')

	const r1 = await getSavedJobs(token)
	const bookmarks = r1.map((job: { job_post_id: string }) => job.job_post_id)

	const r2 = await getAppliedJobs(token)
	const appliedJobs = r2.map((job: { job_post_id: string }) => job.job_post_id)


	return {
		job: await getJobListing(token, id),
		recommendations: getRecommendations(token, id),
		bookmarks,
		appliedJobs,
		token
	}
}
