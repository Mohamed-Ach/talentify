import { fail, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'

export const load: PageServerLoad = async () => {
	return {}
}

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

const createJobPost = async (jobPost: JobPost, token: string) => {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const raw = JSON.stringify(jobPost)

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw
	}

	const response = await fetch(API_URL + '/job-posts', requestOptions)
	const results = await response.json()

	console.log(results)

	return { results, status: response.status }
}

export const actions: Actions = {
	default: async ({ request, cookies, locals }) => {
		const results = Object.fromEntries(await request.formData())
		const token = cookies.get('session') || ''
		const employer_id = locals?.user?.id || ''

		const jobPost: JobPost = {
			title: results.title.toString(),
			salary: results.salary.toString(),
			description: results.description.toString(),
			employer_id,
			job_type: JSON.parse(results.job_type.toString()),
			location: results.location.toString(),
			required_skills: JSON.parse(results.required_skills.toString()),
			application_deadline: results.application_deadline.toString(),
			has_questionnaire: false,
			categories: JSON.parse(results.categories.toString()),
			tags: JSON.parse(results.tags.toString())
		}

		try {
			const createRes = await createJobPost(jobPost, token)
			console.log(createRes)
			if (createRes.status === 201)
				return { success: "Job Post created successfully" }

			else return fail(400, { error: 'An Error has occurred, Please try again!' })
		} catch (error) {
			console.error(error)
			return fail(500, { error: 'Something went wrong. Please try again later.' })
		}
	}
}
