import {useEffect, useState} from "react";
import {db} from "../firebase/config";

const useFirestore = (collection, condition = {}) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let conditionRef = db.collection(collection).orderBy('createdAt');

    /**
     * condition
     * {
     *   fieldName: string
     *   operator: =,>,<,...
     *   compareValue: string
     * }
     */
    if (condition && condition.compareValue && condition.compareValue.length) {
      conditionRef = conditionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }
    const unsubscribe = conditionRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      setDocuments(data);
    })
    return unsubscribe;
  }, [collection, condition]);

  return documents;
}

export default useFirestore;
