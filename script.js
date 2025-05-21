const questions = [
  {
    title: "1. Öğrenirken....",
    options: [
      "Duygularımı da öğrenmeye katarım.",
      "Öğrendiğim fikirler üzerinde düşünmeyi severim.",
      "Bir şeyler yapıyor olmaktan hoşlanırım.",
      "İzlemekten ve dinlemekten hoşlanırım."
    ]
  },
  {
    title: "2. En iyi öğrenme yolum.....",
    options: [
      "Dikkatle dinlemek ve izlemektir.",
      "Kendi mantığınla yorumlamaktır.",
      "Duygularıma ve sezgilerime güvenmektir.",
      "Çok çalışıp bir şeyleri başarmaktır."
    ]
  },
  {
    title: "3. Öğrenirken....",
    options: [
      "Mantığıma uygun olan sonucu bulmaya çalışırım.",
      "Öğrenmede sorumlu olduğumu hissederim.",
      "Derse katılmadan sessizce izlerim.",
      "Derse yoğun bir şekilde katılırım."
    ]
  },
  {
    title: "4. En iyi....",
    options: [
      "Duygularımla öğrenirim.",
      "Yaparak öğrenirim.",
      "İzleyerek öğrenirim.",
      "Fikirler üzerinde düşünerek öğrenirim."
    ]
  },
  {
    title: "5. Öğrenirken....",
    options: [
      "Konuyla ilgili yeni bilgilere fikirlere açığım.",
      "Konuyu her yönüyle/ayrıntılarıyla ele alırım.",
      "Konuyu kendi içinde küçük bölümlere ayırırım.",
      "Konuyla ilgili öğrendiğim şeyleri yapmaktan/uygulamaktan hoşlanırım."
    ]
  },
  {
    title: "6. Öğrenirken....",
    options: [
      "Gözlem yapan biriyim.",
      "Öğrenmeye katılan biriyim.",
      "Duygularıyla hareket eden biriyim.",
      "Mantıklı davranan biriyim."
    ]
  },
  {
    title: "7. En iyi öğrenme yolum....",
    options: [
      "Konuyla ilgili gözlem yapmaktır.",
      "İnsanlarla konuyla ilgili konuşmak, iletişim kurmaktır.",
      "Konunun dayandığı temel fikirleri düşünmektir.",
      "Konuyla ilgili deneme ve uygulama yapmaktır."
    ]
  },
  {
    title: "8. Öğrenirken....",
    options: [
      "Çalışmamın sonuçlarını görmekten hoşlanırım.",
      "Konuyla ilgili temel fikirleri düşünmeyi severim.",
      "Acele etmekten hoşlanmam.",
      "Kendimi tamamen öğrenme işinin içinde hissederim."
    ]
  },
  {
    title: "9. En iyi öğrenme yolum....",
    options: [
      "İzlemektir.",
      "Hissettiklerimi dikkate almaktır.",
      "Öğrendiklerimi uygulamaktır.",
      "Kendi düşüncelerimi dikkate almaktır."
    ]
  },
  {
    title: "10. Öğrenirken.....",
    options: [
      "Çekingen biri olurum.",
      "Öğrendiklerimi sorgulamadan kabul ederim.",
      "Sorumluluklarını bilen biriyim.",
      "Öğrendiğim şeyler üzerinde düşünen biriyim."
    ]
  },
  {
    title: "11. Öğrenirken....",
    options: [
      "Derse katılırım.",
      "Derse katılmadan izlerim.",
      "Öğrendiklerimi değerlendiririm.",
      "Aktif olmaktan hoşlanırım."
    ]
  },
  {
    title: "12. En iyi öğrenme yolum.....",
    options: [
      "Anlatılan fikirleri (konuları) tek tek ele almaktır.",
      "Yeni fikirleri öğrenmeye açık olmaktır.",
      "Dikkatli olmaktır.",
      "Anlatılanları uygulamaktır."
    ]
  }
];

window.onload = function () {
  const form = document.getElementById("quizForm");

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question-card";

    const title = document.createElement("h3");
    title.textContent = q.title;
    div.appendChild(title);

    q.options.forEach((option, i) => {
      const wrapper = document.createElement("div");
      wrapper.className = "option";

      const label = document.createElement("label");
      label.textContent = option;

      const select = document.createElement("select");
      select.name = `q${index + 1}_option${i + 1}`;
      select.className = `select-q${index + 1}`;
      
      // Add empty/default option
      const defaultOpt = document.createElement("option");
      defaultOpt.value = "";
      defaultOpt.text = "";
      select.appendChild(defaultOpt);
      
      for (let j = 1; j <= 4; j++) {
        const opt = document.createElement("option");
        opt.value = j;
        opt.text = j;
        select.appendChild(opt);
      }

      wrapper.appendChild(label);
      wrapper.appendChild(select);
      div.appendChild(wrapper);
    });

    form.appendChild(div);
  });
};

function submitQuiz() {
  // Validate that all questions have been answered and each has unique values
  const questions = document.querySelectorAll('.question-card');
  let isValid = true;
  let incompleteQuestions = [];
  let duplicateValueQuestions = [];
  
  questions.forEach((question, qIndex) => {
    const selects = question.querySelectorAll('select');
    let allSelected = true;
    const selectedValues = new Set();
    
    selects.forEach(select => {
      if (select.value === "") {
        allSelected = false;
      } else {
        selectedValues.add(select.value);
      }
    });
    
    if (!allSelected) {
      isValid = false;
      incompleteQuestions.push(qIndex + 1);
    } else if (selectedValues.size !== 4) {
      // If all are selected but there are duplicates
      isValid = false;
      duplicateValueQuestions.push(qIndex + 1);
    }
  });
  
  if (!isValid) {
    if (incompleteQuestions.length > 0) {
      alert(`Lütfen ${incompleteQuestions.join(', ')}. sorulardaki tüm seçenekleri puanlayınız.`);
      return;
    }
    
    if (duplicateValueQuestions.length > 0) {
      alert(`Lütfen ${duplicateValueQuestions.join(', ')}. sorularda her seçenek için farklı bir değer (1, 2, 3, 4) kullanınız.`);
      return;
    }
  }
  
  // Define learning style dimensions mapping for each question and option
  const learningStylesMap = [
    ["CE", "AC", "AE", "RO"],  // Q1
    ["RO", "AC", "CE", "AE"],  // Q2
    ["AC", "CE", "RO", "AE"],  // Q3
    ["CE", "AE", "RO", "AC"],  // Q4
    ["CE", "RO", "AC", "AE"],  // Q5
    ["RO", "AE", "CE", "AC"],  // Q6
    ["RO", "CE", "AC", "AE"],  // Q7
    ["AE", "AC", "RO", "CE"],  // Q8
    ["RO", "CE", "AE", "AC"],  // Q9
    ["RO", "CE", "AE", "AC"],  // Q10
    ["CE", "RO", "AC", "AE"],  // Q11
    ["AC", "CE", "RO", "AE"]   // Q12
  ];
  
  const formData = new FormData(document.getElementById("quizForm"));
  const results = {};

  // Initialize learning style dimension totals
  let totals = {
    CE: 0,  // Somut Deneyim
    AC: 0,  // Soyut Kavramsallaştırma
    AE: 0,  // Aktif Deneyimleme
    RO: 0   // Yansıtıcı Gözlem
  };

  // Process form data and accumulate scores for each learning style dimension
  for (let [key, value] of formData.entries()) {
    results[key] = value;
    
    // Parse question and option numbers from the name (q1_option1, q1_option2, etc.)
    const matches = key.match(/q(\d+)_option(\d+)/);
    
    if (matches) {
      const questionNumber = parseInt(matches[1]) - 1;  // 0-based index
      const optionNumber = parseInt(matches[2]) - 1;    // 0-based index
      const learningStyle = learningStylesMap[questionNumber][optionNumber];
      
      // Add the score to the appropriate learning style dimension
      totals[learningStyle] += parseInt(value);
    }
  }

  // Calculate the combined scores
  const acMinusCE = totals.AC - totals.CE;
  const aeMinusRO = totals.AE - totals.RO;
  
  // Create results message
  let resultsMessage = `
    <h2>Öğrenme Tarzı Sonuçları</h2>
    <div class="results-container">
      <div class="score-section">
        <h3>Ham Puanlar:</h3>
        <p>CE (Somut Yaşantı): ${totals.CE}</p>
        <p>RO (Yansıtıcı Gözlem): ${totals.RO}</p>
        <p>AC (Soyut Kavramsallaştırma): ${totals.AC}</p>
        <p>AE (Aktif Deneme): ${totals.AE}</p>
      </div>
      <div class="score-section">
        <h3>Birleşik Puanlar:</h3>
        <p>AC – CE (Soyutluk - Somutluk farkı): ${acMinusCE}</p>
        <p>AE – RO (Aktiflik - Yansıtıcılık farkı): ${aeMinusRO}</p>
      </div>
    </div>
  `;
  
  // Determine learning style based on quadrant
  let learningStyle = "";
  if (acMinusCE >= 0 && aeMinusRO >= 0) {
    learningStyle = "Yakınsayan (Converger) Öğrenme Stili: Problem çözücü, pratik, teknik odaklı.";
  } else if (acMinusCE >= 0 && aeMinusRO < 0) {
    learningStyle = "Uyumlayıcı (Assimilator) Öğrenme Stili: Mantıklı, teorik, soyut düşünen. ";
  } else if (acMinusCE < 0 && aeMinusRO < 0) {
    learningStyle = "Çeşitleyici (Diverger) Öğrenme Stili: Gözlemci, yaratıcı, empatik.";
  } else {
    learningStyle = "Uyarlayıcı (Accommodator) Öğrenme Stili: Deneyimci, girişimci, uygulamacı.";
  }
  
  resultsMessage += `<div class="learning-style-result"><h3>Öğrenme Stiliniz:</h3><p>${learningStyle}</p></div>`;

  // Display results in a modal
  displayResults(resultsMessage);
}

function displayResults(resultsHTML) {
  // Create a modal element
  const modalBackground = document.createElement('div');
  modalBackground.className = 'modal-background';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  // Add results to the modal
  modalContent.innerHTML = resultsHTML;
  
  // Add close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Kapat';
  closeButton.className = 'close-button';
  closeButton.onclick = function() {
    document.body.removeChild(modalBackground);
  };
  
  // Add buttons to footer
  const footer = document.createElement('div');
  footer.className = 'modal-footer';
  footer.appendChild(closeButton);
  modalContent.appendChild(footer);
  modalBackground.appendChild(modalContent);
  document.body.appendChild(modalBackground);
}
