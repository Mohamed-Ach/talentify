import type { Actions, PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'
import { fail, redirect } from '@sveltejs/kit'

async function getQuestions(token: string) {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const requestOptions = {
		method: 'GET',
		headers: myHeaders
	}

	const response = await fetch(API_URL + '/questionnaires/questions', requestOptions)
	return await response.json()
}

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('session') || ''
	if (!token) return { status: 401, error: 'Unauthorized' }
	return {
		questions: await getQuestions(token)
	}
}

type Question =
	| {
		question: string
		options: { option_text: string; is_correct: boolean }[]
	}
	| { id: string }

function formatQuestions(results: { [k: string]: FormDataEntryValue }): Question[] {
	const questions: Question[] = []
	for (let i = 1; i <= 10; i++) {
		const question = JSON.parse(results[`question-${i}`].toString())
		if (question.value !== 0) {
			questions.push({ id: question.value })
		} else {
			const newQuestion = results[`question-${i}-question`].toString()
			const options: { option_text: string; is_correct: boolean }[] = []
			for (let j = 1; j <= 4; j++) {
				const option = results[`question-${i}-answer-${j}`]?.toString() || ''
				const isCorrect = results[`question-${i}-correct-answer`] === j.toString()

				if (option) options.push({ option_text: option, is_correct: isCorrect })
			}
			questions.push({ question: newQuestion, options })
		}
	}
	return questions
}

async function createQuiz(questions: Question[], token: string, id: string) {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const raw = JSON.stringify({
		questions: questions
	})

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw
	}

	const response = await fetch(`${API_URL}/job-posts/create-questionnaire/${id}`, requestOptions)
	const results = await response.json()
	return { status: response.status, results }
}

export const actions: Actions = {
	default: async ({ params, request, cookies }) => {
		const results = Object.fromEntries(await request.formData())
		const token = cookies.get('session') || ''

		const questions: Question[] = formatQuestions(results)

		try {
			const createRes = await createQuiz(questions, token, params.id || '')
			if (createRes.status === 201) {
				//  pass
			} else return fail(400, { error: 'An Error has occurred, Please try again!' })
		} catch (error) {
			console.error(error)
			return fail(500, { error: 'Something went wrong. Please try again later.' })
		}

		throw redirect(302, '/emp/job-posts')
	}
}
