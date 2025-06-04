# 🧠 FinQuiz App

---

Welcome to FinQuiz, a dynamic and interactive financial quiz application built with **Next.js**! Test your knowledge on various financial topics, challenge yourself with a unique scoring system, and learn as you go.

## ✨ Features

* **Engaging Quiz Interface:** A clean and intuitive UI powered by Shadcn UI.
* **Dynamic Question Loading:** Questions are fetched from Supabase and shuffled on each load for a fresh experience.
* **Intelligent Scoring:**
    * Earn **+1 point** for each correct answer.
    * Lose **-1 point** for every two incorrect answers.
* **Interim Results:** Get quick summaries after every 5 questions to track your progress.
* **Responsive Design:** Enjoy the quiz seamlessly on any device.
* **Scalable Backend:** Powered by Supabase for easy data management and real-time capabilities.

---

## 📸 Screenshots


**1. Home/**
![Home Page](/public/desktop.png)


---

## 🛠️ Setup and Installation

Follow these steps to get your FinQuiz app running locally:

### 1. Clone the Repository

```bash
git clone [https://github.com/DivyanshTiwari20/fin-quiz-app.git](https://github.com/DivyanshTiwari20/fin-quiz-app.git)
cd fin-quiz-app


2. Install Dependencies
Using Yarn (recommended as per your Vercel logs):

Bash

yarn install
Or using npm:

Bash

npm install
3. Configure Environment Variables
Create a .env.local file in the root of your project and add your Supabase credentials:

Code snippet

# .env.local
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
You can find these keys in your Supabase project under Project Settings > API.
4. Set Up Your Supabase Database
You'll need a questions table in your Supabase project.

Create the questions table:
Go to your Supabase dashboard, navigate to Table Editor, and create a new table named questions.

Define Columns:
Add the following columns:

id (type: UUID, Primary Key, Default: gen_random_uuid())
question (type: text, Not Null)
options (type: jsonb, Not Null) - This column will store your question options as a JSON object, e.g., {"a": "Option A", "b": "Option B", "c": "Option C", "d": "Option D"}.
correct (type: text, Not Null) - This will store the key of the correct option, e.g., "a" or "b".
(Optional: Add created_at with timestampz and default now() if you want timestamps)
Populate with Data:
Add some sample questions directly in the Supabase Table Editor or via SQL.
Example Row:

| id                                   | question                       | options                                                              | correct |
| :----------------------------------- | :----------------------------- | :------------------------------------------------------------------- | :------ |
| a1b2c3d4-e5f6-7890-1234-567890abcdef | What is GDP?                   | {"a": "Gross Domestic Product", "b": "General Data Protocol", "c": "Global Development Plan", "d": "Government Debt Policy"} | a     |
| ...                                | ...                          | ...                                                                | ...   |

5. Run the Development Server
Bash

yarn dev
# or
npm run dev
Open your browser and visit http://localhost:3000.

🚢 Deployment
This application is configured for easy deployment with Vercel. If you've connected your Git repository to Vercel, new deployments will automatically be triggered on every push to your main branch.

Important: Remember to add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY as Environment Variables directly in your Vercel project settings under Project Settings > Environment Variables.

🤝 Contributing
Contributions are welcome! If you have suggestions or want to improve the app:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes. 4. Commit your changes (git commit -m 'feat: Add new feature').
Push to the branch (git push origin feature/your-feature-name).
Open a Pull Request.
📄 License
This project is licensed under the MIT License. See the LICENSE file for details.