"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { useChat } from "@ai-sdk/react";

// For list of available models visit https://deepinfra.com/models
const DI_MODEL = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo";

function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { model: DI_MODEL },
  });

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user" ? styles.messageUser : styles.messageAI
            }
          >
            {message.role === "user" ? "User: " : `${DI_MODEL}: `}
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          name="prompt"
          placeholder="Ask me anything"
          value={input}
          onChange={handleInputChange}
          className={styles.chatInput}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.diLogo}
          src="/deepinfra_logo.png"
          alt="Deep Infra logo"
          width={385}
          height={105}
          priority
        />

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdeepinfra%2Fdeepinfra-chat&products=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22deepinfra%22%2C%22productSlug%22%3A%22api-token%22%2C%22protocol%22%3A%22ai%22%7D%5D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://deepinfra.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>

      <Chat />

      <footer className={styles.footer}>
        <a
          href="https://deepinfra.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to deepinfra.com →
        </a>
      </footer>
    </div>
  );
}
