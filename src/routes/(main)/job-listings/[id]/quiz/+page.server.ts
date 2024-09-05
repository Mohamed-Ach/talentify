import type { Actions, PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'
import { error, fail } from '@sveltejs/kit'

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

	const checkUser = async (token: string, id: string) => {
		const response = await fetch(`${API_URL}/job-posts/has-passed-questionnaire/${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})

		const result = await response.json()
		return {
			status: response.status,
			result
		}
	}

	const token = cookies.get('session') || ''
	const id = params.id

	const user = await checkUser(token, id)
	console.log(user.result)
	if (user.status === 404 || user.result.has_passed === true) {
		throw error(404, 'Error 404: Page not found')
	}

	return {
		survey: getSurvey(token, id)
	}
}

interface Answer {
	question_id: string
	option_id: string
}

async function submitAnswer(answers: Answer[], token: string, id: string) {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const raw = JSON.stringify({
		answers: answers
	})

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw
	}

	const response = await fetch(`${API_URL}/job-posts/submit-questionnaire/${id}`, requestOptions)
	const results = await response.json()

	return {
		status: response.status,
		results
	}
}

export const actions: Actions = {
	default: async ({ params, request, cookies }) => {
		const results = Object.fromEntries(await request.formData())

		const answers: Answer[] = []
		for (let i = 0; i < 10; i++) {
			const answer: Answer = {
				question_id: results[`question${i}`].toString(),
				option_id: results[`answer${i}`].toString()
			}
			answers.push(answer)
		}

		const token = cookies.get('session') || ''
		const id = params.id

		try {
			const submitRes = await submitAnswer(answers, token, id)
			if (submitRes.status === 200) return { success: submitRes.results.message }
			else return fail(400, { error: 'An Error has occurred, Please try again!' })
		} catch (error) {
			console.error(error)
			return fail(500, { error: 'Something went wrong. Please try again later.' })
		}
	}
}
