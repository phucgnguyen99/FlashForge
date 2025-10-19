export type Card = { id: string; question: string; answer: string };
export type Deck = { id: string; title: string; cards: Card[] };

export const decks: Deck[] = [
  {
    id: "java",
    title: "Java Core",
    cards: [
      { id: "j1", question: "Four pillars of OOP?", answer: "Encapsulation, Inheritance, Polymorphism, Abstraction." },
      { id: "j2", question: "Checked vs Unchecked exceptions?", answer: "Checked: checked at compile time (IOException); Unchecked: runtime (NullPointerException)." },
      { id: "j3", question: "Immutable class rules?", answer: "Private final fields, no setters, defensive copies, class final." },
    ],
  },
  {
    id: "aws",
    title: "AWS Basics",
    cards: [
      { id: "a1", question: "EC2 vs Lambda?", answer: "EC2 = servers you manage; Lambda = serverless functions billed per invocation/time." },
      { id: "a2", question: "S3 storage classes?", answer: "Standard, IA, One Zone-IA, Glacier Instant/FLR/Deep Archive." },
      { id: "a3", question: "IAM Role vs Policy?", answer: "Role: identity assumed by principals; Policy: JSON permissions attached to identities/resources." },
    ],
  },
  {
    id: "dsa",
    title: "DSA Fundamentals",
    cards: [
      { id: "d1", question: "Array vs Linked List?", answer: "Array: O(1) index, costly inserts; List: O(1) insert/delete (known node), O(n) index." },
      { id: "d2", question: "Big-O of binary search?", answer: "O(log n) time, O(1) space." },
      { id: "d3", question: "Stack vs Queue?", answer: "Stack: LIFO; Queue: FIFO." },
    ],
  },
];
