<script lang="ts">
	import UserCircleCheck from 'phosphor-svelte/lib/UserCircleCheck'

	import PageTitle from '$lib/components/PageTitle.svelte'

	import type { PageData } from './$types'
	export let data: PageData
</script>

<PageTitle title="Testimonials" breadcrumbs={[{ name: 'view', link: null }]} />

<div class="grid grid-cols-12 gap-6 mb-5">
	<!-- start col -->
	<div class="col-span-12">
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body border-b border-gray-100 dark:border-zinc-600">
				<h6 class="mb-1 text-gray-600 dark:text-gray-100 text-15">Users' feedback</h6>
			</div>
			<div class="card-body">
				<div class="grid grid-cols-12">
					<div class="col-span-12 xl:col-span-10 xl:col-start-2">
						<div class="reltive">
							<div class="text-center">
								<div class="items-center w-20 h-20 rounded-full bg-violet-500 md:mx-auto">
									<p class="text-sm text-white uppercase py-[30px]">Feedbacks</p>
								</div>
							</div>

							{#each data.testimonials.feedbacks as testimonial, index}
								{#if index % 2 == 0}
									<div class="relative pt-16">
										<div class="grid grid-cols-12">
											<div class="col-span-1 md:col-span-6">
												<div class="relative ltr:text-right rtl:text-left mt-9">
													<div
														class="after:content-[''] absolute h-4 w-4 rounded-full bg-violet-500 top-2 hidden md:block ltr:md:-right-2 rtl:md:-left-2"
													></div>
												</div>
											</div>
											<div class="col-span-11 md:col-span-6">
												<div
													class="relative m-4 ltr:ml-8 rtl:mr-8 border rounded-lg border-gray-50 dark:border-zinc-600"
												>
													<div
														class="h-20 mx-5 mt-5 text-center rounded-md md:absolute md:mx-0 md:mt-0 right-5 -top-3 w-14 bg-violet-500"
														style="clip-path: polygon(0% 0%, 100% 0, 100% 80%, 50% 100%, 0 80%);"
													>
														<div class="flex justify-center items-center p-2">
															<UserCircleCheck
																size={32}
																class="mb-0 leading-tight text-white-50 text-white"
															/>
														</div>
													</div>
													<div class="p-5">
														<div class="md:pr-6 md:mr-10 font-primary">
															<h3 class="text-lg text-gray-600 dark:text-gray-100">
																{testimonial.first_name}
																{testimonial.last_name}
															</h3>
															<p class="pt-1 mt-2 mb-0 text-gray-500 dark:text-zinc-100/80">
																<span class="text-violet-500 font-bold"
																	>→ {testimonial.subject}</span
																>
																<br />
																{testimonial.description}
															</p>
														</div>
													</div>
													<div
														class="after:content-[''] absolute h-4 w-4 rotate-45 ltr:border-l rtl:border-r ltr:border-b rtl:border-t border-gray-50 rounded-sm bg-white top-7 ltr:-left-2 rtl:-right-2 dark:bg-zinc-800 dark:border-zinc-600"
													></div>
												</div>
											</div>
										</div>

										<div
											class="after:content-[''] absolute ltr:border-l rtl:border-r border-violet-500 h-full top-0 rtl:right-10 ltr:left-10 md:ltr:left-[50%] md:rtl:right-[50%]"
										></div>
									</div>
								{:else}
									<div class="relative">
										<div class="grid grid-cols-12">
											<div class="order-2 col-span-11 md:col-span-6 md:order-1">
												<div
													class="relative m-4 ltr:ml-8 rtl:mr-8 border rounded-lg border-gray-50 md:mr-8 dark:border-zinc-600"
												>
													<div
														class="h-20 mx-5 mt-5 text-center rounded-md md:absolute md:mx-0 md:mt-0 left-5 -top-3 w-14 bg-violet-500"
														style="clip-path: polygon(0% 0%, 100% 0, 100% 80%, 50% 100%, 0 80%);"
													>
														<div class="flex justify-center items-center p-2">
															<UserCircleCheck
																size={32}
																class="mb-0 leading-tight text-white-50 text-white"
															/>
														</div>
													</div>
													<div class="p-5">
														<div class="md:ml-10 md:pl-6 md:text-right">
															<h3 class="text-lg text-gray-600 dark:text-gray-100">
																{testimonial.first_name}
																{testimonial.last_name}
															</h3>
															<p class="pt-1 mt-2 mb-0 text-gray-500 dark:text-zinc-100/80">
																<span class="text-violet-500 font-bold"
																	>→ {testimonial.subject}</span
																>
																<br />
																{testimonial.description}
															</p>
														</div>
													</div>
													<div
														class="after:content-[''] absolute h-4 w-4 rotate-45 border-r border-t border-gray-50 rounded-sm bg-white top-7 -right-2 md:block hidden dark:bg-zinc-800 dark:border-zinc-600"
													></div>
													<div
														class="after:content-[''] absolute h-4 w-4 rotate-45 ltr:border-l rtl:border-r ltr:border-b rtl:border-t border-gray-50 rounded-sm bg-white top-7 ltr:-left-2 rtl:-right-2 dark:bg-zinc-800 dark:border-zinc-600"
													></div>
												</div>
											</div>
											<div class="order-1 col-span-1 md:col-span-6 md:order-2">
												<div class="relative mt-9">
													<i
														class="text-2xl bx bx-user-pin text-violet-500 md:text-3xl ltr:mr-10 rtl:ml-10 ltr:md:ml-5 rtl:md:mr-5"
													></i>
													<div
														class="after:content-[''] absolute h-4 w-4 rounded-full bg-violet-500 top-2 ltr:-left-2 rtl:-right-2 hidden md:block"
													></div>
												</div>
											</div>
										</div>

										<div
											class="after:content-[''] absolute ltr:border-l rtl:border-r border-violet-500 h-full top-0 rtl:right-10 ltr:left-10 md:ltr:left-[50%] md:rtl:right-[50%]"
										></div>
									</div>
								{/if}
							{/each}

							<div class="text-center">
								<div class="items-center w-20 h-20 rounded-full bg-violet-500 md:mx-auto">
									<p class="text-white uppercase py-[30px]">End</p>
								</div>
							</div>

							<div class="relative md:text-center">
								<div
									class="relative inline-block mt-5 lg:mt-8 border rounded-lg border-gray-50 dark:border-zinc-600"
								>
									<div class="p-5">
										<h3 class="text-lg text-gray-600 dark:text-gray-100">
											Feedbacks from our users
										</h3>
										<p class="mt-1 mb-0 text-gray-500 dark:text-zinc-100/80">
											You have reached the end.
										</p>
									</div>
									<div
										class="after:content-[''] absolute h-4 w-4 rotate-45 -translate-x-2 border-l border-t border-gray-50 rounded-sm bg-white -top-2 ltr:left-10 rtl:right-6 md:left-[50%] dark:bg-zinc-800 dark:border-zinc-600"
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end col -->
</div>
