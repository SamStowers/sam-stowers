# Sam Stowers - Academic & Research Website

Personal academic and systems research portfolio for **Sam Stowers**, aspiring Computer Science PhD student specializing in **Operating Systems, Linux Kernel Virtualization (KVM), and Low-Level Lock Contention**.

Configured for hosting on GitHub Pages: [`https://github.com/SamStowers/sam-stowers`](https://github.com/SamStowers/sam-stowers).

---

## 🌟 Highlights

- **Research Spotlight**: Comprehensive deep-dive on [SAGE (Sensitivity-Adjusted Gap Exiting)](sage.html), a dynamic Linux KVM hypervisor mechanism achieving **>2× speedup** under high vCPU lock contention.
- **Published Thesis**: Direct links to Syracuse University SURFACE Thesis [#1023](https://surface.syr.edu/thesis/1023/) (Advised by Prof. Bryan Kim).
- **Academic Credentials**: Combined 4-Year BS/MS in CS from Syracuse University (MS GPA 4.0, BS GPA 3.99 Summa Cum Laude, Tau Beta Pi).
- **Interactive Features**: Dark / Light theme toggle, interactive benchmark visualizer, integrated CV PDF viewer modal, and copy-to-clipboard utilities.

---

## 📁 File Structure

```text
.
├── index.html                  # Main academic portfolio hub
├── sage.html                   # Dedicated SAGE research deep dive & benchmark visualizer
├── style.css                   # Responsive design system with dark/light mode tokens
├── main.js                     # Theme persistence, benchmark controls, modal logic
├── Sam_Stowers_CV_8-21-26.pdf  # Curriculum Vitae
├── sam_stowers_pfp.jpg         # Profile image
├── .nojekyll                   # Disables Jekyll processing on GitHub Pages
└── README.md                   # Repository documentation
```

---

## 🚀 Local Preview

To preview the website locally:

```bash
# Using Python 3 HTTP server
python3 -m http.server 8080
```

Open your browser to:
- **Main Hub**: [http://localhost:8080/index.html](http://localhost:8080/index.html)
- **SAGE Research Deep Dive**: [http://localhost:8080/sage.html](http://localhost:8080/sage.html)

---

## 🌐 Deploying to GitHub Pages

1. Initialize git and commit files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Sam Stowers academic & research portfolio"
   ```
2. Connect to the GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/SamStowers/sam-stowers.git
   git push -u origin main
   ```
3. In GitHub repository settings:
   - Navigate to **Settings** &rarr; **Pages**
   - Under **Build and deployment** &rarr; **Branch**, select `main` / `(root)` and click **Save**.
