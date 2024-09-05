import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'
import { API_URL } from '$lib/stores'

type Feedback = {
	subject: string
	message: string
}

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const results = Object.fromEntries(await request.formData())
		const token = cookies.get('session') || ''

		const submitFeedback = async (feedback: Feedback, token: string) => {
			const myHeaders = new Headers()
			myHeaders.append('Content-Type', 'application/json')
			myHeaders.append('Accept', 'application/json')
			myHeaders.append('Authorization', `Bearer ${token}`)

			const raw = JSON.stringify({
				subject: feedback.subject,
				description: feedback.message
			})

			const response = await fetch(API_URL + '/feedback', {
				method: 'POST',
				headers: myHeaders,
				body: raw
			})
			const results = await response.json()

			return { status: response.status, results }
		}

		const feedback: Feedback = {
			subject: results['subject'].toString(),
			message: results['message'].toString()
		}

		try {
			const submitRes = await submitFeedback(feedback, token)
			if (submitRes.status === 201) {
				return { success: true }
			} else return fail(400, { error: 'An Error has occurred, Please try again!' })
		} catch (error) {
			console.error(error)
			return fail(500, { error: 'Something went wrong. Please try again later.' })
		}
	}
}
