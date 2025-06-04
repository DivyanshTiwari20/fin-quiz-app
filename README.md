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

*(To make your README truly shine, replace these placeholders with actual screenshots of your app!)*

**1. Home/Landing Page**
*(A compelling shot of your app's entry point)*
![Home Page](https://via.placeholder.com/800x450?text=Home+Page+Screenshot)

**2. Quiz in Progress**
*(Show a question with options)*
![Quiz in Progress](https://via.placeholder.com/800x450?text=Quiz+In+Progress+Screenshot)

**3. Interim Results Screen**
*(Show the score summary after a batch)*
![Interim Results](https://via.placeholder.com/800x450?text=Interim+Results+Screenshot)

**4. Final Results Page**
*(The final score and coins summary)*
![Final Results](https://via.placeholder.com/800x450?text=Final+Results+Screenshot)

---

## 🛠️ Setup and Installation

Follow these steps to get your FinQuiz app running locally:

### 1. Clone the Repository

```bash
git clone [https://github.com/DivyanshTiwari20/fin-quiz-app.git](https://github.com/DivyanshTiwari20/fin-quiz-app.git)
cd fin-quiz-app
```

### 2. Install Dependencies
Using Yarn (recommended):

```bash
yarn install
```
Or using npm:
```

npm install
```
### 3. Configure Environment Variables
Create a .env.local file in the root of your project and add your Supabase credentials:

```
# .env.local
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```
You can find these keys in your Supabase project under Project Settings > API.

### 4. Set Up Your Supabase Database
You'll need a questions table in your Supabase project.

### Quick SQL Setup (Recommended)
Copy and run the following SQL in your Supabase dashboard's SQL Editor to create the required table:
```
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  options jsonb not null,
  correct text not null,
  created_at timestamptz default now()
);
```
Example Insert Statement:
```
insert into public.questions (question, options, correct) values (
  'What is GDP?',
  '{"a": "Gross Domestic Product", "b": "General Data Protocol", "c": "Global Development Plan", "d": "Government Debt Policy"}',
  'a'
);
```
#### 💡 Tip: 
You can add more questions using similar INSERT statements or directly via the Supabase Table Editor.



### 5. Run the Development Server
```
yarn dev
```
 or
 ```
npm run dev
```
Open your browser and visit `http://localhost:3000`.

## 🚢 Deployment
This application is configured for easy deployment with Vercel. If you've connected your Git repository to Vercel, new deployments will automatically be triggered on every push to your main branch.

#### Important: 
Remember to add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as Environment Variables directly in your Vercel project settings under `Project Settings` > `Environment Variables`.

## 🤝 Contributing
Contributions are welcome! If you have suggestions or want to improve the app:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature-name).
3. Make your changes.
4. Commit your changes (git commit -m 'feat: Add new feature').
5. Push to the branch (git push origin feature/your-feature-name).
6. Open a Pull Request.
## 📄 License

This project is licensed under the MIT License(https://github.com/DivyanshTiwari20/fin-quiz-app?tab=MIT-1-ov-file). See the LICENSE file for details.



