import type { PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'
import { fail } from '@sveltejs/kit'

interface ResetPassword {
	email: string
	signature: string
	expires: string
	token: string
	password: string
	password_confirmation: string
}

async function resetPassword(resetPassword: ResetPassword) {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')

	const body = JSON.stringify({
		password: resetPassword.password,
		password_confirmation: resetPassword.password_confirmation
	})

	const baseUrl = API_URL + '/reset-password'
	const params = {
		email: resetPassword.email,
		signature: resetPassword.signature,
		expires: resetPassword.expires,
		token: resetPassword.token
	}

	const url = new URL(baseUrl)
	url.search = new URLSearchParams(params).toString()

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: body
	}

	const response = await fetch(url.toString(), requestOptions)
	const result = await response.json()

	console.log(resetPassword)
	console.log(result)

	return { status: response.status, result: result }
}

export const load: PageServerLoad = async ({ url }) => {
	let verify

	// parse email, signature, and timestamp from URL
	const searchParams = new URLSearchParams(url.search)
	const email = searchParams.get('email') || ''
	const expires = searchParams.get('expires') || ''
	const signature = searchParams.get('signature') || ''
	const token = searchParams.get('token') || ''

	if (email && expires && signature && token)
		verify = { status: 200, message: { email, expires, signature, token } }
	else
		throw new Error('Invalid URL')

	return {
		verify: verify
	}
}

export const actions = {
	default: async ({ request }) => {
		const results = Object.fromEntries(await request.formData())

		const resetPwd: ResetPassword = {
			email: results.email.toString(),
			signature: results.signature.toString(),
			expires: results.expires.toString(),
			token: results.token.toString(),
			password: results.password.toString(),
			password_confirmation: results.passwordConfirmation.toString()
		}

		try {
			const resetPasswordRes = await resetPassword(resetPwd)

			if (resetPasswordRes.status === 200) {
				return {
					success:
						'Password was reset successfully. You can now login with your new password.'
				}
			}
			return fail(400, {
				error: 'The token is invalid or expired. Please request a new one.'
			})
		} catch (err) {
			console.log(err)
			return fail(500, {
				error: 'An error occurred while trying to reset your password. Please try again'
			})
		}
	}
}
