<img
  src='https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png'
  height='48'
/>

# carbonplan / blog

**short updates on what we do at CarbonPlan**

[![GitHub][github-badge]][github]
![MIT License][]

[github]: https://github.com/carbonplan/blog
[github-badge]: https://flat.badgen.net/badge/-/github?icon=github&label
[mit license]: https://flat.badgen.net/badge/license/MIT/blue

This repository contains our directory of blog posts and announcements. Browse at [carbonplan.org/blog](https://carbonplan.org/blog).

The site is a [Next.js](https://nextjs.org/) project, deployed on [Vercel](https://vercel.com/).

## to build the site locally

Assuming you already have `Node.js` installed, you can install the build dependencies as:

```shell
npm install .
```

To start a development version of the site, simply run:

```shell
npm run dev
```

and then visit `http://localhost:4001/blog` in your browser.

### posts

New posts should be added to `posts/` with the post content exported from `posts/{post-name}.md`.

#### components

Beyond the default set of components available to each post, extra components (e.g. figures and tables) must be configured using the `components` key in the MDX frontmatter. Any named exports corresponding to the `name` key will be considered first, followed by the default export.

```yaml
components:
  - name: ComponentName
    src: ./path/to/component
```

You may also use components imported from external packages. For example,

```yaml
components:
  - name: Sun
    src: '@carbonplan/icons'
```

You may also specify an `exportName` that is distinct from the `name` used for reference within MDX. For example,

```yaml
components:
  - name: ThemedLink
    src: theme-ui
    exportName: Link
```

To wire through components for availability in MDX, you can start a development version of the site or explicitly run:

```shell
npm run build-components
```

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/) licensed, but we request that you please provide attribution if reusing any of our digital content (graphics, logo, articles, etc.).

## about us

CarbonPlan is a non-profit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of climate solutions with open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/blog/issues/new) or [sending us an email](mailto:hello@carbonplan.org).
