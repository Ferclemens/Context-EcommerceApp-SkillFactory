import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import ListPurchase from "./ListPurchase";

const ListPurchaseContainer = () => {
  const [userPurchase, setuserPurchase] = useState([]);
  const productsCollection = collection(db, "purchaseClientList");

  const getProducts = async () => {
    const dataProducts = await getDocs(productsCollection);

    setuserPurchase(
      dataProducts.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <ListPurchase userPurchase={userPurchase} />;
};

export default ListPurchaseContainer;
