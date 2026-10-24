// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// GitHub Pages 项目站点：仓库名决定 base 与 site，改名时两处一起改。
const repo = 'college-wiki-hub';

export default defineConfig({
	site: `https://eryuemu.github.io/${repo}/`,
	base: `/${repo}/`,
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: '高校 Wiki 目录',
			description:
				'收集中国各高校由学生或校友自建的知识站入口。本站只做导航与外链，不镜像、不改写任何学校的正文内容。',
			defaultLocale: 'zh-CN',
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub 仓库',
					href: `https://github.com/eryuemu/${repo}`,
				},
			],
			editLink: {
				baseUrl: `https://github.com/eryuemu/${repo}/edit/main/src/content/docs/`,
			},
			lastUpdated: true,
			sidebar: [
				{
					label: '目录',
					items: [{ label: '全部条目', slug: 'wikis' }],
				},
				{
					label: '关于',
					items: [{ label: '关于本站', slug: 'about' }],
				},
			],
		}),
	],
});
