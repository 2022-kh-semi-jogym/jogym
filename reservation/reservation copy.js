// ======================================== firebase 초기화 코드 시작 ======================================== //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore, doc, deleteDoc, addDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCr8bNq6iVioWl4LUwgDMyoaNieYdFyVLc",
  authDomain: "boardtest-174d5.firebaseapp.com",
  databaseURL: "https://boardtest-174d5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "boardtest-174d5",
  storageBucket: "boardtest-174d5.appspot.com",
  messagingSenderId: "921590231442",
  appId: "1:921590231442:web:b8f515057daf4ed545114b",
  measurementId: "G-MWTSS92ZQR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// ========================================= firebase 초기화 코드 끝 ========================================= //

// 생성된 강좌에 대한 목록 조회하기
async function programInfoSpread() {
  console.log("프로그램 조회 함수 호출 성공");

  const programSnapshot = await getDocs(collection(db, "program"));
  programSnapshot.forEach((doc) => {
    // 프로그램 목록 조회
    console.log("프로그램 목록  ==> " + doc.id, " ==> ", doc.data());

    const programName = doc.data().프로그램명;
    const trainerName = doc.data().강사명;
    const period = doc.data().기간;
    const time = doc.data().시간;
    const day = doc.data().요일;

    const programListTemplate = `
            <tr>
                <td id="program">${programName}</td>
                <td id="programTrainer">${trainerName}</td>
                <td id="programPeriod">${period}</td>
                <td id="programTime">${time}</td>
                <td id="programDay">${day}</td>
                <td><button type="button" class="programReservationBtn" value="${doc.id}">예약하기</button></td>
            </tr>
        `;
    $("#programListAppend").append(programListTemplate);
  });
  // console.log(`${program}`);
  // const obj = JSON.stringify(doc.id[0]);
  // const test2 = JSON.parse(test);
  // const test3 = test2.data;

  console.log(programSnapshot.doc);
  // console.log(obj);
  // console.log(test2);
  // console.log(test2._document);
  // console.log(test2);
  // console.log(programSnapshot);

  // const jsonDoc = JSON.stringify(doc.id[0]);
  // console.log(jsonDoc);
  //   const obj = JSON.parse(jsonDoc);
  //   console.log(obj);
  // const name = obj._document.data.value.mapValue.fields.이름.stringValue;
  // const birthday = obj._document.data.value.mapValue.fields.생년월일.stringValue;
  // const email = obj._document.data.value.mapValue.fields.이메일.stringValue;

  // 신청하기
  onAuthStateChanged(auth, async (user) => {
    $(".programReservationBtn").on("click", async (e) => {
      const uid = user.uid;
      console.log(uid);
      if (confirm("선택한 강좌를 예약하시겠습니까?")) {
        console.log("if문 진입 성공");
        await updateDoc(doc(db, "user", uid), {
          전화번호: $("#userTel").val(),
          주소: $("#userAddr1").val(),
          상세주소: $("#userAddr2").val(),
        });
      } else {
        alert("예약이 취소되었습니다.");
      }
    });
  });
  // });
}
programInfoSpread();

// const chBtn = document.querySelector("#changeButton");
// chBtn.addEventListener("click", async (e) => {
//   e.preventDefault();
//   console.log("클릭이벤트 성공");
//   const ok = confirm("수정하시겠습니까?");
//   if (ok) {
//     console.log("if문까지 성공했습니다.");
//     // const docdata = {};
//     await updateDoc(doc(db, "user", uid), {
//       전화번호: $("#userTel").val(),
//       주소: $("#userAddr1").val(),
//       상세주소: $("#userAddr2").val(),
//     });
//     alert("회원님의 정보가 수정되었습니다.");
//     location.href = "./mypage.html";
//   }
// });

// // 예약 진행 코드
// // const reservationQuerySnapshot = await getDocs(query(collection(db, "user"), where("uid", "==", uid)));

// await addDoc(query(collection(db, "user")){
//     강좌uid: $(".programReservationBtn").val()
// })
