import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import MainForm from "@/pages/MainForm";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "EXIF Tool UI";
const content =
  "An EXIF Tool can read and write Metadata on JPEG and PNG image files.";

export default function Home() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <header>
          <h1>{title}</h1>
          <p>{content}</p>
        </header>
        <main className={styles.main}>
          <MainForm />
        </main>
      </div>
    </>
  );
}
