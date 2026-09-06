"use client";

import { motion, useReducedMotion } from "framer-motion";

interface WordRevealProps {
  text: string;
  /** 需要渐变强调的词（按空格切分后精确匹配） */
  accent?: string[];
  className?: string;
  delay?: number;
}

/** Section H2 逐词 rotateX + 上移入场（签名动效：Text Animation — Section H2） */
export function WordReveal({ text, accent = [], className, delay = 0 }: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <h2 className={`text-balance ${className ?? ""}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block will-change-transform ${
            accent.includes(word) ? "text-gradient" : ""
          }`}
          initial={reduce ? false : { opacity: 0, y: 26, rotateX: -45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformPerspective: 600 }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </h2>
  );
}
