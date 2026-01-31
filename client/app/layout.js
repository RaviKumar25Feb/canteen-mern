
export const metadata = {
  title: "Student Snack System",
  description: "Internship screening project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="bg-black text-white p-4 font-bold">
          Snack Ordering System
        </header>

        <main className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded shadow">
          {children}
        </main>
      </body>
    </html>
  );
}
