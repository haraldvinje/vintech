# VinTech Website

This repository contains the source code for [vintech.no](https://www.vintech.no).

## Getting Started

This guide will help you set up the development environment, even if you're new to some of these tools.

### Prerequisites

This project uses:

- **Bun**: A fast JavaScript runtime and package manager
- **asdf**: A tool version manager to ensure we all use the same version of Bun

### Step 1: Install asdf

asdf is a tool that manages different versions of language runtimes. Follow these instructions to install it:

#### On macOS:

```bash
# If you have Homebrew
brew install asdf

# Add to your shell (for Zsh)
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.zshrc
source ~/.zshrc
```

#### On Linux:

```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.11.3
echo -e "\n. $HOME/.asdf/asdf.sh" >> ~/.bashrc
echo -e "\n. $HOME/.asdf/completions/asdf.bash" >> ~/.bashrc
source ~/.bashrc
```

For other operating systems or shell configurations, see [asdf Installation](https://asdf-vm.com/guide/getting-started.html).

### Step 2: Install Bun with asdf

```bash
# Add the bun plugin to asdf
asdf plugin add bun

# Install the correct version of bun (specified in .tool-versions)
asdf install

# Verify that bun is installed correctly
bun --version
```

### Step 3: Set up the project

```bash
# Clone the repository (if you haven't already)
git clone <repository-url>
cd vintech

# Install project dependencies
bun install

# Start the development server
bun dev
```

### Step 4: View the website

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

- src: Contains the source code for the website
  - `app/`: Next.js app directory with routes and pages
  - `components/`: Reusable UI components
- public: Static files like images and fonts
- messages: Translation files for different languages

## Common Commands

```bash
# Start development server
bun dev

# Build for production
bun run build

# Run linting
bun run lint
```

## Need Help?

If you're stuck or have any questions, feel free to reach out! We're happy to help you get started.
