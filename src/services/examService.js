import axios from "axios";
import CryptoJS from "crypto-js";

const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const fetchExamQuestions = async (
  pageNumber,
  pageSize = 10,
  attemptId
) => {
  const token = decryptData(sessionStorage.getItem("jwt"));

  const response = await axios.post(
    `https://onlineproctoring.duckdns.org/member/get-exam-questions?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    {
      attemptId: attemptId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data || [];
};
