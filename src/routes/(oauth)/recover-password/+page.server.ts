// import type { PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'
import { fail } from '@sveltejs/kit'

// export const load: PageServerLoad = async ({ locals }) => {
//     const session = await locals.auth.validate()
//     if (session) {
//         throw redirect(302, '/posts/browse')
//     }
// }

async function recoverPassword(email: string) {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')

	const baseUrl = API_URL + '/auth/password/email'
	const url = new URL(baseUrl)
	url.search = new URLSearchParams({ email: email }).toString()

	const requestOptions = {
		method: 'POST',
		headers: myHeaders
	}

	const response = await fetch(url.toString(), requestOptions)
	const result = await response.json()

	return {
		status: response.status,
		data: result
	}
}

export const actions = {
	default: async ({ request }) => {
		const results = Object.fromEntries(await request.formData())

		try {
			const recoverPasswordRes = await recoverPassword(results.email.toString())
			if (recoverPasswordRes.status === 200)
				return {
					success: 'An email has been sent to you with instructions on how to reset your password'
				}

			if (recoverPasswordRes.status >= 400 && recoverPasswordRes.status < 500)
				return fail(400, { error: "This email doen't exist. Please verify it and try again" })

			return fail(500, { error: 'An error has occurred. Please try again' })
		} catch (err) {
			console.log(err)
			return fail(400, { error: "This email doen't exist. Please verify it and try again" })
		}
	}
}
