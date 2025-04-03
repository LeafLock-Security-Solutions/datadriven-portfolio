# 🎨 Customization Guide

Welcome to the customization guide for **datadriven-portfolio**. This portfolio is designed to be fully data-driven, so you can update all content by modifying a single JSON file — no coding required!

---

## 📁 Step 1: Prepare Your JSON File

All portfolio content is stored in a **remote JSON file** that you control.

You can host it:
- On your own domain (e.g., `https://example.com/data.json`)
- On a public GitHub Gist or raw GitHub file
- On a headless CMS or API in future versions

Just make sure the URL is **publicly accessible** and returns valid JSON.

---

## 🧠 Step 2: Understand the JSON Structure

Here’s a simplified structure of what the JSON might look like:

```json
{
  "basics": {
    "name": "Your Name",
    "title": "Frontend Developer",
    "summary": "A short personal introduction.",
    "location": "City, Country"
  },
  "socialLinks": [
    {
      "platform": "GitHub",
      "url": "https://github.com/yourusername"
    }
  ],
  "skills": [
    "JavaScript",
    "React",
    "Tailwind CSS"
  ],
  "projects": [
    {
      "name": "Project Title",
      "description": "What the project does.",
      "link": "https://project-demo.com"
    }
  ]
}
```

This may evolve over time. You’ll always find the latest schema documented in the project’s `docs/api_schema.md`.

---

## 🎯 Step 3: Update Your Content

Simply open your JSON file, update it with your details, and save it on your chosen host.

After that, configure your portfolio to point to that URL — and your content will appear instantly.

---

## 💡 Tips

- Always ensure your JSON is **valid**. Use tools like [JSONLint](https://jsonlint.com/) to verify before saving.
- Keep text concise and impactful — this portfolio is designed to be clean and minimal.
- Emoji and line breaks are supported in most fields.

---

## 🛠️ Advanced Customization (Coming Soon)

Future releases will include:
- Theming options (light/dark/custom colors)
- Section toggles via JSON
- Backend-based content management

---

## ❓ Need Help?

If you run into any issues while customizing, feel free to [open an issue](https://github.com/LeafLock-Security-Solutions/datadriven-portfolio/issues).

We’re here to help!
