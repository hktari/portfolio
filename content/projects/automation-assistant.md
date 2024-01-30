---
title: "Automation Assistant"
categories: ['web-dev']
description: "An application performing automation actions on a specific website"
image: images/automation-assistant/logo.webp
websiteUrl: https://moderkorencek.netlify.app/
github: []
date: 2024-02-05T13:54:50+02:00
draft: false
---

# Automation Assistant
This project was started as a means to automate the workflow of a personal assistant. It automates the web app a personal assistant uses daily to log time during work. 

It consists of:
- a node app running puppeteer
- a postgres database
- an express REST api
- a React frontend app

It is deployed using docker to a VPS. The frontend is hosted on Netlify.

## Mobile website

{{< figure src="/images/automation-assistant/mobile-login.webp" alt="Login Page" >}}
{{< figure src="/images/automation-assistant/mobile-dashboard.webp" alt="Dashboard Page" >}}
{{< figure src="/images/automation-assistant/mobile-configurations.webp" alt="Configuration Page" >}}
{{< figure src="/images/automation-assistant/mobile-calendar.webp" alt="Calendar on the Configuration Page" >}}


