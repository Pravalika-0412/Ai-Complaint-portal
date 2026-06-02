# Security Policy

## Supported Versions

Security fixes are provided for the latest version on the default branch.

## Reporting a Vulnerability

Do not open public issues for suspected vulnerabilities. Email the project
maintainers or use your organization's private disclosure channel with:

- Affected component and version or commit SHA.
- Steps to reproduce.
- Potential impact.
- Any suggested mitigation.

Maintainers should acknowledge reports within 5 business days and provide a
triage update as soon as practical.

## Security Controls

This repository includes:

- Bandit for Python security checks.
- detect-secrets for secret scanning.
- pip-audit for dependency vulnerability checks.
- Pre-commit hooks for local validation before code is committed.

