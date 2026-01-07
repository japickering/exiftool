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
  "An EXIF Tool UI that can read Image metadata formats like EXIF and XMP from JPEGs and PNG files";

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
        <div className={styles.intro}>
          <h1>{title}</h1>
          <p>{content}.</p>
          <p>The URL must contain a valid path to the image file.</p>
        </div>
        <main className={styles.main}>
          <MainForm />
        </main>
      </div>
    </>
  );
}
