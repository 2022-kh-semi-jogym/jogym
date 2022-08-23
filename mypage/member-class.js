"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getFirestore, doc, query, where, getDocs, collection, getDocFromCache } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
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

let num = 0;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log("현재 로그인한 사용자 ==> " + uid);

    try {
      const querySnapshot = await getDocs(query(collection(db, "user"), where("uid", "==", uid)));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
        const template = `
                    <tr>
                      <th scope="row">${++num}</th>
                      <td>${doc.data().강사명}</td>
                      <td>${doc.data().수강강좌}</td>
                      <td>${doc.data().수강기간}</td>
                      <td>${doc.data().비용}</td>
                    </tr>
                  `;
        $(".board-content").append(template);
      });
    } catch (error) {
      const errorMessage = error.message;
      console.log("데이터 불러오기 실패");
      console.log(errorMessage);
    }
  } else {
    alert("로그인이 필요한 서비스입니다.");
    location.href = "../login/login.html";
  }
});
