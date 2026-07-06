# Security Policy

Security reports are taken seriously. If you find a vulnerability in Despical's
Javadocs, please report it privately instead of opening a public issue.

## Reporting a Vulnerability

Please send security reports to:

```text
contact@despical.dev
```

When possible, include the following details:

* A clear description of the vulnerability.
* Steps to reproduce the issue.
* The affected URL, commit, branch, workflow run, or deployment environment.
* Any relevant logs, screenshots, request examples, or proof of concept details.
* Whether the issue appears to affect GitHub Pages output, generated Javadocs,
  external links, site assets, or GitHub Actions workflow behavior.

Please do not include destructive payloads, private credentials, or anything
that could damage a running deployment.

## Scope

The following areas are considered security-sensitive:

* GitHub Pages deployment and custom domain behavior.
* GitHub Actions workflow permissions and generated commits.
* Javadoc synchronization from configured upstream repositories.
* Static site assets, links, redirects, and generated HTML.
* Unexpected script execution or unsafe content in generated pages.

Reports about spelling, layout bugs, stale Javadocs, or non-security issues
should use the normal GitHub issue tracker instead.

## Supported Versions

Only the latest public version of Despical's Javadocs on `main` is currently
supported.

## Response

After a valid report is received, the issue will be reviewed as soon as possible.
If the report is confirmed, a fix will be prepared privately and released with
credit where appropriate.

Please avoid public disclosure until a fix is available.
