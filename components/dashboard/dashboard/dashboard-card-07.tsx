export default function DashboardCard07() {
  return(
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Top Learning Paths</h2>
        <div className="text-xs text-gray-500">Updated just now</div>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Course Path</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Students</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Completion</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Graduates</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Satisfaction</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Difficulty</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {/* Computer Science */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="shrink-0 mr-2 sm:mr-3 bg-blue-500 rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 dark:text-gray-100">Computer Science</div>
                      <div className="text-xs text-gray-500">12 modules</div>
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">2.4K</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">95%</div>
                </td>
                <td className="p-2">
                  <div className="text-center">267</div>
                </td>
                <td className="p-2">
                  <div className="text-center flex items-center justify-center text-amber-500">
                    4.7
                    <svg className="w-4 h-4 ml-1 fill-current" viewBox="0 0 16 16">
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-400">
                      Advanced
                    </span>
                  </div>
                </td>
              </tr>
              {/* Data Science */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="shrink-0 mr-2 sm:mr-3 bg-green-500 rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 dark:text-gray-100">Data Science</div>
                      <div className="text-xs text-gray-500">10 modules</div>
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">2.2K</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">88%</div>
                </td>
                <td className="p-2">
                  <div className="text-center">249</div>
                </td>
                <td className="p-2">
                  <div className="text-center flex items-center justify-center text-amber-500">
                    4.5
                    <svg className="w-4 h-4 ml-1 fill-current" viewBox="0 0 16 16">
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400">
                      Intermediate
                    </span>
                  </div>
                </td>
              </tr>

              {/* Web Development */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="shrink-0 mr-2 sm:mr-3 bg-purple-500 rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 dark:text-gray-100">Web Development</div>
                      <div className="text-xs text-gray-500">14 modules</div>
                    </div>
                  </div>
                </td>
                <td className="p-2"><div className="text-center">1.9K</div></td>
                <td className="p-2"><div className="text-center text-emerald-500">92%</div></td>
                <td className="p-2"><div className="text-center">192</div></td>
                <td className="p-2">
                  <div className="text-center flex items-center justify-center text-amber-500">
                    4.6<svg className="w-4 h-4 ml-1 fill-current" viewBox="0 0 16 16">
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400">
                      Intermediate
                    </span>
                  </div>
                </td>
              </tr>
              
              {/* AI & Machine Learning */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="shrink-0 mr-2 sm:mr-3 bg-red-500 rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 dark:text-gray-100">AI & Machine Learning</div>
                      <div className="text-xs text-gray-500">16 modules</div>
                    </div>
                  </div>
                </td>
                <td className="p-2"><div className="text-center">1.7K</div></td>
                <td className="p-2"><div className="text-center text-emerald-500">85%</div></td>
                <td className="p-2"><div className="text-center">156</div></td>
                <td className="p-2">
                  <div className="text-center flex items-center justify-center text-amber-500">
                    4.8<svg className="w-4 h-4 ml-1 fill-current" viewBox="0 0 16 16">
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-400">
                      Advanced
                    </span>
                  </div>
                </td>
              </tr>

              {/* Cybersecurity */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="shrink-0 mr-2 sm:mr-3 bg-gray-500 rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 dark:text-gray-100">Cybersecurity</div>
                      <div className="text-xs text-gray-500">12 modules</div>
                    </div>
                  </div>
                </td>
                <td className="p-2"><div className="text-center">1.5K</div></td>
                <td className="p-2"><div className="text-center text-emerald-500">90%</div></td>
                <td className="p-2"><div className="text-center">145</div></td>
                <td className="p-2">
                  <div className="text-center flex items-center justify-center text-amber-500">
                    4.7<svg className="w-4 h-4 ml-1 fill-current" viewBox="0 0 16 16">
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-400">
                      Advanced
                    </span>
                  </div>
                </td>
              </tr>

              {/* Mobile Development */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="shrink-0 mr-2 sm:mr-3 bg-indigo-500 rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 dark:text-gray-100">Mobile Development</div>
                      <div className="text-xs text-gray-500">10 modules</div>
                    </div>
                  </div>
                </td>
                <td className="p-2"><div className="text-center">1.8K</div></td>
                <td className="p-2"><div className="text-center text-emerald-500">87%</div></td>
                <td className="p-2"><div className="text-center">168</div></td>
                <td className="p-2">
                  <div className="text-center flex items-center justify-center text-amber-500">
                    4.5<svg className="w-4 h-4 ml-1 fill-current" viewBox="0 0 16 16">
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400">
                      Intermediate
                    </span>
                  </div>
                </td>
              </tr>

              {/* Cloud Computing */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="shrink-0 mr-2 sm:mr-3 bg-sky-500 rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 dark:text-gray-100">Cloud Computing</div>
                      <div className="text-xs text-gray-500">11 modules</div>
                    </div>
                  </div>
                </td>
                <td className="p-2"><div className="text-center">1.6K</div></td>
                <td className="p-2"><div className="text-center text-emerald-500">89%</div></td>
                <td className="p-2"><div className="text-center">157</div></td>
                <td className="p-2">
                  <div className="text-center flex items-center justify-center text-amber-500">
                    4.6<svg className="w-4 h-4 ml-1 fill-current" viewBox="0 0 16 16">
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-400">
                      Advanced
                    </span>
                  </div>
                </td>
              </tr>

              {/* UI/UX Design */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="shrink-0 mr-2 sm:mr-3 bg-pink-500 rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 dark:text-gray-100">UI/UX Design</div>
                      <div className="text-xs text-gray-500">8 modules</div>
                    </div>
                  </div>
                </td>
                <td className="p-2"><div className="text-center">1.4K</div></td>
                <td className="p-2"><div className="text-center text-emerald-500">91%</div></td>
                <td className="p-2"><div className="text-center">132</div></td>
                <td className="p-2">
                  <div className="text-center flex items-center justify-center text-amber-500">
                    4.8<svg className="w-4 h-4 ml-1 fill-current" viewBox="0 0 16 16">
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400">
                      Intermediate
                    </span>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
