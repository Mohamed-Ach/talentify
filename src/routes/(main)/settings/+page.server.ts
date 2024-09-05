import type { Actions, PageServerLoad } from './$types'
import { API_URL } from '$lib/stores'
import { fail } from '@sveltejs/kit'

interface ResetPassword {
	oldPassword: string
	newPassword: string
	confirmPassword: string
}

interface Profile {
	avatar: string
	phone_number: string
	address: string
	degree: string
	institution: string
	certifications: string[]
	technical_skills: string[]
	soft_skills: string[]
	languages: string[]
	employment_type: string
	bio: string
	experiences: string
	profession: string
	facebook: string
	twitter: string
	linkedin: string
	cv: string
}

function getFirstErrorMessage(errors: { [key: string]: string[] }): string {
	const firstKey = Object.keys(errors)[0]
	if (firstKey && errors[firstKey]?.length > 0) {
		return errors[firstKey][0]
	}
	return ''
}

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
	const profile = await getProfile(token)
	return {
		profile: profile.profile
	}
}

async function resetPassword(resetData: ResetPassword, token: string) {
	const myHeaders = new Headers()
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const raw = JSON.stringify({
		current_password: resetData.oldPassword,
		new_password: resetData.newPassword,
		new_password_confirmation: resetData.confirmPassword
	})

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw
	}

	const response = await fetch(API_URL + '/change-password', requestOptions)
	const result = await response.json()

	return {
		status: response.status,
		message: result
	}
}

async function updateProfile(profile: Profile, token: string) {
	const myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: JSON.stringify(profile)
	}

	const response = await fetch(API_URL + '/profile-edit', requestOptions)
	const result = await response.json()
	console.log(result)
	return {
		status: response.status,
		data: result
	}
}

export const actions: Actions = {
	updateProfile: async ({ request, cookies }) => {
		const token = cookies.get('session') || null
		if (!token) return fail(400, { error: 'Unauthorized' })

		const results = Object.fromEntries(await request.formData())
		const profile: Profile = {
			avatar: results.avatar.toString(),
			phone_number: results.phoneNumber.toString(),
			address: results.address.toString(),
			degree: results.degree.toString(),
			institution: results.institution.toString(),
			certifications: JSON.parse(results.certifications.toString()),
			technical_skills: JSON.parse(results.technicalSkills.toString()),
			soft_skills: JSON.parse(results.softSkills.toString()),
			languages: JSON.parse(results.languages.toString()),
			employment_type: results.employmentType.toString(),
			bio: results.bio.toString(),
			experiences: results.experience.toString(),
			profession: results.profession.toString(),
			facebook: results.facebook.toString(),
			twitter: results.twitter.toString(),
			linkedin: results.linkedin.toString(),
			cv: results.cv.toString()
		}

		console.log(profile)
		try {
			const updateRes = await updateProfile(profile, token)
			if (updateRes.status === 200)
				return {
					success1: 'Your profile has been updated successfully!'
				}
			else if (updateRes.status === 422)
				return fail(422, { error1: getFirstErrorMessage(updateRes.data.errors) })
			else return fail(500, { error1: 'Something went wrong. Please try again!' })
		} catch (err) {
			console.log(err)
			return fail(500, { error1: 'Something went wrong. Please try again!' })
		}
	},

	resetPassword: async ({ request, cookies }) => {
		const token = cookies.get('session') || null
		if (!token) return fail(400, { error: 'Unauthorized' })

		const results = Object.fromEntries(await request.formData())

		const resetData: ResetPassword = {
			oldPassword: results.oldPassword.toString(),
			newPassword: results.password.toString(),
			confirmPassword: results.confirmPassword.toString()
		}
		try {
			const resetRes = await resetPassword(resetData, token)
			if (resetRes.status === 200)
				return {
					success2: 'Your password has been reset successfully!'
				}
			else if (resetRes.status === 422)
				return fail(422, { error2: getFirstErrorMessage(resetRes.message.errors) })
			else if (resetRes.status === 403) return fail(403, { error2: 'Old password is incorrect!' })
			else return fail(500, { error2: 'Something went wrong. Please try again!' })
		} catch (err) {
			console.log(err)
			return fail(500, { error2: 'Something went wrong. Please try again!' })
		}
	}
}
