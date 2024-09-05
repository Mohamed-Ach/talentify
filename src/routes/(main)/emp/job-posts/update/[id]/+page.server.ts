import type { Actions, PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'
import { fail } from '@sveltejs/kit'

interface JobPost {
	title: string
	salary: string
	description: string
	employer_id: string
	job_type: string[]
	location: string
	required_skills: string[]
	application_deadline: string
	has_questionnaire: boolean
	categories: string[]
	tags: string[]
}

const updateJobPost = async (jobPost: JobPost, token: string, id: string) => {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const raw = JSON.stringify(jobPost)

	const requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw
	}

	const response = await fetch(`${API_URL}/job-posts/${id}`, requestOptions)
	const results = await response.json()

	return { results, status: response.status }
}

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

export const load: PageServerLoad = async ({ params, cookies }) => {
	const token = cookies.get('session') || ''
	const id = params.id || ''

	if (!token) throw new Error('Unauthorized')

	if (!id) throw new Error('Not Found')

	return {
		job: getJobListing(token, id)
	}
}

export const actions: Actions = {
	default: async ({ params, request, cookies }) => {
		const results = Object.fromEntries(await request.formData())
		const token = cookies.get('session') || ''

		const jobPost: JobPost = {
			title: results.title.toString(),
			salary: results.salary.toString(),
			description: results.description.toString(),
			employer_id: 'cec516c2-b48b-4013-ac2d-55b45b739396',
			job_type: JSON.parse(results.job_type.toString()),
			location: results.location.toString(),
			required_skills: JSON.parse(results.required_skills.toString()),
			application_deadline: results.application_deadline.toString(),
			has_questionnaire: false,
			categories: JSON.parse(results.categories.toString()),
			tags: JSON.parse(results.tags.toString())
		}

		try {
			const updateRes = await updateJobPost(jobPost, token, params.id || '')
			console.log(updateRes)
			if (updateRes.status === 200) return { success: updateRes.results.message }
			else return fail(400, { error: 'An Error has occurred, Please try again!' })
		} catch (error) {
			console.error(error)
			return fail(500, { error: 'Something went wrong. Please try again later.' })
		}
	}
}
