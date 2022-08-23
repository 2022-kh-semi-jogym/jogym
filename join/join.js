import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJZW9NZF8C4Jt8rvdL7i3BDR_c_S3v76M",
  authDomain: "semi-project-9261f.firebaseapp.com",
  databaseURL: "https://semi-project-9261f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "semi-project-9261f",
  storageBucket: "semi-project-9261f.appspot.com",
  messagingSenderId: "412207407765",
  appId: "1:412207407765:web:f10778cd22a790c3d9719c",
  measurementId: "G-9LW5P71WB6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// 회원가입 버튼을 누르면
document.getElementById("signUpButton").addEventListener("click", (event) => {
  event.preventDefault(); // 회원가입 버튼을 누르더라도 페이지 새로고침이 되지 않음

  // 회원가입 시 필요한 사용자 이메일/비밀번호 (회원가입 폼의 input태그 id값 가져오기)
  const userEmail = $("#userEmail").val();
  const userPassword = $("#userPassword").val();

  // 회원가입 시 추가 정보 입력 사항
  const userName = $("#userName").val();
  const userBirth = $("#userBirth").val();
  const userTel = $("#userTel").val();
  const userAddr1 = $("#userAddr1").val();
  const userAddr2 = $("#userAddr2").val();

  // 회원가입 처리
  createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredentials) => {
      const user = userCredentials.user;
      const uid = user.uid;

      // 회원가입이 진행될 때 추가 정보가 firestore에 저장되어야함
      // insert here
      setDoc(doc(db, "user", uid), {
        // user.uid를 사용하여 회원가입 시 생성된 회원의 uid에 추가 정보가 저장됨
        이름: userName,
        전화번호: userTel,
        주소: userAddr1,
        상세주소: userAddr2,
        이메일: userEmail,
        생년월일: userBirth,
        uid: uid,
      });

      // console.log("uid ===> " + uid)
      console.log("회원가입 성공");
      alert("회원가입 성공");

      // 회원가입 성공 시 페이지 이동
      // location.href = "../index.html";
      // 여기서 페이지 이동을 하면 추가 정보 저장이 안된다... 왜 안되는건데ㅠ

      // 회원가입 하면 로그인이 자동으로 된다. 로그아웃을 해줘야함
      // signOut();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // 이메일 중복검사를 위한 에러 메세지 확인 (이메일 중복검사를 할 수 있는 다른 방법이 있을 것 같다.)
      if (errorCode == "auth/email-already-in-use") {
        alert("동일한 이메일이 존재합니다.");
      } else if (errorCode == "auth/invalid-email") {
        alert("이메일 형식을 확인해주세요.");
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
        console.log("errorMessage ==> " + errorMessage);
      }
    });
});

// 회원가입 취소 버튼을 누르면
$("#cancelButton").click(function (event) {
  if (confirm("회원가입 진행중입니다. 취소하시겠습니까? \n확인 버튼을 누르시면 홈페이지 메인으로 이동합니다.")) {
    location.href = "../index.html";
  } else {
    event.preventDefault();
  }
});
