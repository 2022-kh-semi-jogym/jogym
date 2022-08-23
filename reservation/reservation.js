// ======================================== firebase 초기화 코드 시작 ======================================== //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore, doc, deleteDoc, addDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCr8bNq6iVioWl4LUwgDMyoaNieYdFyVLc",
    authDomain: "boardtest-174d5.firebaseapp.com",
    databaseURL: "https://boardtest-174d5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "boardtest-174d5",
    storageBucket: "boardtest-174d5.appspot.com",
    messagingSenderId: "921590231442",
    appId: "1:921590231442:web:b8f515057daf4ed545114b",
    measurementId: "G-MWTSS92ZQR"
};

const app = initializeApp(firebaseConfig);
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
        `
        $("#programListAppend").append(programListTemplate);
    })

    // deleteProgram 위치 1
    // 신청하기로 바꾸기
    $(".programDelBtn").on("click", async (e) => {
        console.log("프로그램 삭제 버튼 클릭");
        // console.log($(".programDelBtn").val());
        console.log(e.target.value);
    
        if (confirm("강좌를 삭제하시겠습니까?")) {
            console.log("if문 진입 성공");
            
            await deleteDoc(doc(db, "program", e.target.value));
            alert("강좌가 삭제되었습니다.");
            console.log("삭제된 프로그램 uid ==> " + e.target.value);
            
        } else {
            alert("삭제가 취소되었습니다.")
        }
    })
}
programInfoSpread();