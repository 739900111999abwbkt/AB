function copyUserId(userId) {
  navigator.clipboard.writeText(userId).then(() => {
    alert("✅ تم نسخ الـ ID: " + userId);
  });
}

function showGiftAnimation() {
  const anim = document.createElement("div");
  anim.className = "gift-animation";
  anim.innerHTML = "🎁";
  document.body.appendChild(anim);
  setTimeout(() => anim.remove(), 1000);
}

function startMicCountdown(micId, seconds) {
  const mic = document.getElementById(micId);
  if (!mic) return;

  let timerDiv = document.createElement("div");
  timerDiv.id = micId + "-timer";
  timerDiv.style.position = "absolute";
  timerDiv.style.top = "5px";
  timerDiv.style.left = "50%";
  timerDiv.style.transform = "translateX(-50%)";
  timerDiv.style.color = "white";
  timerDiv.style.fontSize = "14px";
  timerDiv.style.background = "rgba(0,0,0,0.5)";
  timerDiv.style.padding = "2px 6px";
  timerDiv.style.borderRadius = "5px";

  mic.appendChild(timerDiv);

  let count = seconds;
  timerDiv.innerText = count;
  const interval = setInterval(() => {
    count--;

    if (count === 3) {
      alert("⏳ تبقى 3 ثوانٍ على انتهاء وقت المايك!");
    }
    if (count <= 0) {
      clearInterval(interval);
      timerDiv.innerText = "⏰ انتهى الوقت";
      muteMic(micId);
      setTimeout(() => mic.removeChild(timerDiv), 2000);
    } else {
      timerDiv.innerText = count;
    }
  }, 1000);
}

function showGiftEffect() {
  const box = document.getElementById("gift-animation");
  box.style.display = "block";
  setTimeout(() => {
    box.style.display = "none";
  }, 2000);
}

let votes = { yes: 0, no: 0 };
function showVoteBar() {
  document.getElementById('vote-bar').style.display = 'block';
}

function castVote(choice) {
  votes[choice]++;
  document.getElementById('vote-bar').style.display = 'none';
  alert("✅ تم تسجيل صوتك: " + choice);
}

function blockUserById(id) {
  const user = document.getElementById(id);
  if (user) user.classList.add("blocked-user");
}

function setVIP(id) {
  const user = document.getElementById(id);
  if (user) user.classList.add("vip");
}

function showAchievement(msg) {
  const box = document.getElementById("achievements-box");
  box.textContent = "🏆 لقد حصلت على إنجاز: " + msg;
  box.style.display = "block";
  setTimeout(() => box.style.display = "none", 4000);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function closeWelcomePopup() {
  document.getElementById("welcome-popup").style.display = "none";
}

function copyRoomLink() {
  const roomName = localStorage.getItem("room") || "room1";
  const link = window.location.origin + "/?room=" + encodeURIComponent(roomName);
  navigator.clipboard.writeText(link).then(() => {
    alert("✅ تم نسخ رابط الغرفة بنجاح:\n" + link);
  });
}

function playMessageSound() {
  const msgSound = new Audio("new-message.mp3");
  msgSound.play().catch(() => {});
}

function showToast() {
  var x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function exitRoom() {
  if (confirm("هل تريد الخروج من الغرفة؟")) {
    window.location.href = "index.html";
  }
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2,'0');
  const minutes = now.getMinutes().toString().padStart(2,'0');
  const seconds = now.getSeconds().toString().padStart(2,'0');
  const clockTime = document.getElementById('clock-time');
  if(clockTime) clockTime.textContent = hours + ':' + minutes + ':' + seconds;
}

function updateStatus() {
  const netStatus = document.getElementById('net-status');
  if (navigator.onLine) {
    netStatus.textContent = '✅ متصل بالإنترنت';
    netStatus.style.background = '#28a745';
  } else {
    netStatus.textContent = '❌ غير متصل';
    netStatus.style.background = '#dc3545';
  }
}

let micLocked = false;
function lockMic() {
  micLocked = !micLocked;
  const btn = document.getElementById("lockBtn");
  btn.textContent = micLocked ? "✅ المايك مثبت" : "🔒 تثبيت المايك";
  btn.style.background = micLocked ? "#4caf50" : "#ff9800";
}

let clapCount = 0;
function sendClap() {
  clapCount++;
  const display = document.getElementById("clapDisplay");
  display.textContent = "👏 × " + clapCount;
  const audio = new Audio("new-message.mp3");
  audio.play();
  setTimeout(() => {
    display.textContent = "";
  }, 3000);
}

function welcomeUser(username) {
  const msgBox = document.createElement("div");
  msgBox.style.position = "fixed";
  msgBox.style.top = "20px";
  msgBox.style.left = "50%";
  msgBox.style.transform = "translateX(-50%)";
  msgBox.style.background = "#4caf50";
  msgBox.style.color = "#fff";
  msgBox.style.padding = "10px 20px";
  msgBox.style.borderRadius = "10px";
  msgBox.style.fontSize = "18px";
  msgBox.style.zIndex = 1000;
  msgBox.textContent = "🎉 مرحبًا " + username + " في الغرفة!";
  document.body.appendChild(msgBox);
  setTimeout(() => {
    msgBox.remove();
  }, 4000);
}

let currentLang = 'ar';
const translations = {
  ar: {
    welcome: '🎉 مرحبًا بك في الغرفة!',
    connected: '👥 المتصلون: ',
    clap: '👏 صفّق'
  },
  en: {
    welcome: '🎉 Welcome to the room!',
    connected: '👥 Users Online: ',
    clap: '👏 Clap'
  }
};

function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  document.getElementById("attendance").innerHTML = translations[currentLang].connected + "<span id='userCount'>" + userCount + "</span>";
  document.getElementById("clapBtn").textContent = translations[currentLang].clap;
}

function toggleChat() {
  const chatBox = document.getElementById("chat-box");
  if (!chatBox) return;
  chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
}

function updateDateTime() {
  const now = new Date();
  const formatted = now.toLocaleString('ar-EG', { hour12: true });
  const datetime = document.getElementById('datetime');
  if(datetime) datetime.innerText = formatted;
}

var isMuted = false;
function muteButtonClick() {
  isMuted = !isMuted;
  document.getElementById('mute-button').innerText = isMuted ? '🔊 تشغيل الصوت' : '🔇 كتم الصوت';
  var audios = document.querySelectorAll('audio');
  audios.forEach(audio => audio.muted = isMuted);
};

function shareButtonClick() {
  const roomUrl = window.location.href;
  navigator.clipboard.writeText(roomUrl).then(() => {
    alert("✅ تم نسخ رابط الغرفة!");
  }).catch(err => {
    alert("❌ حدث خطأ أثناء النسخ");
  });
};

window.addEventListener("load", () => {
  // Event listeners
  const sendBtn = document.getElementById("sendGiftBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", showGiftAnimation);
  }

  const muteButton = document.getElementById('mute-button');
  if(muteButton) {
    muteButton.onclick = muteButtonClick;
  }

  const shareButton = document.getElementById('share-button');
  if(shareButton) {
    shareButton.onclick = shareButtonClick;
  }

  // Timed events for simulation
  setTimeout(() => setVIP("mic-4"), 1500);
  setTimeout(() => blockUserById("mic-3"), 3000);
  setTimeout(() => showVoteBar(), 4000);
  setTimeout(() => showAchievement("أول دخول!"), 2000);

  // Welcome popup
  const welcomePopup = document.getElementById("welcome-popup");
  if(welcomePopup) {
      setTimeout(() => {
        welcomePopup.style.display = "block";
      }, 1000);
  }


  // Welcome banner
  var banner = document.getElementById('welcomeBanner');
  if(banner) {
    banner.style.opacity = 1;
    setTimeout(() => {
      banner.style.opacity = 0;
    }, 5000);
  }

  // Welcome audio
  var audio = document.getElementById("welcomeAudio");
  if(audio) audio.play().catch(() => {});

  // Chatbox observer
  const chatBox = document.getElementById("chatBox");
  if (chatBox) {
    const observer = new MutationObserver(() => {
      playMessageSound();
      showToast();
    });
    observer.observe(chatBox, { childList: true });
  }

  // User count simulation
  let simulatedUserCount = 1;
  const userCountNumber = document.getElementById("userCountNumber");
  if(userCountNumber) {
    setInterval(() => {
      simulatedUserCount = Math.max(1, simulatedUserCount + (Math.random() > 0.5 ? 1 : -1));
      userCountNumber.textContent = simulatedUserCount;
    }, 5000);
  }

  // Mic glow simulation
  setInterval(() => {
    const mics = document.querySelectorAll('.mic');
    mics.forEach(mic => mic.classList.remove('active'));
    const randomMic = mics[Math.floor(Math.random() * mics.length)];
    if (randomMic) {
      randomMic.classList.add('active');
    }
  }, 3000);

  // Admin badge
  const mics = document.querySelectorAll('.mic');
  if (mics.length > 0) {
    mics[0].classList.add('admin');
  }

  // User status simulation
  mics.forEach((mic, i) => {
    const status = document.createElement('span');
    status.className = 'user-status ' + (i % 2 === 0 ? 'online' : 'offline');
    mic.appendChild(status);
  });

  // Welcome audio on load
  const welcomeAudio = new Audio('welcome.mp3');
  welcomeAudio.play();

  // Welcome message
  const msg = document.getElementById('welcome-msg');
  if(msg) {
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 4000);
  }

  // User count in status bar
  const countSpan = document.getElementById('user-count');
  const micUsers = document.querySelectorAll('.mic');
  if(countSpan) countSpan.textContent = micUsers.length;

  // Clock
  updateClock();
  setInterval(updateClock, 1000);

  // Network status
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();

  // Welcome banner fadeout
  const welcomeBanner = document.getElementById("welcome-banner");
  if(welcomeBanner) {
    welcomeBanner.style.animation = "fadeout 5s forwards";
  }

  // User count simulation
  let count = 1;
  const counterSpan = document.getElementById("user-count");
  if(counterSpan) {
    setInterval(() => {
      count = Math.floor(5 + Math.random() * 10);
      counterSpan.textContent = count;
    }, 4000);
  }

  // Welcome popup
  const popup = document.getElementById("welcome-popup");
  if(popup) {
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 4000);
  }

  // Incoming message simulation
  const msgSound = document.getElementById("msgSound");
  if(msgSound) {
    setInterval(() => msgSound.play(), 10000);
  }

  // Mic flash simulation
  setInterval(() => {
    const mic = document.querySelector('.mic');
    if (mic) {
      mic.classList.add('active');
      setTimeout(() => mic.classList.remove('active'), 3000);
    }
  }, 12000);

  // Smoke effect
  const smoke = document.createElement("div");
  smoke.className = "smoke";
  document.body.appendChild(smoke);
  setTimeout(() => smoke.remove(), 4000);

  // Crown on top user
  const topUserMic = document.querySelector(".mic-container#top-user");
  if (topUserMic) {
    const crown = document.createElement("img");
    crown.src = "gold-crown.png";
    crown.className = "gold-crown";
    topUserMic.appendChild(crown);
  }

  // Top user join sound
  const isTopUser = document.body.classList.contains("top-user");
  if (isTopUser) {
    const audio = new Audio("top-user-join.mp3");
    audio.play();
  }

  // Welcome popup
  const welcomePopup2 = document.createElement("div");
  welcomePopup2.className = "welcome-popup";
  welcomePopup2.textContent = "🎉 مرحبًا بك في الغرفة!";
  document.body.appendChild(welcomePopup2);
  setTimeout(() => welcomePopup2.remove(), 5000);

  // Background switcher
  const backgrounds = [
    'bg-rank1.jpg',
    'bg-rank2.jpg',
    'bg-rank3.jpg'
  ];
  let current = 0;
  function switchBackground() {
    document.body.style.backgroundImage = `url(${backgrounds[current]})`;
    current = (current + 1) % backgrounds.length;
  }
  switchBackground();
  setInterval(switchBackground, 30000);

  // User count simulation
  let count2 = 5;
  const countEl = document.getElementById("count");
  if(countEl) {
    setInterval(() => {
      count2 = Math.floor(Math.random() * 20) + 1;
      countEl.innerText = count2;
    }, 10000);
  }

  // New message sound simulation
  const newMessageSound = document.getElementById("newMessageSound");
  if(newMessageSound) {
    setInterval(() => {
      newMessageSound.play();
      const chat = document.getElementById("chat-box");
      if (chat) {
        const msg = document.createElement("div");
        msg.textContent = "🔔 رسالة جديدة!";
        msg.style.padding = "6px";
        msg.style.borderBottom = "1px solid #ccc";
        chat.appendChild(msg);
      }
    }, 10000);
  }

  // Welcome sound simulation
  const welcomeSound = document.getElementById("welcomeSound");
  if(welcomeSound) {
    setInterval(() => {
      welcomeSound.play();
      const chat = document.getElementById("chat-box");
      if (chat) {
        const msg = document.createElement("div");
        msg.textContent = "🎉 مستخدم جديد دخل الغرفة!";
        msg.style.padding = "6px";
        msg.style.color = "#2e7d32";
        msg.style.borderBottom = "1px solid #ccc";
        chat.appendChild(msg);
      }
    }, 20000);
  }

  // Rank backgrounds
  const topRanks = {
    1: "bg-rank1.jpg",
    2: "bg-rank2.jpg",
    3: "bg-rank3.jpg"
  };
  for (let i = 1; i <= 3; i++) {
    const mic = document.getElementById("mic" + i);
    if (mic) {
      mic.style.backgroundImage = `url('${topRanks[i]}')`;
      mic.style.backgroundSize = "cover";
      mic.style.border = "3px solid gold";
      mic.style.borderRadius = "20px";
    }
  }

  // Mic lock simulation
  setInterval(() => {
    if (!micLocked) {
      const mic = document.getElementById("mic1");
      if (mic) {
        mic.innerHTML = "<p>🎤 مايك فارغ</p>";
      }
    }
  }, 25000);

  // Welcome user
  const username = localStorage.getItem("username") || "ضيف";
  welcomeUser(username);

  // User join alert
  showUserJoinAlert();

  // Datetime
  updateDateTime();
  setInterval(updateDateTime, 1000);
});
