// Replace with your actual config
const firebaseConfig = {
    apiKey: "AIzaSyBHqoijSCqhvWfdMQZlFZS__ssOedmLAd0",
    authDomain: "traffic-buddy-c0e58.firebaseapp.com",
    projectId: "traffic-buddy-c0e58",
    storageBucket: "traffic-buddy-c0e58.firebasestorage.app",
    messagingSenderId: "939655676403",
    appId: "1:939655676403:web:8a7f51088b1724bdbe5286"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  const form = document.getElementById("reportForm");
  const reportsList = document.getElementById("reportsList");
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const location = document.getElementById("location").value;
    const signalType = document.getElementById("signalType").value;
    const description = document.getElementById("description").value;
  
    await db.collection("trafficReports").add({
      location,
      signalType,
      description,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  
    form.reset();
  });
  
  // Display recent reports
  db.collection("trafficReports").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    reportsList.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <strong>📍 ${data.location}</strong><br>
        🛑 ${data.signalType}<br>
        📝 ${data.description}<br>
        <small>${data.timestamp?.toDate().toLocaleString() || ''}</small>
      `;
      reportsList.appendChild(div);
    });
  });
  