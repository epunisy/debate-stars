// 디베이트 매치(room.html) 설정
// 1) Firebase 콘솔 > 프로젝트 설정 > 내 앱(웹) 의 firebaseConfig 값을 아래에 붙여 넣기 (공개돼도 되는 값)
// 2) AI 판정 서버(Cloudflare Worker)를 배포하면 주소를 JUDGE_URL 에 넣기
export const firebaseConfig = {
  apiKey: "AIzaSyBFvHpveUTg77ntFKD_Efc2nseWO6h29pg",
  authDomain: "debate-stars.firebaseapp.com",
  databaseURL: "https://debate-stars-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "debate-stars",
  storageBucket: "debate-stars.firebasestorage.app",
  messagingSenderId: "83065704422",
  appId: "1:83065704422:web:27f09b0f0c61d7656a1027"
};
// 예: { apiKey: "...", authDomain: "xxx.firebaseapp.com", databaseURL: "https://xxx-default-rtdb.asia-southeast1.firebasedatabase.app", projectId: "xxx", appId: "..." }

export const JUDGE_URL = "https://debate-stars-judge.debate-stars-judge.workers.dev";
// 예: "https://debate-stars-judge.<계정>.workers.dev"

// 앱 홈 화면에 '디베이트 매치' 버튼을 보일지 (false: 숨김. room.html 주소로 직접 들어가면 테스트 가능)
export const FRIEND_PUBLIC = true;
