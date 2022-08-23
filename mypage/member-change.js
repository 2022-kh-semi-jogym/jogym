"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
  getFirestore,
  doc,
  query,
  where,
  getDocs,
  collection,
  getDocFromCache,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log("현재 로그인한 사용자 ==> " + uid);

    const querySnapshot = await getDocs(
      query(
        collection(db, "user"), //
        where("uid", "==", uid)
      )
    ) //
      .then((doc) => {
        const jsonDoc = JSON.stringify(doc.docs[0]);
        const obj = JSON.parse(jsonDoc);
        const name = obj._document.data.value.mapValue.fields.이름.stringValue;
        const birthday = obj._document.data.value.mapValue.fields.생년월일.stringValue;
        const email = obj._document.data.value.mapValue.fields.이메일.stringValue;
        console.log(name);
        console.log(birthday);
        console.log(email);
        $("#userName").append(name);
        $("#birthDay").append(birthday);
        $("#email").append(email);
      });
  } else {
    alert("로그인이 필요한 서비스입니다.");
    location.href = "../login/login.html";
  }
}); ////////////end of
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log("현재 로그인한 사용자 ==> " + uid);
    const chBtn = document.querySelector("#changeButton");
    chBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("클릭이벤트 성공");
      const ok = confirm("수정하시겠습니까?");
      if (ok) {
        console.log("if문까지 성공했습니다.");
        // const docdata = {};
        await updateDoc(doc(db, "user", uid), {
          전화번호: $("#userTel").val(),
          주소: $("#userAddr1").val(),
          상세주소: $("#userAddr2").val(),
        });
        alert("회원님의 정보가 수정되었습니다.");
        location.href = "./mypage.html";
      }
    });
  } else {
    alert("로그인이 필요한 서비스입니다.");
    location.href = "../login/login.html";
  }
}); ////////////end of
