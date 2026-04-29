"use client";
import Link from "next/link";

export function DocsTab({ active }: { active: boolean }) {
  return (
    <Link href="/docs" legacyBehavior>
      <a className={`${active ? "groupTabActive" : "groupTab"} groupTab`}>
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 7}}><rect width="16" height="16" rx="3" fill="currentColor" opacity="0.13"/><path d="M5.5 4.5h5M5.5 7.5h5M5.5 10.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        Docs
      </a>
    </Link>
  );
}
