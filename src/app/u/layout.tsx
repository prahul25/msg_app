import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "True Feedback App",
  description: "Real feedback from real people.",
};;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
