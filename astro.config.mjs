// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// 组织用户站：仓库名必须是 <组织>.github.io，站点直接挂在根路径，没有仓库名那一段。
const owner = 'collegewiki';
const repo = 'collegewiki.github.io';

export default defineConfig({
	site: `https://${owner}.github.io/`,
	base: '/',
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
					href: `https://github.com/${owner}/${repo}`,
				},
			],
			editLink: {
				baseUrl: `https://github.com/${owner}/${repo}/edit/main/src/content/docs/`,
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
