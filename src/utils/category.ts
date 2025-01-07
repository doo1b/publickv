export const expenseMain = ["주 재료", "공용 재료", "대행비"];

export const expenseSub: { [key: string]: string[] } = {
  "주 재료": [
    "포아이니",
    "장칼국수",
    "스테이크",
    "행찜",
    "그집냉면",
    "아수라",
    "오삼땡",
    "효자동",
    "계탄족",
    "뼈해장국",
    "달봉이네",
    "정셰프",
  ],
  "공용 재료": ["공용 식자재", "공용 용기"],
  대행비: ["2호", "3호", "5호", "6호"],
};

export const menu = [
  ["호수별 비용", "/expense"],
  ["금융 비용", "/expense/financial"],
  ["지출 통계", "/"],
];

export const financialMain = [
  "임대",
  "렌탈",
  "이자",
  "원리금",
  "운영비",
  "공과금",
];

export const legend: { [key: string]: string } = {
  "50만원 이하": "black",
  "100만원 이하": "green",
  "500만원 이하": "blue",
  "500만원 초과": "red",
};
