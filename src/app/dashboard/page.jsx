// src/app/dashboard/page.jsx
// No need to import Link here as the sidebar handles navigation
export default function DashboardPage() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard!</h1>
      <p className="mt-4 text-lg">
        You are now logged in and can manage your products.
      </p>
    </div>
  );
}
