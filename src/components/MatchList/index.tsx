import "./styles.css";
import { MatchCard } from "../MatchCard";

const MATCHES = [
  {
    date: "11 JUN • 16:00",
    venue: "Estádio Azteca, Cidade do México",
    homeTeam: {
      name: "México",
      flagAlt: "Mexico Flag",
      flagSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCdJxUEAtlPXA0MC7_nVwqiqyPKd66XkJUbHWZBvIATsI7BaozopEpl5lHg2zKYsK1IUsCjkDbnv-5ofXEULFTavk1hQgIZo1aCZMSi8pKgMaLEoyGCGZQanYKkZWDVPlaHtele2gP08t4Tj01-TWMIqfVGLkAzPpsPVsYdXdx6KMSlwhOAsLlMW1apTssw-iudFDkOLXT2x8kmHscLl8j-izagSmfLePu5DBd9tL3I4DQBCoLkIKL6_hiTegk1DNCuAXhFXP-vVMKH",
    },
    awayTeam: {
      name: "EUA",
      flagAlt: "USA Flag",
      flagSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAd4rH5SdE13DieKNSuef12pKMfapg54Ss6Yoq79SSl0mcwxa6sGl6D8uavg0o-FbZXROKTQoAJswwWIRvQQ55H3hj7Q5DF1IPjh-fH17mAiYeD0cBMA5kuKLxAoc_KsnNfdNiLUZGkfsVH6OqecrWfOd7MZygrZUZd8YJFvnCI7-sB64Md2jXPGuWdsFOLVURYFleftge2wfe1KZkkf87p8Cv9a_QBpFmjkrRY4zljachPN0uKVj6IDUV_vi-Jxyv6hT9SJ_6yKv7B",
    },
    homeScore: "2",
    awayScore: "1",
    saved: true,
  },
  {
    date: "12 JUN • 19:00",
    venue: "SoFi Stadium, Los Angeles",
    homeTeam: {
      name: "Austrália",
      flagAlt: "Australia Flag",
      flagSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAEOn1J8ZX3eYWvkIECVY-pJp5eFWtfOpICvZsp1pdHhGWR4qKp7QKcyarEzpehYaXP5NXTcmzzkr3zqxx0UyLD69mFA_9TQ3-qG0zIAEWM0B2N2guQ1gD1-mzFbNohZMgSGt2kjqkjwOW77U7ePnTMhuCZwuoBirvrkEhJWZeid1bhhZdghSkTi_8rae4dPRVenfNVC0ZI2871ZesxfwH7ixKgg9XTpgVZa59qjXlVfu7oFrRCS-HQumBWwBSqF7_ZDhsZUr66Hez8",
    },
    awayTeam: {
      name: "Argélia",
      flagAlt: "Algeria Flag",
      flagSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDHwONKUQQkpcBILwEZ7LrJW5y5rkNa6UHfqNZhK9xqTHuit1aQd0VuZT9wcdK24LjHkYMTkcV3eX1cth3KRbcvMbtrg_X32A4S8dKbZzLbduouTwEZdZ_Prjv3gBzhgUjgXF5hiaATD35KDfG84QNlG0efjs3ZvAxVv_Z6WAX7udIOCPopJM-EZjhuDeRroaODt2vhnuPrTL0HJ_1Kyz5o2p-m6G3VLuUDiyQlAdzHJutZLGb8c2uKEQRUWNExjhwjC1gx1zvPzsQ7",
    },
    homeScore: "0",
    awayScore: "0",
    saved: false,
  },
  {
    date: "15 JUN • 14:00",
    venue: "BC Place, Vancouver",
    homeTeam: {
      name: "Canadá",
      flagAlt: "Canada Flag",
      flagSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA1HenwDaEzGy3CvbOezRLqAN72UxG0j6Set-hEYDHYpIzFaOY_IN8EyXovicqR8Klg0OkdmHxdu9PhHg8mnlTGTOMkUw_9az8Q1J69HesVBInuIvwbHGMqA06X9p7LE55Ymrx5eAwgklJDVbBbkHwc9vZCRB8gD81KNPaeRCw_spci8OD5L2DQ9mfrKCvgqgp5TxIf3rYj1S62hYETE-gYaJZCo2B7nqk3z727ohWPNZTFdU5vdcxVhg1UHSqeikb5B4pSAWJePHgg",
    },
    awayTeam: {
      name: "Coréia do Sul",
      flagAlt: "South Korea Flag",
      flagSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD2GN_ZzyCjmjtSMAHhNuUbAbfuogsnekrSM7-UL5nvLmJCIgwAI--iRg-Hm4a2HnZn5WU2WdzdsVXb3NBSokng5QuS7y7hj2ukSGTzM7h0JwgYAcdknaomJS8tjv-pZ5XxEqpuXiLv7W-l4nO12q_jy8uMsSIfkYiLmeoOD2QBFcVrMdtSNI-WYmRXlTgHbLD4E9JBP8JwAVBWbDUOoBOGaKRjOGPaQtGjGcdvmdbpTy6-g-K32ZTkOZoyUKA2PO4B0tRsRSWLs7iY",
    },
    homeScore: "0",
    awayScore: "0",
    saved: false,
  },
];

export function MatchList() {
  return (
    <div className="match-list">
      {MATCHES.map((match, index) => (
        <MatchCard key={index} {...match} />
      ))}
    </div>
  );
}
