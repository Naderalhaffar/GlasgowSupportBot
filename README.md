# Glasgow Support Bot

## Introduction

This repository contains the code for the Glasgow Support Bot, a chatbot designed to assist students of the University of Glasgow by providing quick and easy access to information about support services. This tool aims to simplify the process of finding information about various services such as disability support, mental health resources, academic assistance, and more.

## Installation and Setup

### Git Installation

Clone this repository using Git:

```bash
git clone https://github.com/Naderalhaffar/GlasgowSupportBot.git
```

### Initial Setup

After cloning the repository, change into the GlasgowSupportBot directory:

```bash
cd GlasgowSupportBot
```

### Create Virtual Environment

**Windows:**

- If you have Anaconda installed:

  ```bash
  conda create --name GlasgowSupportBot
  conda activate GlasgowSupportBot
  ```

- If you don't have Anaconda installed:

  ```bash
  python -m venv GlasgowSupportBot
  GlasgowSupportBot\Scripts\activate
  ```

### Backend Install Dependencies

Navigate to the backend directory:

```bash
cd backend
pip install -r requirements.txt
```

### Install Frontend Dependencies

Before moving to the frontend, make sure you are in the GlasgowSupportBot root directory. Then, activate the virtual environment then navigate to the frontend directory:

```bash
cd frontend
npm install
```

### Launching the App

- In the first terminal (backend), ensure you are in the backend directory then start the backend server:

  ```bash
  python app.py
  ```

- In the second terminal (frontend), ensure you are in the frontend directory then start the frontend:

  ```bash
  npm start
  ```
