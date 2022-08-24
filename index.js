// ======================================== firebase 초기화 코드 ======================================== //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getFirestore, doc, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";

// 연동할 firebase console configration
const firebaseConfig = {
    apiKey: "AIzaSyDoMRDV3ZcPRKj6mzbwYpAAmQFZEbdw0sY",
    authDomain: "kh-semi-jogym.firebaseapp.com",
    databaseURL: "https://kh-semi-jogym-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kh-semi-jogym",
    storageBucket: "kh-semi-jogym.appspot.com",
    messagingSenderId: "370262867991",
    appId: "1:370262867991:web:d04a2109a1d43a33675c52"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// 로그인한 사용자 확인하기
onAuthStateChanged(auth, async (user) => {
    if(user) { // 로그인한 사용자가 있을 경우
        const userUid = user.uid;
        // 회원 로그인 되었을 때 로그인한 회원의 이름을 띄우기
        const userNameQuerySnapshot = await getDocs(query(collection(db, "user"), where("uid", "==", userUid)));
        userNameQuerySnapshot.forEach((doc) => {
            const displayName = doc.data().이름;
            // console.log(doc.id, " => ", doc.data());

            const displayNameTemplate = `
            <span id="userDisplayName" style="color: white; padding-right: 5px;">${displayName}님</span>
            `
            $("#userDisplayNameAppend").append(displayNameTemplate);
        })

        // 로그인 버튼 및 회원가입 버튼의 text 값 변경하기
        document.getElementById('loginBtn').textContent = "LOGOUT";
        document.getElementById('joinBtn').textContent = "MY PAGE";
        
        // 로그인 버튼 및 회원가입 버튼에 대한 아이디 값 바꿔주기
        const loginToLogout = document.getElementById('loginBtn');
        const joinToMypage = document.getElementById('joinBtn');

        loginToLogout.setAttribute('id', 'logoutBtn');
        joinToMypage.setAttribute('id', 'mypageBtn');

        // 로그아웃 버튼 눌렀을 때
        document.getElementById('logoutBtn').addEventListener('click', (event) => {
            signOut(auth)
            .then(function() {
                alert("로그아웃 되었습니다.");
                location.href = 'index.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                alert('로그아웃 실패');
            })
        });
        
        // 로그인한 상태에서 마이페이지 버튼을 눌렀을 때
        document.getElementById('mypageBtn').addEventListener('click', (event) => {
            location.href = './mypage/mypage.html';
        });

        console.log("현재 로그인한 사용자 user ==> " + user.uid);   
    } else { // 로그인한 사용자가 없을 경우
        console.log('로그인한 사용자가 없습니다.');
    } 
});
