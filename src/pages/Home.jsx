import React from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Welcome">
        <p className="mb-4">This project demonstrates React components, Tailwind CSS, hooks, context, and API integration.</p>
        <Link to="/tasks"><Button>Go to Tasks</Button></Link>
      </Card>

      <Card title="API & Data">
        <p className="mb-4">Fetch sample posts from JSONPlaceholder with search, pagination and loading states.</p>
        <Link to="/api"><Button variant="secondary">View API Data</Button></Link>
      </Card>
    </div>
  );
}
