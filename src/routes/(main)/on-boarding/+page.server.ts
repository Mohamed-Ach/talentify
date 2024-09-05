import { fail, redirect, type Actions } from '@sveltejs/kit'
import { API_URL } from '$lib/stores'

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
	experience: string
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


async function createProfile(profile: Profile, token: string) {
	const myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/json')
	myHeaders.append('Authorization', `Bearer ${token}`)

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(profile)
	}

	const response = await fetch(API_URL + '/profile', requestOptions)
	const result = await response.json()

	return {
		status: response.status,
		data: result
	}
}

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const token = cookies.get('session') || null
		if (!token) return redirect(302, '/login?redirect=/on-boarding')

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
			experience: results.experience.toString(),
			profession: results.profession.toString(),
			facebook: results.facebook.toString(),
			twitter: results.twitter.toString(),
			linkedin: results.linkedin.toString(),
			cv: results.cv.toString()
		}

		try {
			const profileRes = await createProfile(profile, token)
			if (profileRes.status >= 200 && profileRes.status < 300) {
				// pass
			} else if (profileRes.status === 401) return fail(400, { error: profileRes.data.message })
			else if (profileRes.status === 422)
				return fail(400, { error: getFirstErrorMessage(profileRes.data.errors) })
			else return fail(400, { error: 'An Error has occurred, Please try again!' })
		} catch (err) {
			console.log(err)
			return fail(400, { error: 'Incorrect email or password. Please try again!' })
		}

		throw redirect(302, '/profile')
	}
}
