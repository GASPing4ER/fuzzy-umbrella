import { ref, get } from "firebase/database";
import { database } from "@/firebase-config";

const getCodes = async () => {
    const codesRef = ref(database, "codes");
    const snapshot = await get(codesRef);
  
    if (snapshot.exists() && snapshot.val()) {
      return snapshot.val();
    }
  };

const getCodeData = async (codeId) => {
  const codeRef = ref(database, `codes/${codeId}`);
  const snapshot = await get(codeRef);
  if (snapshot.exists() && snapshot.val()) {
    const codeData = snapshot.val();
    return { codeData, codeRef };
  }
};

export { getCodes, getCodeData };
