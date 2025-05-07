# DevOps Blog

A modern, minimal blog website for a DevOps engineer to share insights, tutorials, and experiences. Built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI.

## Features

- **Modern UI**: Clean and minimal design with dark/light mode support
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Blog System**: Display and organize blog posts with categories and tags
- **Projects Showcase**: Display DevOps projects and contributions
- **Contact Form**: Allow visitors to get in touch
- **About Page**: Share professional background and expertise
- **SEO Optimized**: Meta tags for better search engine visibility

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Theme**: Next Themes for dark/light mode
- **Date Formatting**: date-fns

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/devops-blog.git
cd devops-blog/frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── app/          # App router pages
│   │   ├── about/    # About page
│   │   ├── blog/     # Blog pages
│   │   ├── contact/  # Contact page
│   │   ├── projects/ # Projects page
│   ├── components/   # React components
│   │   ├── ui/       # UI components from shadcn/ui
│   │   ├── navbar.tsx # Navigation component
│   │   ├── footer.tsx # Footer component
│   ├── lib/          # Utility functions
```

## Deployment

This project can be deployed on Vercel with zero configuration:

```bash
npm run build
# or
yarn build
```

## Future Enhancements

- **Backend Integration**: Add a backend for storing blog posts in a database
- **Authentication**: Add user authentication for admin functionality
- **Comments**: Add a commenting system for blog posts
- **Newsletter**: Add a newsletter subscription feature
- **Search**: Add search functionality for blog posts

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
