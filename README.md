# Parrot Poster

Parrot Poster is a powerful and resilient automation tool built with Node.js, TypeScript, and Puppeteer. It is designed to automate the process of posting articles to Daum Cafe forums based on a flexible configuration and a cron-based schedule.

## ✨ Features

-   **Config-Driven Jobs**: Easily define multiple posting tasks, each with its own credentials, content, and schedule, in a central configuration file.
-   **Cron Scheduling**: Uses `node-cron` to execute jobs at precise times or intervals.
-   **Sequential Job Queue**: Prevents multiple browser instances from running simultaneously by processing all triggered jobs in a sequential queue.
-   **Randomized Delay (Jitter)**: Blurs the exact execution time of cron jobs by adding a random delay, making automation appear more human-like.
-   **Persistent Sessions**: Saves and reuses browser sessions to minimize the need for frequent logins, improving speed and reducing the risk of being flagged.
-   **Automatic Retry Logic**: Automatically retries failed jobs up to a configurable limit, making the process resilient to temporary network or page errors.
-   **Robust Logging**: Implements `winston` for detailed logging to both the console (with colors) and daily rotating log files.
-   **Credential-Safe**: Keeps sensitive credentials separate from the main configuration using a git-ignored `secrets.ts` file.
-   **Headless & Headful Modes**: Run Puppeteer with a visible browser for debugging or in headless mode for production servers.
-   **Single Job Execution**: Supports running a single, specific job on-demand via command-line arguments for testing and debugging.

## 🛠️ Tech Stack

-   **Core**: Node.js, TypeScript
-   **Browser Automation**: Puppeteer
-   **Scheduling**: `node-cron`
-   **Logging**: `winston` & `winston-daily-rotate-file`

## 📂 Project Structure
 ├── conf/ 
 │   ├── conf.ts           # Main configuration for all posting jobs. 
 │   └── secrets.ts        # (GIT-IGNORED) Stores sensitive user credentials. 
 ├── logs/ 
 │   └── ...               # (GIT-IGNORED) Contains daily log files. 
 ├── sessions/ 
 │   └── ...               # (GIT-IGNORED) Stores saved browser session cookies. 
 ├── src/ 
 │   ├── daumService.ts    # Core Puppeteer logic for logging in and posting. 
 │   ├── logger.ts         # Winston logger configuration. │   └── types.ts          # TypeScript type definitions for configs. 
 ├── .gitignore            # Specifies files to be ignored by Git. ├── index.ts              # Main application entry point, scheduler, and queue processor. 
 ├── package.json 
 └── tsconfig.json

## 🚀 Getting Started

### 1. Prerequisites

-   Node.js (v18 or later recommended)
-   npm

### 2. Installation

Clone the repository and install the dependencies.

### 3.  Configurationa. 
- Set Up CredentialsCreate a secrets.ts file inside the conf/ directory. This file is git-ignored, so your passwords will not be committed to version control.

- Configure JobsOpen conf/conf.ts to define your posting jobs. You can add, remove, or modify job objects in the configs map.•description: A human-readable name for the job.•user/pwd: Credentials (the getPassword function links to secrets.ts).•board/debug_board: The target Daum Cafe board URLs.•title/contents: The article title and body. The body is an array of structured content blocks (Text, Link, Image, etc.).•cron: A cron expression (or array of expressions) for scheduling.•startNow: If true, the job will be enqueued immediately on application start.•debug: If true, posts to debug_board instead of board.•disabled: If true, the job will be completely ignored by the scheduler.

## 🏃‍♂️ Running the Application
You can run the application in two modes.
### Standard Scheduler Mode
This is the default mode. It will schedule all non-disabled jobs from conf/conf.ts according to their cron patterns.

```aiexclude

#### b. Configure Jobs

Open `conf/conf.ts` to define your posting jobs. You can add, remove, or modify job objects in the `configs` map.

-   `description`: A human-readable name for the job.
-   `user`/`pwd`: Credentials (the `getPassword` function links to `secrets.ts`).
-   `board`/`debug_board`: The target Daum Cafe board URLs.
-   `title`/`contents`: The article title and body. The body is an array of structured content blocks (Text, Link, Image, etc.).
-   `cron`: A cron expression (or array of expressions) for scheduling.
-   `startNow`: If `true`, the job will be enqueued immediately on application start.
-   `debug`: If `true`, posts to `debug_board` instead of `board`.
-   `disabled`: If `true`, the job will be completely ignored by the scheduler.

## 🏃‍♂️ Running the Application

You can run the application in two modes.

### 1. Standard Scheduler Mode

This is the default mode. It will schedule all non-disabled jobs from `conf/conf.ts` according to their cron patterns.

```

### Single Job Mode
```aiexclude

### 2. Single Job Mode

To run a single, specific job immediately for testing or debugging, pass its configuration key as a command-line argument. This will bypass the cron schedule and the random delay.

```