"use client";

import PeriodicTable from "./components/PeriodicTable/PeriodicTable";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <h1>Periodic Table</h1>
      <PeriodicTable />
    </div>
  );
}
