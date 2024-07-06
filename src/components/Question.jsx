/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Question from "./Question";

const quizData = [
  {
    question: "ในเรื่อง 'Naruto', ใครเป็นผู้สร้างคาถา 'เอโดะเทนเซย์'?",
    options: ["โทบิรามะ เซ็นจู", "โทบิ", "โอโรจิมารุ", "อิทาจิ อุจิวะ"],
    answer: "โทบิรามะ เซ็นจู",
  },
  {
    question: "ในเรื่อง 'One Piece', ใครเป็นกัปตันของเรือ 'โอโรแจ็คสัน'?",
    options: ["โกล ดี. โรเจอร์", "ชังก์ส", "มังกี้ ดี. ลูฟี่", "เอส"],
    answer: "โกล ดี. โรเจอร์",
  },
  {
    question:
      "ในเรื่อง 'Attack on Titan', ใครเป็นเจ้าของ 'พลังของไททันสัตว์ป่า' ก่อนเซค จาเกอร์?",
    options: [
      "ทอม คาซาเวอร์",
      "กริชา จาเกอร์",
      "ไรเนอร์ บราวน์",
      "แอนนี่ เลออนฮาร์ท",
    ],
    answer: "ทอม คาซาเวอร์",
  },
  {
    question:
      "ในเรื่อง 'Hunter x Hunter', คิเมร่า แอนท์ ราชินีคนแรกที่ถูกฆ่าโดยโกน ฟรีคส์ ชื่อว่าอะไร?",
    options: ["เนเฟอปีโต้", "ยูปิ", "โพฟุ", "เมอร์เรียม"],
    answer: "เนเฟอปีโต้",
  },
  {
    question:
      "ในเรื่อง 'Fullmetal Alchemist', ใครเป็นผู้เขียนสัญญาลักษณ์บนประตูแห่งความจริง?",
    options: ["เอ็ดเวิร์ด เอลริค", "อัลฟองส์ เอลริค", "โฮเอนไฮม์", "พ่อ"],
    answer: "โฮเอนไฮม์",
  },
  {
    question:
      "ในเรื่อง 'My Hero Academia', 'One For All' มีผู้ถือครองมากี่คนก่อนถึงมิโดริยะ?",
    options: ["7 คน", "8 คน", "9 คน", "10 คน"],
    answer: "8 คน",
  },
  {
    question:
      "ในเรื่อง 'Death Note', กี่คนที่ได้รับ 'Death Note' มาจากยมทูตก่อนที่ Light Yagami จะได้รับ?",
    options: ["1 คน", "2 คน", "3 คน", "4 คน"],
    answer: "2 คน",
  },
  {
    question: "ในเรื่อง 'Dragon Ball Z', ใครเป็นผู้สร้าง 'ดราก้อนบอล' ในโลก?",
    options: ["คามิ", "ป๊อปโป", "ดันเด้", "บาบิดี้"],
    answer: "คามิ",
  },
  {
    question: "ในเรื่อง 'Tokyo Ghoul', ใครเป็นเจ้าของร้านกาแฟ 'Anteiku'?",
    options: ["โยชิโมระ", "อุจิมะ", "โทกะ", "ฮิเดะ"],
    answer: "โยชิโมระ",
  },
  {
    question: "ในเรื่อง 'One Punch Man', 'ไซตามะ' ได้รับพลังมาอย่างไร?",
    options: [
      "การฝึกที่โหดร้าย",
      "การทดสอบวิทยาศาสตร์",
      "การกินผลไม้วิเศษ",
      "การได้รับพรจากเทพเจ้า",
    ],
    answer: "การฝึกที่โหดร้าย",
  },
  {
    question:
      "ในเรื่อง 'Naruto', ใครเป็นคนแรกที่สามารถใช้ 'มังเงียว ชาริงกัน' ได้?",
    options: [
      "มาดาระ อุจิวะ",
      "อิทาจิ อุจิวะ",
      "อิซึนะ อุจิวะ",
      "คาคาชิ ฮาตาเกะ",
    ],
    answer: "มาดาระ อุจิวะ",
  },
  {
    question: "ในเรื่อง 'One Piece', ชื่อเต็มของ 'โรโรโนอา โซโร' คืออะไร?",
    options: [
      "โรโรโนอา โนะโซมิ",
      "โรโรโนอา เค็น",
      "โรโรโนอา ริวมะ",
      "โรโรโนอา ชิมิทสึ",
    ],
    answer: "โรโรโนอา โนะโซมิ",
  },
  {
    question:
      "ในเรื่อง 'Attack on Titan', ใครเป็นคนสอนเอเรน เยเกอร์ใช้ทักษะ 'เคลื่อนย้ายสามมิติ'?",
    options: [
      "รีไวล์ แอคเคอร์แมน",
      "ฮันจิ โซ",
      "คริสต้า เร็นซ์",
      "มิทาเบะ ซาคุโนะ",
    ],
    answer: "รีไวล์ แอคเคอร์แมน",
  },
  {
    question:
      "ในเรื่อง 'Hunter x Hunter', 'เกรเทอร์ ไอส์แลนด์' ถูกสร้างขึ้นด้วยความสามารถของ 'ใคร'?",
    options: ["นีง เคาท์", "จิน ฟรีคส์", "ปาราดิซ เฮนริค", "เก็นทรู"],
    answer: "จิน ฟรีคส์",
  },
  {
    question: "ในเรื่อง 'Fullmetal Alchemist', ใครเป็นผู้สร้าง 'โฮมุนคูลัส'?",
    options: ["พ่อ", "ดันเต้", "คิง แบรดลีย์", "สการ์"],
    answer: "พ่อ",
  },
  {
    question:
      "ในเรื่อง 'My Hero Academia', ทักษะของ 'อุรารากะ โอชาโกะ' ชื่อว่าอะไร?",
    options: ["Zero Gravity", "Gravity Control", "Weightless", "Float"],
    answer: "Zero Gravity",
  },
  {
    question:
      "ในเรื่อง 'Death Note', มิกามิ เทรุ เป็นเจ้าของ 'Death Note' คนที่เท่าไหร่?",
    options: ["คนที่ 4", "คนที่ 5", "คนที่ 6", "คนที่ 7"],
    answer: "คนที่ 6",
  },
  {
    question: "ในเรื่อง 'Dragon Ball Z', 'ดาวนาเม็ก' ถูกทำลายโดยใคร?",
    options: ["ฟรีเซอร์", "โกคู", "เบจิต้า", "บาบิดี้"],
    answer: "ฟรีเซอร์",
  },
  {
    question: "ในเรื่อง 'Tokyo Ghoul', โยชิมูระเคยเป็นกูลที่รู้จักในชื่อใด?",
    options: ["อาวล์", "โซวร์", "บลัคด็อก", "คริมสัน"],
    answer: "อาวล์",
  },
  {
    question: "ในเรื่อง 'One Punch Man', 'ทัตซึมากิ' มีพลังพิเศษอะไร?",
    options: ["พลังจิต", "ความเร็วสูง", "พลังไฟ", "พลังน้ำแข็ง"],
    answer: "พลังจิต",
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + timer * 5);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestionIndex(nextQuestion);
      setTimer(20); // Reset timer
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="quiz-container p-4 bg-gray-100 rounded-lg shadow-lg">
        {showScore ? (
          <div className="score-section text-center">
            You scored {score} out of {quizData.length}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="timer text-2xl text-purple-700">{timer}</div>
              <button
                className="skip-button bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
                onClick={handleNextQuestion}
              >
                Skip
              </button>
            </div>
            <Question
              question={quizData[currentQuestionIndex]}
              handleAnswerOptionClick={handleAnswerOptionClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
